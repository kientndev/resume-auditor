import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    companyName: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    scanCount: v.optional(v.number()),
    lastScanDate: v.optional(v.string()),
    generateCount: v.optional(v.number()),
    lastGenerateDate: v.optional(v.string()),
    totalScans: v.optional(v.number()),
    auditCount: v.optional(v.number()),
    plan: v.optional(v.string()),
    resetDate: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  candidates: defineTable({
    userId: v.id("users"),
    name: v.string(),
    email: v.string(),
    resumeUrl: v.string(),
    parsedJson: v.any(), // Flexible for complex skills/experience tree from the resume parses
    matchScore: v.number(), // Float/number value
    status: v.string(), // e.g. "parsed", "shortlisted", "rejected"
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_matchScore", ["matchScore"])
    .index("by_status", ["status"]),

  outreach_logs: defineTable({
    candidateId: v.id("candidates"),
    userId: v.id("users"),
    platform: v.string(), // e.g. "email", "apollo"
    messageSent: v.string(),
    sentAt: v.number(),
    responseStatus: v.string(),
  })
    .index("by_candidateId", ["candidateId"])
    .index("by_userId", ["userId"]),
});
