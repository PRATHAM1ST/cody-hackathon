import { v } from "convex/values";
import { action, internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

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

export const updateFileInStorage = internalMutation({
	args: { id: v.id("rooms"), fileId: v.string() },
	handler: async (ctx, { id, fileId }) => {
		await ctx.db.patch(id, { fileId });
	}
});

export const saveFileInStorage = action({
	args: { id: v.id("rooms"), value: v.string(), language: v.string() },
	handler: async (ctx, { id, value, language }) => {
		const blobValue = new Blob([value], { type: "text/" + language });
		const fileID = await ctx.storage.store(blobValue);

		await ctx.runMutation(internal.rooms.updateFileInStorage, { id, fileId: fileID })
	},
});
