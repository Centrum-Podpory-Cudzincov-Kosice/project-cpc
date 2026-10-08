import TipTapEditorContent from "@/features/article/ui/text/TipTapEditorContent";
import GalleryEditor from "@/features/article/ui/gallery/GalleryEditor";
import {ArticleContainer} from "@cpc/article-system";
import "react-datepicker/dist/react-datepicker.css";
import TitleEditor from "@/features/article/ui/text/TitleEditor";
import DateField from "@/features/article/ui/text/DateField";
import EditorHeading from "@/features/article/ui/heading/EditorHeading";

export default function Article() {
    return (
        <ArticleContainer
            heading={<EditorHeading/>}

            gallery={<GalleryEditor/>}

            title={<TitleEditor/>}

            date={<DateField/>}

            content={<TipTapEditorContent/>}
        />
    );
}