import { useTranslation } from "react-i18next";
import ProductCard from "@/components/molecules/common/ProductCard";
import Container from "@/layouts/Container";
import FilterSidebar from "@/components/molecules/shop/FilterSidebar";
import { useProductFilter } from "@/hooks/useProductFilter";

export default function ProductListSection() {
  const { t, i18n } = useTranslation("shop");
  const currentLang = (i18n.language as "es" | "en") || "es";

  const { filteredProducts, categoryGroups, filters, setFilters, priceLimits } =
    useProductFilter(currentLang);

  return (
    <Container>
      <div className="shop-content">
        <FilterSidebar
          categories={categoryGroups}
          selectedCat={filters.category}
          onSelectCat={(cat) => setFilters({ ...filters, category: cat })}
          priceRange={filters.priceRange}
          onPriceChange={(range) =>
            setFilters({ ...filters, priceRange: range })
          }
          priceMin={priceLimits.min}
          priceMax={priceLimits.max}
        />

        <div className="products-shop">
          <div className="current-category">
            <h3>
              {filters.category === "all" ? t("filters.all") : filters.category}
            </h3>
          </div>
          <div className="product-list-shop">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
