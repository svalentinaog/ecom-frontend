import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Product } from "@/types/Product";

import ProductCardDetail from "@/components/sections/productDetail/ProductCardDetail";
import RelatedProducts from "@/components/sections/productDetail/RelatedProducts";

export default function ProductDetailTemplate() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos la carga de datos (en un caso real, esto sería una llamada a API por ID)
    axios
      .get<Product[]>("/data.json")
      .then((res) => {
        const found = res.data.find((p) => p.id === Number(id));
        setProduct(found || null);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <ProductCardDetail {...product} />
      <RelatedProducts />
    </>
  );
}
