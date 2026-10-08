import {ArticleContainer} from "@cpc/article-system";
import TipTapEditorContent from "@/features/article/ui/text/TipTapEditorContent";
import TitleEditor from "@/features/article/ui/text/TitleEditor";
import DateField from "@/features/article/ui/text/DateField";
import "react-datepicker/dist/react-datepicker.css";
import EditorHeading from "@/features/article/ui/heading/EditorHeading";
import GalleryEditor from "@/features/article/ui/gallery/GalleryEditor";

export default function NewArticlePage() {
    return (
        <ArticleContainer
            navigation={<EditorHeading/>}

            gallery={<GalleryEditor/>}

            title={<TitleEditor/>}

            date={<DateField/>}

            content={<TipTapEditorContent/>}
        />
    );
}