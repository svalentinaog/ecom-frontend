import Container from "@/layouts/Container";
import { useTranslation } from "react-i18next";

export default function RelatedProducts() {
  const { t } = useTranslation("shop");
  return (
    <Container>
      <div className="related-products">
        <h2>{t("relatedProducts.title")}</h2>
        {/* Listado de max 4 productos */}
      </div>
    </Container>
  );
}
