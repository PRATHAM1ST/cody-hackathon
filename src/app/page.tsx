"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
	const tasks = useQuery(api.rooms.getRooms);
	const addTask = useMutation(api.tasks.post);
	const deleteTask = useMutation(api.tasks.deleteTask);
	const [value, setValue] = useState("");
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<input
				className="border-2 border-gray-300 rounded-lg p-2 text-black"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						addTask({ text: value });
						setValue("");
					}
				}}
			/>
			{tasks?.map(({ _id, code }) => (
				<div
					key={_id.toString()}
					onClick={() =>
						deleteTask({
							id: _id,
						})
					}
				>
					{code}
				</div>
			))}
		</main>
	);
}
