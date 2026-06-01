import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserResumes = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("candidates")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const saveResume = mutation({
  args: {
    id: v.optional(v.id("candidates")),
    userId: v.id("users"),
    name: v.string(),
    email: v.string(),
    resumeUrl: v.string(),
    parsedJson: v.any(),
    matchScore: v.number(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    
    if (id) {
      const existing = await ctx.db.get(id);
      if (!existing || existing.userId !== args.userId) {
        throw new Error("Unauthorized update or record not found");
      }
      await ctx.db.patch(id, {
        ...data,
        updatedAt: Date.now(),
      });
      return id;
    } else {
      const newId = await ctx.db.insert("candidates", {
        ...data,
        updatedAt: Date.now(),
      });
      return newId;
    }
  },
});

