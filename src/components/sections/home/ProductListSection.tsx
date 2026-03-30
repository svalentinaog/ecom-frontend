import { useEffect, useState } from "react";
import axios from "axios";

import type { Product } from "@/types/Product";

import ProductFilter from "@/components/molecules/home/ProductFilter";
import ProductCard from "@/components/molecules/common/ProductCard";
import Container from "@/layouts/Container";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import CommonButton from "@/components/atoms/CommonButton";

export default function ProductListSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const { t, i18n } = useTranslation("home");
  const currentLang = (i18n.language as "es" | "en") || "es";
  const { lang } = useParams();
  const getPath = (path: string) => `/${lang}${path === "/" ? "" : path}`;

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:3000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  const categories = Array.from(
    new Set(products.map((p) => p.category[currentLang])),
  );

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category[currentLang] === filter);

  // 2. APLICAMOS EL LÍMITE: Tomamos solo los primeros 8 del resultado filtrado
  const displayProducts = filteredProducts.slice(0, 8);

  return (
    <Container>
      <div className="products">
        <h2>{t("products.title")}</h2>

        <ProductFilter
          categories={categories}
          selected={filter}
          onSelect={setFilter}
        />

        <div className="product-list">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="product-cta">
          <CommonButton variant="primary">
            <Link to={getPath("/shop")}>{t("products.view_more")}</Link>
          </CommonButton>
        </div>
      </div>
    </Container>
  );
}
