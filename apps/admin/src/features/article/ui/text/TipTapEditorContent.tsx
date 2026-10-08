"use client";

import styles from "./article.text.module.css";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {marked} from "marked";
import TurndownService from "turndown";
import {useEffect} from "react";
import {SaveBtn} from "@/features/article/ui/text/SaveBtn";
import EditorPanel from "@/features/article/ui/text/EditorPanel";
import {useLanguage} from "@/features/providers/LanguageProvider";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import clsx from "clsx";

const turndown = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
});

turndown.addRule("paragraph", {
    filter: "p",
    replacement(content: string): string {
        return `\n${content.trim()}\n`;
    },
});

turndown.addRule("lineBreak", {
    filter: "br",
    replacement(): string {
        return "  \n";
    },
});

export default function TipTapEditorContent() {
    const {lang} = useLanguage();

    const {article, setDescription} = useArticleEditor();

    const selectedText = article.descriptions[lang];

    const isEmpty = !selectedText;

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                trailingNode: {
                    notAfter: ["paragraph", "heading"],
                },
            }),
        ],

        content: selectedText
            ? marked.parse(selectedText)
            : "",

        immediatelyRender: false,

        onUpdate({editor}) {
            const html = editor.getHTML();
            const markdown = turndown.turndown(html);

            setDescription(lang, markdown);
        },
    });

    useEffect(() => {
        if (!editor) return;

        const incoming = selectedText
            ? marked.parse(selectedText)
            : "";

        editor.commands.setContent(incoming, {
            emitUpdate: false,
        });
    }, [lang, editor]);

    return (
        <div>
            <EditorPanel editor={editor}/>

            <div className={clsx(
                isEmpty ? styles.editorEmpty : styles.contentContainer
            )}>
                <EditorContent editor={editor}/>
            </div>

            <SaveBtn/>
        </div>
    );
}