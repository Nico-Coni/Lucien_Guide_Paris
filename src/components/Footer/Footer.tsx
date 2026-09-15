import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import Louvre from "../../assets/images/louvre.svg";
import "./Footer.scss";
import { MapPin, Mail, Phone } from "lucide-react";
import Triomphe from "../../assets/images/arc-de-triomphe.svg";

type SocialLink = {
    label: string;
    href: string;
};

type FooterProps = {
    email: string;
    phone: string;
    socialLinks?: readonly SocialLink[];
    newsletterAction?: string;
};

const navigation = [
    { labelKey: "header.navigation.home", href: "#accueil" },
    { labelKey: "header.navigation.tours", href: "#visites" },
    { labelKey: "header.navigation.about", href: "#a-propos" },
    { labelKey: "header.navigation.contact", href: "#contact" },
] as const;

function Footer({
    email,
    phone,
}: FooterProps): JSX.Element {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();
    const phoneHref = phone.replace(/[^+\d]/g, "");

    return (
        <footer className="site-footer" id="contact">
            <div className="site-footer__inner">
                <div className="site-footer__main">
                    <div className="site-footer__brand-column">
                        <a
                            className="footer-brand"
                            href="#accueil"
                            aria-label={t("header.brandHomeLabel")}
                        >
                            <img src={Louvre} alt="" aria-hidden="true" />
                            <span>
                                <strong>Lucien à Paris</strong>
                                <small>{t("header.tagline")}</small>
                            </span>
                        </a>

                        <p className="site-footer__description">
                            {t("footer.description")}
                        </p>
                    </div>

                    <nav
                        className="site-footer__navigation"
                        aria-labelledby="footer-navigation-title"
                    >
                        <h2 id="footer-navigation-title">{t("footer.explore")}</h2>
                        <ul>
                            {navigation.map((item) => (
                                <li key={item.href}>
                                    <a href={item.href}>{t(item.labelKey)}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="site-footer__contact">
                        <h2>{t("footer.contact")}</h2>
                        <address className="footer-contact">
                            <span className="footer-contact__item">
                                <MapPin size={18} strokeWidth={1.8} aria-hidden="true" />
                                <span>{t("footer.location")}</span>
                            </span>

                            {email && (
                                <a
                                    className="footer-contact__item"
                                    href={`mailto:${email}`}
                                >
                                    <Mail size={18} strokeWidth={1.8} aria-hidden="true" />
                                    <span>{email}</span>
                                </a>
                            )}

                            {phone && phoneHref && (
                                <a
                                    className="footer-contact__item"
                                    href={`tel:${phoneHref}`}
                                >
                                    <Phone size={18} strokeWidth={1.8} aria-hidden="true" />
                                    <span>{phone}</span>
                                </a>
                            )}
                        </address>
                        <p>{t("footer.seeYouSoon")}</p>
                    </div>
                    <div className="site-footer__illustration" aria-hidden="true">
                        <img src={Triomphe} alt="" />
                    </div>

                </div>

                <div className="site-footer__bottom">
                    <p>
                        © {currentYear} Lucien à Paris — {t("footer.copyright")}
                    </p>
                    <ul>
                        <li>
                            <a href="/mentions-legales">{t("footer.legalNotice")}</a>
                        </li>
                        <li>
                            <a href="/politique-de-confidentialite">
                                {t("footer.privacyPolicy")}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
