import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserResumes = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("resumes")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const saveResume = mutation({
  args: {
    id: v.optional(v.id("resumes")),
    userId: v.string(),
    fullName: v.string(),
    jobTitle: v.string(),
    email: v.string(),
    phone: v.string(),
    grade: v.string(),
    experience: v.array(
      v.object({
        company: v.string(),
        role: v.string(),
        duration: v.string(),
        bullets: v.array(v.string()),
      })
    ),
    skills: v.array(v.string()),
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
      const newId = await ctx.db.insert("resumes", {
        ...data,
        updatedAt: Date.now(),
      });
      return newId;
    }
  },
});
