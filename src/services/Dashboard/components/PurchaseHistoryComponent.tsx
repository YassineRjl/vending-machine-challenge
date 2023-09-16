import React from "react";
import { Purchase } from "../../../types";
import { IMAGE_API, formatCents } from "../../../utils";

interface ProductProps {
  purchase: Purchase;
}

const PurchaseHistoryComponent: React.FC<ProductProps> = ({ purchase }) => {
  return (
    <div
      className="w-64 h-64 relative bg-cover bg-center rounded-lg overflow-clip"
      style={{ backgroundImage: `url(${IMAGE_API})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-between items-center px-4 py-8">
        <div className="text-white text-center">
          <p className="mb-4 text-24 font-bold">{purchase.productName}</p>

          <p>On {new Date(purchase.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="mt-4 bg-green-500 text-white px-3 py-1 rounded text-14 font-semibold">
            {formatCents(purchase.totalCost)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PurchaseHistoryComponent;
