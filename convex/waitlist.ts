import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const join = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const trimmedEmail = args.email.trim().toLowerCase();
    
    // Check if email already exists in waitlist
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", trimmedEmail))
      .first();

    if (existing) {
      return { success: true, message: "You're already on the waitlist! We'll keep you updated." };
    }

    // Insert new entry
    await ctx.db.insert("waitlist", {
      email: trimmedEmail,
      joinedAt: Date.now(),
    });

    return { success: true, message: "Successfully joined the waitlist! Your 15% discount has been reserved." };
  },
});
