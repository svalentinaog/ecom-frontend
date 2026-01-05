import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Breadcrumbs() {
  const { lang } = useParams(); // Obtenemos "es" o "en" de la URL
  const { t } = useTranslation("common");
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x && x !== lang);

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/${lang}`} className="breadcrumbs__link">
            {t("navigation.home")}
          </Link>
          {pathnames.length > 0 && <p className="breadcrumbs__separator">/</p>}
        </li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          // Construimos la ruta incluyendo el idioma
          const to = `/${lang}/${pathnames.slice(0, index + 1).join("/")}`;

          // t() buscará automáticamente en tu es.json o en.json
          const label = t(`navigation.${value}`, { defaultValue: value });

          return (
            <li key={to} className="breadcrumbs__item">
              {last ? (
                <p className="breadcrumbs__label--active">{label}</p>
              ) : (
                <>
                  <Link to={to} className="breadcrumbs__link">
                    {label}
                  </Link>
                  <p className="breadcrumbs__separator">/</p>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
