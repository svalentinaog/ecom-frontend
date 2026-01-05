import Container from "@/layouts/Container";
import { imageSection } from "@/assets";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Button from "@/components/atoms/CommonButton";

export default function HeroSection() {
  const { t } = useTranslation("home");
  const { lang } = useParams();
  const getPath = (path: string) => `/${lang}${path === "/" ? "" : path}`;

  return (
    <section className="bg-section-home">
      <Container>
        <div className="hero-section-home">
          <div className="text-content-home">
            <span>{t("hero.badge")}</span>
            <h1>{t("hero.title")}</h1>
            <p>{t("hero.description")}</p>
            <div>
              <Button variant="white">
                <a href={getPath("/shop")}>{t("hero.cta")}</a>
              </Button>
            </div>
          </div>
          <div className="container-image-home">
            <img
              className="image-home"
              src={imageSection}
              alt="Imagen destacada"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
