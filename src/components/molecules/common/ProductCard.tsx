import type { Product } from "@/types/Product";
import { useTranslation } from "react-i18next";
import CommonButton from "@/components/atoms/CommonButton";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductCard({
  id,
  // images,
  name,
  price,
  rating,
  discount,
  oldPrice,
}: Product) {
  const { t } = useTranslation("shop");
  const { i18n } = useTranslation();
  const currentLang = (i18n.language as "es" | "en") || "es";
  const displayName = name[currentLang];

  // const navigate = useNavigate();
  // const { lang } = useParams();

  // const handleCardClick = () => {
  //   navigate(`/${lang}/product/${id}`);
  // };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Pendiente lógica de añadir al carrito
    console.log("Add to cart", id);
  };

  return (
    <div className="card-product">
      <div className="card-product-image-wrapper">
        <img
          className="card-product-image"
          src="images/product-image.jpg"
          alt={displayName}
        />
      </div>
      <div className="card-product-content">
        <div className="card-product-info-content">
          <p className="product-name">{displayName}</p>
          <div className="price-container">
            <p className="price">${price}</p>
            <p className="old-price">${oldPrice}</p>
            <p className="discount">
              {discount}% {t("product.discount")}
            </p>
          </div>
          <p>⭐⭐⭐⭐⭐ ({rating})</p>
        </div>
        <div onClick={handleAddToCart}>
          <CommonButton variant="primary-full-width">
            {t("product.add_to_cart")}
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
