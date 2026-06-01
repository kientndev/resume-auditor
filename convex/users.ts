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
    // Mock for compatibility with old resume auditor routes
    return {
      authorized: true,
      plan: "pro",
      auditCount: 0,
      generateCount: 0,
      auditLimit: null,
      generateLimit: null,
      resetDate: Date.now(),
      reason: "",
    };
  },
});

