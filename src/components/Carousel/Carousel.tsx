import {
    useState,
    type JSX,
    type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import "./Carousel.scss";

type CarouselItem = {
    id: string;
};

type CarouselProps<T extends CarouselItem> = {
    items: readonly T[];
    renderSlide: (item: T, index: number) => ReactNode;
    ariaLabel: string;
    id?: string;
    className?: string;
    translationNamespace?: string;
};

function Carousel<T extends CarouselItem>({
    items,
    renderSlide,
    ariaLabel,
    id,
    className = "",
    translationNamespace = "carousel",
}: CarouselProps<T>): JSX.Element | null {
    const [activeIndex, setActiveIndex] = useState(0);
    const { t } = useTranslation();

    if (items.length === 0) {
        return null;
    }

    const safeIndex = activeIndex % items.length;
    const activeItem = items[safeIndex];

    const showPreviousSlide = (): void => {
        setActiveIndex((currentIndex) =>
            currentIndex === 0 ? items.length - 1 : currentIndex - 1,
        );
    };

    const showNextSlide = (): void => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
    };

    return (
        <section
            className={`carousel ${className}`.trim()}
            id={id}
            role="region"
            aria-roledescription={t(`${translationNamespace}.roledescription`)}
            aria-label={ariaLabel}
        >
            <div
                className="carousel__slide"
                role="group"
                aria-roledescription={t(`${translationNamespace}.slide`)}
                aria-label={t(`${translationNamespace}.position`, {
                    current: safeIndex + 1,
                    total: items.length,
                })}
                key={activeItem.id}
            >
                {renderSlide(activeItem, safeIndex)}
            </div>

            {items.length > 1 && (
                <>
                    <button
                        className="carousel__arrow carousel__arrow--previous"
                        type="button"
                        aria-label={t(`${translationNamespace}.previous`)}
                        onClick={showPreviousSlide}
                    >
                        <span aria-hidden="true">←</span>
                    </button>

                    <button
                        className="carousel__arrow carousel__arrow--next"
                        type="button"
                        aria-label={t(`${translationNamespace}.next`)}
                        onClick={showNextSlide}
                    >
                        <span aria-hidden="true">→</span>
                    </button>

                    <div className="carousel__pagination">
                        {items.map((item, index) => (
                            <button
                                className={`carousel__dot${index === safeIndex ? " is-active" : ""
                                    }`}
                                type="button"
                                aria-label={t(`${translationNamespace}.goToSlide`, {
                                    number: index + 1,
                                })}
                                aria-current={index === safeIndex ? "true" : undefined}
                                onClick={() => setActiveIndex(index)}
                                key={item.id}
                            />
                        ))}
                    </div>
                </>
            )}

            <p className="sr-only" aria-live="polite" aria-atomic="true">
                {t(`${translationNamespace}.position`, {
                    current: safeIndex + 1,
                    total: items.length,
                })}
            </p>
        </section>
    );
}

export default Carousel;