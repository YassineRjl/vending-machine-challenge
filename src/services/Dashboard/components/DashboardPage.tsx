import { useEffect, useMemo, useState } from "react";
import {
  addBalance,
  getAllProducts,
  getAllPurchases,
  getCurrentUser,
  logout,
} from "../../../api";
import { Product, Purchase, User } from "../../../types";
import ProductComponent from "./ProductComponent";
import PurchaseHistoryComponent from "./PurchaseHistoryComponent";
import { useNavigate } from "react-router-dom";
import { VALID_COINS, formatCents, isLoggedIn } from "../../../utils";
import { AxiosError } from "axios";

export const DashboardPage = () => {
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState<User>();
  const [productList, setProductList] = useState<Product[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      user && setBuyer(user);
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        alert((error.response?.data as { message: string })?.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const products = await getAllProducts();
      setProductList(products);
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        alert((error.response?.data as { message: string })?.message);
    }
  };

  const fetchPurchaseHistory = async () => {
    try {
      const purchases = await getAllPurchases();
      setPurchaseHistory(purchases);
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        alert((error.response?.data as { message: string })?.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProducts();
    fetchPurchaseHistory();
  }, []);

  // useMemo doesn't really need to be used here,
  // in case of dealing with thousands of products, it would be a good idea to memoize this.
  // or even better, handle the process on the backend.
  const totalPurchased = useMemo(() => {
    return purchaseHistory.reduce((acc, curr) => acc + curr.totalCost, 0);
  }, [purchaseHistory]);

  if (!buyer) return <div>Loading...</div>;
  if (buyer.role === "seller") return <div>Seller view unsupported</div>;

  return (
    <div className="w-full min-h-screen space-y-12 p-2 md:p-10">
      {/* section 1: Title */}
      <div className="space-y-5 bg-green-50 p-9 rounded-md border border-black/5 shadow">
        <p className="text-24 font-bold ">Welcome {buyer?.username}!</p>
        <p className="text-18">
          Your current deposit is: {formatCents(buyer.deposit)}
        </p>
      </div>

      {/* Section 2: Buttons to increase the deposit */}
      <div className="space-y-5 bg-green-50 p-9 rounded-md border border-black/5 shadow">
        <p className="text-20 font-bold ">Add a coin</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-x-8 gap-y-4">
          {VALID_COINS.map((coin) => (
            <button
              key={coin}
              className="bg-green-500 text-white rounded-md px-4 py-2"
              onClick={() => {
                addBalance(coin).then((user) => {
                  setBuyer(user);
                });
              }}
            >
              {formatCents(coin)}
            </button>
          ))}
        </div>
      </div>

      {/* Section 3: Buy existing products */}
      <div className="space-y-5 bg-green-50 p-4 md:p-9 rounded-md border border-black/5 shadow">
        <p className="text-20 font-bold "> Buy a product</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-2 lg:gap-x-8 gap-y-4 place-items-center md:place-items-start">
          {productList.map((product) => (
            <ProductComponent
              key={product.id}
              product={product}
              user={buyer}
              onPurchased={() => {
                setBuyer((prev) => prev && { ...prev, deposit: 0 });
                // Potential optimization. We could've called a fetch on the specific product that was purchased instead
                // of fetching all products again.
                // I had to sprint through the full exercise in 1 day given the ask is to submit it by Sunday. So I'll leave it like this for now.
                // Happy to discuss further.
                fetchProducts();
                fetchPurchaseHistory();
              }}
            />
          ))}
        </div>
      </div>

      {/* Section 4: History of purchased products */}
      <div className="space-y-5 bg-green-50 p-4 md:p-9 rounded-md border border-black/5 shadow">
        <p className="text-20 font-bold ">
          Total Spent: {formatCents(totalPurchased)}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-2 lg:gap-x-8 gap-y-4 place-items-center md:place-items-start">
          {!Boolean(purchaseHistory.length) && (
            <p className="text-18">No purchases yet</p>
          )}
          {Boolean(purchaseHistory.length) &&
            purchaseHistory.map((purchase) => (
              <PurchaseHistoryComponent key={purchase.id} purchase={purchase} />
            ))}
        </div>
      </div>

      {/* Section 5: Logout */}
      <div className="space-y-5 bg-green-50 p-9 rounded-md border border-black/5 shadow">
        <p className="text-20 font-bold ">Logout</p>
        <button
          className="bg-green-500 text-white rounded-md px-4 py-2"
          onClick={async () => {
            await logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default DashboardPage;
