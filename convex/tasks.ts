import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("tasks").collect();
	},
});

export const post = mutation({
	args: { text: v.string() },
	handler: async (ctx, { text }) => {
		await ctx.db.insert("tasks", { text });
	},
});

export const deleteTask = mutation({
	args: { id: v.id("tasks") },
	handler: async (ctx, { id }) => {
		await ctx.db.delete(id);
	},
});
