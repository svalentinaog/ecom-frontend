import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import type { Product } from "@/types/Product";

export function useProductFilter(currentLang: "es" | "en") {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 25000] as [number, number],
  });

  // Límites dinámicos de precio
  const [priceLimits, setPriceLimits] = useState({ min: 0, max: 25000 });

  useEffect(() => {
    axios.get<Product[]>("http://localhost:3000/api/products").then((res) => {
      const data = res.data;
      setProducts(data);

      if (data.length > 0) {
        const max = Math.max(...data.map((p) => p.price));
        setPriceLimits({ min: 0, max });
        setFilters((prev) => ({ ...prev, priceRange: [0, max] }));
      }
    });
  }, []);

  // 1. Agrupación Jerárquica: Categoría > Subcategorías
  const categoryGroups = useMemo(() => {
    const groups: Record<string, Set<string>> = {};

    products.forEach((p) => {
      const main = p.category[currentLang];
      const sub = p.subCategory[currentLang];
      if (!groups[main]) groups[main] = new Set();
      groups[main].add(sub);
    });

    return Object.entries(groups).map(([name, subs]) => ({
      name,
      subcategories: Array.from(subs),
    }));
  }, [products, currentLang]);

  // 2. Filtro Combinado: Categoría (Padre o Hijo) + Rango de Precio
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat =
        filters.category === "all" ||
        p.category[currentLang] === filters.category ||
        p.subCategory[currentLang] === filters.category;

      const matchesPrice =
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];

      return matchesCat && matchesPrice;
    });
  }, [products, filters, currentLang]);

  return {
    filteredProducts,
    categoryGroups,
    filters,
    setFilters,
    priceLimits,
  };
}
