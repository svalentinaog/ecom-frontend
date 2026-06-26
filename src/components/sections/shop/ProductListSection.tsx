import { useTranslation } from "react-i18next";
import ProductCard from "@/components/molecules/common/ProductCard";
import Container from "@/layouts/Container";
import FilterSidebar from "@/components/molecules/shop/FilterSidebar";
import { useProductFilter } from "@/hooks/useProductFilter";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ProductListSection() {
  const { t, i18n } = useTranslation("shop");
  const currentLang = (i18n.language as "es" | "en") || "es";
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("q") || "";

  const { filteredProducts, categoryGroups, filters, setFilters, priceLimits } =
    useProductFilter(currentLang, searchTerm);

  return (
    <Container>
      <div className="shop-content">
        {isFilterOpen && (
          <div
            className="filter-overlay"
            onClick={() => setIsFilterOpen(false)}
          />
        )}
        <div className={`filter-sidebar-wrapper ${isFilterOpen ? "open" : ""}`}>
          <div className="filter-sidebar-header">
            <h3>{t("filters.categories")}</h3>
            <button
              className="close-filter-btn"
              onClick={() => setIsFilterOpen(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
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
        </div>

        <div className="products-shop">
          <div className="current-category">
            <h3>
              {filters.category === "all" ? t("filters.all") : filters.category}
            </h3>
            <button
              className="mobile-filter-btn"
              onClick={() => setIsFilterOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5H21M7 12H17M10 19H14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("filters.categories")}
            </button>
          </div>
          <div className="product-list-shop">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <div className="no-products">
                {t("noProducts")}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
