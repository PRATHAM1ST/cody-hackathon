import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getRooms = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("rooms").collect();
	},
});

export const getRoomById = query({
	args: { id: v.id("rooms") },
	handler: async (ctx, { id }) => {
		return await ctx.db.get(id);
	},
});

export const createRoom = mutation({
	args: { text: v.string() },
	handler: async (ctx, { text }) => {
		await ctx.db.insert("rooms", { code: text });
	},
});

export const deleteRoom = mutation({
	args: { id: v.id("rooms") },
	handler: async (ctx, { id }) => {
		await ctx.db.delete(id);
	},
});

export const updateRoom = mutation({
	args: { id: v.id("rooms"), text: v.string() },
	handler: async (ctx, { id, text }) => {
		await ctx.db.patch(id, { code: text });
	},
});
