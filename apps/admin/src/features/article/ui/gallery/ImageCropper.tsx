"use client";

import styles from "./article.gallery.module.css";
import {useCallback, useEffect, useState} from "react";
import Cropper, {Area, Point} from "react-easy-crop";
import ZoomBar from "@/features/article/ui/gallery/ZoomBar";
import {useIsDesktop} from "@/lib/hooks/useIsDesktop";
import ImageButtons from "./ImageButtons";
import {useArticleEditor} from "@/features/providers/ArticleEditorProvider";
import {getCroppedImg} from "@/features/article/utils/getCroppedImage";

export default function ImageCropper() {
    const {article, updateImage, unselectImage} = useArticleEditor();

    const img = article.images[article.currentImage];

    const [crop, setCrop] = useState<Point>(img.crop);
    const [zoom, setZoom] = useState<number>(img.zoom);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const isDesktop = useIsDesktop();

    useEffect(() => {
        setCrop(img.crop);
        setZoom(img.zoom);
        setCroppedAreaPixels(null);
    }, [img.crop, img.zoom]);

    const handleCropComplete = useCallback(
        (_: Area, area: Area) => {
            setCroppedAreaPixels(area);
        }, []
    );

    const changeImage = (file: File) => {
        const url = URL.createObjectURL(file);

        updateImage({
            id: img.id,

            original: {
                src: url,
                file,
            },

            preview: {
                src: url,
                file,
            },

            crop: {x: 0, y: 0},

            zoom: 1,
        });
    };

    const saveChanges = async () => {
        try {
            if (!croppedAreaPixels) return;

            const croppedFile =
                await getCroppedImg(
                    img.original.src,
                    croppedAreaPixels
                );

            updateImage({
                ...img,

                preview: {
                    src: URL.createObjectURL(croppedFile),
                    file: croppedFile,
                },

                crop,
                zoom,
            });

            unselectImage();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={styles.articleCropper}>
            <Cropper image={img.original.src}
                     crop={crop}
                     zoom={zoom}
                     aspect={isDesktop ? 3 : 2}
                     objectFit={"cover"}
                     onCropChange={setCrop}
                     onCropComplete={handleCropComplete}
                     onZoomChange={setZoom}
            />

            <ZoomBar zoom={zoom}
                     setZoom={setZoom}
                     crop={crop}
                     setCrop={setCrop}
            />

            <ImageButtons changeImage={changeImage}
                          saveChanges={saveChanges}
            />
        </div>
    );
}