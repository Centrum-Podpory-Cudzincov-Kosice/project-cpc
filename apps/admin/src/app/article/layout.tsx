import {ReactNode} from "react";
import ArticleEditorProvider from "@/features/providers/ArticleEditorProvider";
import ArticleMessageHandler from "@/features/article/ui/message-modal/ArticleMessageHandler";

export default function ArticleLayout({children}: {
    children: ReactNode
}) {
    return (
        <ArticleEditorProvider>
            <section className={"white-bg"}>
                {children}
            </section>

            <ArticleMessageHandler/>
        </ArticleEditorProvider>
    );
}