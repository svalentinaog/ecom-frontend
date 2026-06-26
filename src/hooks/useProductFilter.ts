import { useState, useMemo } from "react";
import type { Product } from "@/types/Product";
import productsData from "@/data/products.json";

export function useProductFilter(currentLang: "es" | "en", searchTerm: string = "") {
  const [products] = useState<Product[]>(productsData);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 25000] as [number, number],
  });

  // Límites dinámicos de precio
  const priceLimits = useMemo(() => {
    if (products.length > 0) {
      const max = Math.max(...products.map((p) => p.price));
      return { min: 0, max };
    }
    return { min: 0, max: 25000 };
  }, [products]);

  // Actualizar priceRange cuando priceLimits cambie
  const [initialized, setInitialized] = useState(false);
  if (!initialized && products.length > 0) {
    setFilters((prev) => ({ ...prev, priceRange: [0, priceLimits.max] }));
    setInitialized(true);
  }

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

  // 2. Filtro Combinado: Categoría (Padre o Hijo) + Rango de Precio + Busqueda
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat =
        filters.category === "all" ||
        p.category[currentLang] === filters.category ||
        p.subCategory[currentLang] === filters.category;

      const matchesPrice =
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];

      const matchesSearch =
        searchTerm.trim() === "" ||
        p.name[currentLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description[currentLang].toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCat && matchesPrice && matchesSearch;
    });
  }, [products, filters, currentLang, searchTerm]);

  const selectedCategoryInfo = useMemo(() => {
    if (filters.category === "all") {
      return null;
    }
    
    let parentCategory: string | null = null;
    let isSubcategory = false;
    
    // Check if it's a parent category
    const parentGroup = categoryGroups.find(g => g.name === filters.category);
    if (parentGroup) {
      parentCategory = filters.category;
    } else {
        // Check if it's a subcategory, find its parent
        for (const group of categoryGroups) {
          if (group.subcategories.includes(filters.category)) {
            parentCategory = group.name;
            isSubcategory = true;
            break;
          }
        }
      }
    
    return {
      parentCategory,
      isSubcategory,
      selectedCategory: filters.category
    };
  }, [filters.category, categoryGroups]);

  return {
    filteredProducts,
    categoryGroups,
    filters,
    setFilters,
    priceLimits,
    selectedCategoryInfo
  };
}
