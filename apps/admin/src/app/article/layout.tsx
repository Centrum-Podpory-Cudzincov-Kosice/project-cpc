import {ReactNode} from "react";
import ArticleEditorProvider from "@/features/providers/ArticleEditorProvider";

export default function ArticleLayout({children}: {
    children: ReactNode
}) {
    return (
        <ArticleEditorProvider>
            <section className={"white-bg"}>
                {children}
            </section>
        </ArticleEditorProvider>
    );
}