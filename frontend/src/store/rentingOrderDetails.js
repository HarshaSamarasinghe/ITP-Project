import { create } from "zustand";

export const useOrderDetails = create((set) => ({
  orders: [],
  setOrderDetails: (orders) => set({ orders }),
  createOrderDetails: async (newOrderDetails) => {
		if (!newOrderDetails.cusName || !newOrderDetails.cusEmail || !newOrderDetails.cusPhone || !newOrderDetails.cusAddress || !newOrderDetails.cusTown || !newOrderDetails.cusPostalCode|| !newOrderDetails.shippingMethod || !newOrderDetails.rentFrom || !newOrderDetails.rentTo) {
			return { success: false, message: "Please fill in the all fields." };
		}

      const res = await fetch("/api/RentingOrderDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrderDetails),
      });

  }
}));
