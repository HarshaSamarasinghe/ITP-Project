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
      const data = await res.json();
      set((state) => ({ orders: [...state.orders, data.data] }));
      return { success: true, message: "Order created successfully" };

  },

  
  fetchOrders: async () => {  // Renamed to match component usage
    try {
      const res = await fetch("/api/RentingOrderDetails");

      if (!res.ok) {
        throw new Error("Failed to fetch orders.");
      }

      const data = await res.json();

      if (!data?.data) {
        throw new Error("Invalid response from server.");
      }

      set({ orders: data.data });
    } catch (error) {
      console.error("Error fetching orders:", error);
      set({ orders: [] }); // Ensures state does not break
    }
  },
}));
