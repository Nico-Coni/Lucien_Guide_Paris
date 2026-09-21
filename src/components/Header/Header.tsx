import React from 'react'
import { useState } from 'react'
import { useTranslation } from "react-i18next";
import type { SupportedLanguage } from "../../i18n";
import './Header.scss'
import Louvre from '../../assets/images/louvre.svg'
import FrenchFlag from '../../assets/images/france-flag.svg'
import EnglishFlag from '../../assets/images/uk-flag.svg'


const navigation = [
    { labelKey: "header.navigation.home", href: "/" },
    { labelKey: "header.navigation.tours", href: "#visites" },
    { labelKey: "header.navigation.about", href: "/About" },
    { labelKey: "header.navigation.contact", href: "#contact" },
] as const;


function Header(): React.JSX.Element {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const currentLanguage: SupportedLanguage = i18n.resolvedLanguage?.startsWith(
        "en",
    )
        ? "en"
        : "fr";

    const targetLanguage: SupportedLanguage =
        currentLanguage === "fr" ? "en" : "fr";

    const languageFlags: Record<SupportedLanguage, string> = {
        fr: FrenchFlag,
        en: EnglishFlag,
    };
    const closeMenu = (): void => setMenuIsOpen(false);
    const changeLanguage = (language: SupportedLanguage): void => {
        void i18n.changeLanguage(language);
    };

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <a
                    className="brand"
                    href="/"
                    aria-label={t("header.brandHomeLabel")}
                >
                    <img className="brand__icon" src={Louvre} alt="Logo de Lucien à Paris" />

                    <span className="brand__text">
                        <span className="brand__name">Lucien à Paris</span>
                        <span className="brand__tagline">{t("header.tagline")}</span>
                    </span>
                </a>

                <button
                    className="menu-toggle"
                    type="button"
                    aria-expanded={menuIsOpen}
                    aria-controls="main-navigation"
                    aria-label={
                        menuIsOpen ? t("header.closeMenu") : t("header.openMenu")
                    }
                    onClick={() => setMenuIsOpen((isOpen) => !isOpen)}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <div
                    className={`site-header__menu${menuIsOpen ? " is-open" : ""}`}
                    id="main-navigation"
                >
                    <nav aria-label={t("header.mainNavigation")}>
                        <ul className="navigation">
                            {navigation.map((item, index) => (
                                <li key={item.href}>
                                    <a
                                        className={`navigation__link${index === 0 ? " is-active" : ""}`}
                                        href={item.href}
                                        aria-current={index === 0 ? "page" : undefined}
                                        onClick={closeMenu}
                                    >
                                        {t(item.labelKey)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="language-switcher">
                        <button
                            className="language-switcher__button"
                            type="button"
                            lang={targetLanguage}
                            onClick={() => changeLanguage(targetLanguage)}
                            aria-label={t(`header.switchLanguage.${targetLanguage}`)}
                            title={t(`header.switchLanguage.${targetLanguage}`)}
                        >
                            <img
                                src={languageFlags[targetLanguage]}
                                alt=""
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    <a className="booking-button" href="#reservation" onClick={closeMenu}>
                        {t("header.book")}
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header