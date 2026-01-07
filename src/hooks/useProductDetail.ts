import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "@/types/Product";

export function useProductDetail(productId: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get<Product[]>("/data.json")
      .then((res) => {
        const found = res.data.find((p) => p.id === Number(productId));
        setProduct(found || null);
      })
      .catch((err) => console.error(err));
  }, [productId]);

  return { product };
}
