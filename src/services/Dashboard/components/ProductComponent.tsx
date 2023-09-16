import React, { useState } from "react";
import IncrementComponent from "./IncrementComponent";
import { purchaseProduct } from "../../../api";
import { Product, User } from "../../../types";
import { IMAGE_API, formatCents } from "../../../utils";

interface ProductProps {
  product: Product;
  user: User;
  onPurchased: () => void;
}

const ProductComponent: React.FC<ProductProps> = ({
  product,
  user,
  onPurchased,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const triggerPurchase = async () => {
    await purchaseProduct(product.id, selectedQuantity).then((p) => {
      console.log("purchase with remaining change: ", p);
      alert("Purchase successful!");
    });
    onPurchased();
  };
  return (
    <div
      className="w-64 h-64 relative bg-cover bg-center rounded-lg overflow-clip"
      style={{ backgroundImage: `url(${IMAGE_API})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-between items-center px-4 py-8">
        <p className="text-white mb-4 text-24 font-bold">
          {product.productName}
        </p>
        <div className="flex flex-col justify-center items-center">
          <IncrementComponent
            quantity={product.amountAvailable}
            onChange={(quantity: number) => setSelectedQuantity(quantity)}
          />
          <button
            className="mt-4 bg-green-500 text-white px-3 py-1 rounded disabled:cursor-not-allowed disabled:bg-gray-500 transition-colors text-14 font-semibold"
            disabled={
              selectedQuantity === 0 ||
              user.deposit < product.cost * selectedQuantity
            }
            onClick={triggerPurchase}
          >
            {formatCents(product.cost * selectedQuantity)}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductComponent;
