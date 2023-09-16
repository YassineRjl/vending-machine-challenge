// constants
export const IMAGE_API = `https://source.unsplash.com/random?coffee`;
export const LANDING_PAGE_URL = "https://vendingmachine.com";
export const VALID_COINS = [5, 10, 20, 50, 100];

// auth
export const isLoggedIn = () => Boolean(localStorage.getItem("token"));

// actions
export const formatCents = (cents: number) =>
  (cents / 100).toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
  });
