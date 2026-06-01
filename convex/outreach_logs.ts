import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getOutreachLogs = query({
  args: { candidateId: v.id("candidates") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("outreach_logs")
      .withIndex("by_candidateId", (q) => q.eq("candidateId", args.candidateId))
      .order("desc")
      .collect();
  },
});

export const logOutreach = mutation({
  args: {
    candidateId: v.id("candidates"),
    userId: v.id("users"),
    platform: v.string(),
    messageSent: v.string(),
    responseStatus: v.string(),
  },
  handler: async (ctx, args) => {
    const logId = await ctx.db.insert("outreach_logs", {
      candidateId: args.candidateId,
      userId: args.userId,
      platform: args.platform,
      messageSent: args.messageSent,
      sentAt: Date.now(),
      responseStatus: args.responseStatus,
    });
    return logId;
  },
});
