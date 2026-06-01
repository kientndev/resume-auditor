import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserResumes = query({
  args: { userId: v.string() }, // Accept string so frontend clerkId query works
  handler: async (ctx, args) => {
    const userRecord = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.userId))
      .first();
    if (!userRecord) {
      return [];
    }
    return await ctx.db
      .query("candidates")
      .withIndex("by_userId", (q) => q.eq("userId", userRecord._id))
      .order("desc")
      .collect();
  },
});

export const saveResume = mutation({
  args: {
    id: v.optional(v.any()),
    userId: v.string(), // Clerk ID string passed by frontend
    fullName: v.optional(v.string()),
    jobTitle: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    grade: v.optional(v.string()),
    experience: v.optional(v.any()),
    skills: v.optional(v.any()),

    // new fields
    name: v.optional(v.string()),
    resumeUrl: v.optional(v.string()),
    parsedJson: v.optional(v.any()),
    matchScore: v.optional(v.number()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 1. Resolve Clerk ID to Convex User ID
    const userRecord = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.userId))
      .first();
    if (!userRecord) {
      throw new Error("User not found");
    }

    // 2. Map old/new fields to candidates schema
    const name = args.name ?? args.fullName ?? "Unnamed Candidate";
    const email = args.email ?? "";
    const resumeUrl = args.resumeUrl ?? "";
    const parsedJson = args.parsedJson ?? {
      jobTitle: args.jobTitle,
      phone: args.phone,
      grade: args.grade,
      experience: args.experience,
      skills: args.skills,
    };
    const matchScore = args.matchScore ?? 0;
    const status = args.status ?? "parsed";

    const candidateData = {
      userId: userRecord._id,
      name,
      email,
      resumeUrl,
      parsedJson,
      matchScore,
      status,
      updatedAt: Date.now(),
    };

    if (args.id) {
      const existing = await ctx.db.get(args.id);
      if (!existing || existing.userId !== userRecord._id) {
        throw new Error("Unauthorized update or record not found");
      }
      await ctx.db.patch(args.id, candidateData);
      return args.id;
    } else {
      const newId = await ctx.db.insert("candidates", candidateData);
      return newId;
    }
  },
});
