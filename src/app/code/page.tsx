"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export default function Code() {
	const query = useSearchParams();
	const editorRef = useRef<any>(null);

	function handleEditorDidMount(editor: any, monaco: any) {
		editorRef.current = editor;
	}

	const roomId = query.get("room") as string;
	const checkRoomId = useQuery(api.rooms.getRoomById, {
		id: roomId as Id<"rooms">,
	});
	const [value, setValue] = useState<string>(checkRoomId?.code);
	const updateRoom = useMutation(api.rooms.updateRoom);

	useEffect(() => {
		setValue(checkRoomId?.code);
	}, [checkRoomId]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			updateRoom({
				id: roomId as Id<"rooms">,
				text: value,
			});
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [value, roomId, updateRoom]);

    useEffect(() => {
        if (!editorRef?.current) return;

        editorRef.current.onDidChangeModelContent((e: any) => {
            setValue(editorRef.current.getValue());
        });
    }, [editorRef])

	return (
		<>
			{checkRoomId && (
				<Editor
					height="90vh"
					theme="vs-dark"
					value={value}
					onChange={(e) => e !== undefined && setValue(e)}
					defaultLanguage="javascript"
					onMount={handleEditorDidMount}
					// defaultValue={checkRoomId.code}
				/>
			)}
		</>
	);
}
