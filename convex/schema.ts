import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    totalScans: v.number(),
  }).index("by_clerk_id", ["clerkId"]),
  resumes: defineTable({
    userId: v.string(),
    fullName: v.string(),
    jobTitle: v.string(),
    email: v.string(),
    phone: v.string(),
    grade: v.string(), // e.g., "A", "B+", "C"
    experience: v.array(
      v.object({
        company: v.string(),
        role: v.string(),
        duration: v.string(),
        bullets: v.array(v.string()),
      })
    ),
    skills: v.array(v.string()),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),
});
