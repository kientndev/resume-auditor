import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
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
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email ?? "",
      name: args.name ?? "",
      companyName: "", // Default to empty string for onboarding
      createdAt: Date.now(),
    });

    return userId;
  },
});

export const incrementScanCount = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    // No-op for compatibility with old resume auditor app
  },
});

export const validateAndTrackUsage = mutation({
  args: {
    clerkId: v.string(),
    action: v.union(v.literal("audit"), v.literal("generate")),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      return {
        authorized: false,
        plan: "free",
        auditCount: 0,
        generateCount: 0,
        auditLimit: 5,
        generateLimit: 5,
        resetDate: Date.now(),
        reason: "USER_NOT_FOUND",
      };
    }

    const today = new Date().toISOString().split("T")[0];
    let scanCount = user.scanCount ?? 0;
    let generateCount = user.generateCount ?? 0;
    const lastScanDate = user.lastScanDate ?? "";
    const lastGenerateDate = user.lastGenerateDate ?? "";

    if (lastScanDate !== today) {
      scanCount = 0;
    }
    if (lastGenerateDate !== today) {
      generateCount = 0;
    }

    const limit = 5;

    if (args.action === "audit") {
      if (scanCount >= limit) {
        return {
          authorized: false,
          plan: "free",
          auditCount: scanCount,
          generateCount: generateCount,
          auditLimit: limit,
          generateLimit: limit,
          resetDate: Date.now(),
          reason: "FREE_PLAN_LIMIT_REACHED",
        };
      }

      const nextScanCount = scanCount + 1;
      await ctx.db.patch(user._id, {
        scanCount: nextScanCount,
        lastScanDate: today,
      });

      return {
        authorized: true,
        plan: "free",
        auditCount: nextScanCount,
        generateCount: generateCount,
        auditLimit: limit,
        generateLimit: limit,
        resetDate: Date.now(),
        reason: "",
      };
    } else {
      if (generateCount >= limit) {
        return {
          authorized: false,
          plan: "free",
          auditCount: scanCount,
          generateCount: generateCount,
          auditLimit: limit,
          generateLimit: limit,
          resetDate: Date.now(),
          reason: "FREE_PLAN_LIMIT_REACHED",
        };
      }

      const nextGenerateCount = generateCount + 1;
      await ctx.db.patch(user._id, {
        generateCount: nextGenerateCount,
        lastGenerateDate: today,
      });

      return {
        authorized: true,
        plan: "free",
        auditCount: scanCount,
        generateCount: nextGenerateCount,
        auditLimit: limit,
        generateLimit: limit,
        resetDate: Date.now(),
        reason: "",
      };
    }
  },
});

export const resetAllUserScans = mutation({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    let count = 0;
    for (const user of users) {
      await ctx.db.patch(user._id, {
        scanCount: 0,
        generateCount: 0,
        lastScanDate: "",
        lastGenerateDate: "",
        auditCount: 0,
        totalScans: 0,
      });
      count++;
    }
    return { success: true, updatedCount: count };
  },
});


