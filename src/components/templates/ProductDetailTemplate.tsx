import { useParams } from "react-router-dom";
import type { Product } from "@/types/Product";
import productsData from "@/data/products.json";

import ProductCardDetail from "@/components/sections/productDetail/ProductCardDetail";
import RelatedProducts from "@/components/sections/productDetail/RelatedProducts";

export default function ProductDetailTemplate() {
  const { id } = useParams();
  const product: Product | null = productsData.find((p) => p.id === Number(id)) || null;

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <ProductCardDetail {...product} />
      <RelatedProducts currentProduct={product} />
    </>
  );
}
