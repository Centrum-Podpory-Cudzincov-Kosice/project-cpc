"use client";

import ImageCropper from "@/features/article/ui/gallery/ImageCropper";
import AddImageWindow from "@/features/article/ui/gallery/AddImageWindow";
import {Gallery} from "@cpc/article-system";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import GalleryWrapper from "@/features/article/ui/gallery/GalleryWrapper";
import AddImageBtn from "@/features/article/ui/gallery/AddImageBtn";

export default function GalleryEditor() {
    const {article, setCurrentImage} = useArticleEditor();

    const images = article.images;

    return images.length > 0 ? (
        <div>
            <AddImageBtn/>

            {article.imageSelected ? (
                <Gallery
                    images={images.map(
                        image => image.original.src
                    )}
                    currentIndex={article.currentImage}
                    setCurrImg={setCurrentImage}
                    viewport={<ImageCropper/>}
                />
            ) : (
                <Gallery
                    images={images.map(
                        image => image.preview.src
                    )}
                    currentIndex={article.currentImage}
                    setCurrImg={setCurrentImage}
                    overlay={
                        <GalleryWrapper/>
                    }
                />
            )}
        </div>
    ) : (
        <AddImageWindow/>
    );
}