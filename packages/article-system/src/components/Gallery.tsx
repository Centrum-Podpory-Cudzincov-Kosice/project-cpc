"use client";

import styles from "./article-system.module.css";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";
import {ReactNode, useEffect, useRef} from "react";

export function Gallery({images, currentIndex = 0, setCurrImg, overlay, viewport}: {
    images: string[],
    currentIndex?: number,
    setCurrImg?: (index: number) => void,
    overlay?: ReactNode,
    viewport?: ReactNode,
}) {
    const previousImages = useRef<string[]>(images);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        containScroll: "trimSnaps",
        watchDrag: !viewport,
        dragFree: false,
    });

    useEffect(() => {
        if (!emblaApi) return;

        const imagesChanged =
            previousImages.current.length !== images.length ||
            previousImages.current.some(
                (image, index) => image !== images[index]
            );

        if (!imagesChanged) return;

        previousImages.current = images;

        emblaApi.reInit();
        emblaApi.scrollTo(currentIndex, true);
    }, [emblaApi, images, currentIndex]);

    useEffect(() => {
        if (!emblaApi || !setCurrImg) return;

        const handleSelect = () => {
            setCurrImg(emblaApi.selectedScrollSnap());
        };

        handleSelect();

        emblaApi.on("select", handleSelect);

        return () => {
            emblaApi.off("select", handleSelect);
        };
    }, [emblaApi, setCurrImg]);

    const showArrows = images.length > 1;
    const arrowsDisabled = viewport !== undefined;

    const handlePrev = () => {
        if (arrowsDisabled) return;

        emblaApi?.scrollPrev();
    };

    const handleNext = () => {
        if (arrowsDisabled) return;

        emblaApi?.scrollNext();
    };

    return (
        <div>
            <div className={clsx(styles.gallery, "not-selectable")}>
                {showArrows && (
                    <IoIosArrowBack
                        className={clsx(
                            styles.galleryIcon,
                            {[styles.disabled]: arrowsDisabled}
                        )}
                        onClick={handlePrev}
                    />
                )}

                <div className={styles.carousel}
                     ref={emblaRef}
                >
                    <div className={styles.wrapper}>
                        {images.map((src, index) => (
                            <div key={index}
                                 className={styles.slide}
                            >
                                {viewport ? (
                                    viewport
                                ) : (
                                    <img src={src}
                                         alt={""}
                                         className={styles.image}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    {overlay}
                </div>

                {showArrows && (
                    <IoIosArrowForward
                        className={clsx(
                            styles.galleryIcon,
                            {[styles.disabled]: arrowsDisabled}
                        )}
                        onClick={handleNext}
                    />
                )}
            </div>
        </div>
    );
}