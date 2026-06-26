import type { Product } from "@/types/Product";
import productsData from "@/data/products.json";

export function useProductDetail(productId: string | undefined) {
  const product = productsData.find((p) => p.id === Number(productId)) || null;

  return { product };
}
