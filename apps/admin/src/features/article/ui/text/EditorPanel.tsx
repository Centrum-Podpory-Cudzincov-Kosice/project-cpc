"use client";

import styles from "./article.text.module.css";
import {Editor} from "@tiptap/core";

export default function EditorPanel({editor}: {
    editor: Editor | null,
}) {
    if (!editor) return null;

    const addLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("Enter URL:", previousUrl);
        if (url === null) return;
        if (url.trim() === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange("link").setLink({href: url.trim(),}).run();
    };

    return (
        <div className={styles.editorPanel}>
            <button
                onClick={() =>
                    editor.chain().focus().toggleBold().run()}
            >
                Bold
            </button>

            <button onClick={() =>
                editor.chain().focus().toggleItalic().run()}
            >
                Italic
            </button>

            <button onClick={() =>
                editor.chain().focus().toggleHeading({level: 1}).run()}
            >
                H1
            </button>

            <button onClick={() =>
                editor.chain().focus().toggleHeading({level: 2}).run()}
            >
                H2
            </button>

            <button onClick={() =>
                editor.chain().focus().setParagraph().run()}
            >
                P
            </button>

            <button onClick={() =>
                editor.chain().focus().toggleBulletList().run()}
            >
                Bullet List
            </button>

            <button onClick={() =>
                editor.chain().focus().toggleOrderedList().run()}
            >
                Numbered List
            </button>

            <button type="button" onClick={addLink}>
                Link
            </button>
        </div>
    );
}