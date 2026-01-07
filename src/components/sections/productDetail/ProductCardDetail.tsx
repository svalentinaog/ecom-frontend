import type { Product } from "@/types/Product";
import { useTranslation } from "react-i18next";
import CommonButton from "@/components/atoms/CommonButton";
import QuantitySelector from "@/components/molecules/productDetail/QuantitySelector";
import Container from "@/layouts/Container";

export default function ProductCardDetail({
  image,
  name,
  price,
  rating,
  discount,
  oldPrice,
  description,
}: Product) {
  const { t } = useTranslation("shop");
  const { i18n } = useTranslation();
  const currentLang = (i18n.language as "es" | "en") || "es";
  const displayName = name[currentLang];

  return (
    <Container>
      <div className="card-product-detail">
        <div className="card-product-detail-gallery">
          {/* Reemplazar luego esta imagen por una galeria */}
          <img src={image} alt={displayName} />
        </div>
        <div className="card-product-detail-content">
          <div className="card-product-detail-content-info">
            <h1 className="product-name">{displayName}</h1>
            <div className="product-detail-info-container">
              <div className="price-container">
                <h2 className="price">${price}</h2>
                <p className="old-price">${oldPrice}</p>
                <p className="discount">
                  {discount}% {t("product.discount")}
                </p>
              </div>
              <p>⭐⭐⭐⭐⭐ ({rating})</p>
            </div>
            <p>{description[currentLang]}</p>
          </div>
          <div className="card-product-detail-content-actions">
            <QuantitySelector quantity={1} setQuantity={() => {}} />
            <CommonButton variant="primary">
              {t("product.add_to_cart")}
            </CommonButton>
          </div>
        </div>
      </div>
    </Container>
  );
}
