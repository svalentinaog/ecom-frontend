import Container from "@/layouts/Container";
import { useTranslation } from "react-i18next";
import type { Product } from "@/types/Product";
import productsData from "@/data/products.json";
import ProductCard from "@/components/molecules/common/ProductCard";

export default function RelatedProducts({ currentProduct }: { currentProduct: Product }) {
  const { t } = useTranslation("shop");
  
  const relatedProducts = productsData
    .filter((product) => 
      product.id !== currentProduct.id && 
      product.category.es === currentProduct.category.es
    )
    .slice(0, 4);

  return (
    <Container>
      <div className="products">
        <h2 style={{ textAlign: "left", width: "100%" }}>{t("relatedProducts.title")}</h2>
        <div className="product-list">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </Container>
  );
}
