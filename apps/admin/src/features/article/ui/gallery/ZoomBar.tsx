import styles from "@/features/article/ui/gallery/article.gallery.module.css";
import {Point} from "react-easy-crop";
import {ChangeEvent} from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

export default function ZoomBar({zoom, setZoom, crop, setCrop}: {
    zoom: number,
    setZoom: (zoom: number) => void,
    crop: Point,
    setCrop: (crop: Point) => void,
}) {
    const progress = ((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100;

    const handleZoomChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newZoom = Number(e.target.value);

        const ratio = newZoom / zoom;

        setCrop({
            x: crop.x * ratio,
            y: crop.y * ratio,
        });

        setZoom(newZoom);
    };

    return (
        <input
            type="range"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step={0.01}
            value={zoom}
            onChange={handleZoomChange}
            className={styles.zoomBar}
            style={{
                background: `linear-gradient(to right,
            #B5DCFF ${progress}%,
            #a5a5a5 ${progress}%
        )`
            }}
        />
    );
}