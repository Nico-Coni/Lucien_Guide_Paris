import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, MapPin } from "lucide-react";
import "./MeetingPoint.scss";

type MeetingPointProps = {
    address: string;
};

function MeetingPoint({
    address,
}: MeetingPointProps): JSX.Element {
    const { t, i18n } = useTranslation();
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const language = i18n.resolvedLanguage?.startsWith("en")
        ? "en"
        : "fr";

    const encodedAddress = encodeURIComponent(address);

    const mapUrl = apiKey
        ? `https://www.google.com/maps/embed/v1/place` +
        `?key=${apiKey}` +
        `&q=${encodedAddress}` +
        `&zoom=16` +
        `&language=${language}`
        : null;

    const directionsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&destination=${encodedAddress}` +
        `&travelmode=walking`;

    return (
        <section
            className="meeting-point"
            id="point-de-rendez-vous"
            aria-labelledby="meeting-point-title"
        >
            <div className="meeting-point__inner">
                <div className="meeting-point__content">
                    <p className="meeting-point__eyebrow">
                        {t("meetingPoint.eyebrow")}
                    </p>

                    <h2 id="meeting-point-title">
                        {t("meetingPoint.title")}
                    </h2>

                    <div className="meeting-point__address">
                        <MapPin
                            size={25}
                            strokeWidth={1.7}
                            aria-hidden="true"
                        />

                        <address>{address}</address>
                    </div>

                    <p>{t("meetingPoint.description")}</p>

                    <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {t("meetingPoint.directions")}
                        <ExternalLink size={17} aria-hidden="true" />
                    </a>
                </div>

                <div className="meeting-point__map-wrapper">
                    {mapUrl ? (
                        <iframe
                            className="meeting-point__map"
                            title={t("meetingPoint.mapTitle", {
                                address,
                            })}
                            src={mapUrl}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    ) : (
                        <div className="meeting-point__map-placeholder">
                            <MapPin size={42} aria-hidden="true" />
                            <p>{t("meetingPoint.missingApiKey")}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default MeetingPoint;