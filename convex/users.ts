import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const FREE_AUDIT_LIMIT = 5;
const FREE_GENERATE_LIMIT = 3;
const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

function nextResetDate(now: number) {
  return now + MONTH_MS;
}

export const getUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    return user;
  },
});

export const getOrCreateUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      imageUrl: args.imageUrl,
      totalScans: 0,
      plan: "free",
      auditCount: 0,
      generateCount: 0,
      resetDate: nextResetDate(Date.now()),
    });

    return userId;
  },
});

export const incrementScanCount = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      totalScans: user.totalScans + 1,
    });
  },
});

export const validateAndTrackUsage = mutation({
  args: {
    clerkId: v.string(),
    action: v.union(v.literal("audit"), v.literal("generate")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const plan = user.plan ?? "free";
    const resetDate = user.resetDate ?? nextResetDate(now);
    const shouldReset = resetDate <= now;
    const auditCount = shouldReset ? 0 : user.auditCount ?? 0;
    const generateCount = shouldReset ? 0 : user.generateCount ?? 0;

    const patchDefaults = {
      plan,
      resetDate: shouldReset ? nextResetDate(now) : resetDate,
      auditCount,
      generateCount,
    };

    if (plan === "pro") {
      await ctx.db.patch(user._id, patchDefaults);
      return {
        authorized: true,
        plan,
        auditCount,
        generateCount,
        auditLimit: null,
        generateLimit: null,
        resetDate: patchDefaults.resetDate,
      };
    }

    const limit =
      args.action === "audit" ? FREE_AUDIT_LIMIT : FREE_GENERATE_LIMIT;
    const currentCount = args.action === "audit" ? auditCount : generateCount;

    if (currentCount >= limit) {
      await ctx.db.patch(user._id, patchDefaults);
      return {
        authorized: false,
        reason: "FREE_PLAN_LIMIT_REACHED",
        plan,
        action: args.action,
        auditCount,
        generateCount,
        auditLimit: FREE_AUDIT_LIMIT,
        generateLimit: FREE_GENERATE_LIMIT,
        resetDate: patchDefaults.resetDate,
      };
    }

    const nextAuditCount =
      args.action === "audit" ? auditCount + 1 : auditCount;
    const nextGenerateCount =
      args.action === "generate" ? generateCount + 1 : generateCount;

    await ctx.db.patch(user._id, {
      ...patchDefaults,
      auditCount: nextAuditCount,
      generateCount: nextGenerateCount,
    });

    return {
      authorized: true,
      plan,
      auditCount: nextAuditCount,
      generateCount: nextGenerateCount,
      auditLimit: FREE_AUDIT_LIMIT,
      generateLimit: FREE_GENERATE_LIMIT,
      resetDate: patchDefaults.resetDate,
    };
  },
});
