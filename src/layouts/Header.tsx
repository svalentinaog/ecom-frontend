import { useState, useMemo } from "react";
import {
  Link,
  NavLink,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  cart,
  logoDark,
  phoneTop,
  userAccess,
  emailTop,
  langEN,
  langES,
  hamburger,
} from "@/assets";
import SearchBar from "@/components/molecules/common/SearchBar";

export default function Header() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // 1. Centralizamos los items de navegación (Se traducen solos vía 't')
  const navItems = useMemo(
    () => [
      { name: t("navigation.home"), path: "/", end: true },
      { name: t("navigation.shop"), path: "/shop", end: false },
      { name: t("navigation.contact"), path: "/contact", end: false },
    ],
    [t]
  );

  // 2. Helper para rutas localizadas
  const getPath = (path: string) => `/${lang}${path === "/" ? "" : path}`;

  // 3. Lógica de cambio de idioma simplificada
  const toggleLanguage = () => {
    const nextLang = lang === "es" ? "en" : "es";
    // Cambiamos el idioma en la librería e inmediatamente navegamos a la nueva URL
    i18n.changeLanguage(nextLang);
    navigate(location.pathname.replace(`/${lang}`, `/${nextLang}`));
  };

  // Helper para clases activas
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active" : "";

  return (
    <header className="header">
      <div className="header-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-left">
            <div
              className="top-bar-item"
              onClick={toggleLanguage}
              style={{ cursor: "pointer" }}
            >
              <img src={lang === "es" ? langEN : langES} alt="Language" />
              <p>{lang === "es" ? "English" : "Español"}</p>
            </div>
            <div className="top-bar-item">
              <img src={phoneTop} alt="Phone" />
              <p>123-456-7890</p>
            </div>
            <div className="top-bar-item">
              <img src={emailTop} alt="Email" />
              <p>contact@example.com</p>
            </div>
          </div>

          <div className="top-bar-item">
            <img src={userAccess} alt="userAccess" />
            <NavLink to={getPath("/login")} className={navLinkClass}>
              {t("header.access")}
            </NavLink>
          </div>
        </div>

        <hr />

        {/* Navbar */}
        <nav className="navbar">
          <Link to={getPath("/")}>
            <img src={logoDark} alt="LOGO" className="logo" />
          </Link>

          <div className="navbar-content">
            <div className="menu-items">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={getPath(item.path)}
                  end={item.end}
                  className={navLinkClass}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <SearchBar value={search} onChange={setSearch} />

            <Link to={getPath("/cart")}>
              <img src={cart} alt="Cart" />
            </Link>

            <img
              src={hamburger}
              alt="Menu"
              className="hamburger-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </nav>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="mobile-menu">
            <SearchBar value={search} onChange={setSearch} />
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={getPath(item.path)}
                end={item.end}
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
