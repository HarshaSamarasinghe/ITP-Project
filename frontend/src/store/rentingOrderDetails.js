import { create } from "zustand";

export const useOrderDetails = create((set) => ({
  orders: [],
  setOrderDetails: (orders) => set({ orders }),
  createOrderDetails: async (newOrderDetails) => {
		if (!newOrderDetails.cusName || !newOrderDetails.cusEmail || !newOrderDetails.cusPhone || !newOrderDetails.cusAddress || !newOrderDetails.cusTown || !newOrderDetails.cusPostalCode|| !newOrderDetails.shippingMethod || !newOrderDetails.rentFrom || !newOrderDetails.rentTo) {
			return { success: false, message: "Please fill in the all fields." };
		}

      const res = await fetch("http://localhost:4000/api/RentingOrderDetails", {
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
  fetchOrders: async () => {
		const res = await fetch("http://localhost:4000/api/RentingOrderDetails");
		const data = await res.json();
		set({ orders: data.data });
	},

  updateReturnStatus: async (pid, updatedReturnStatus) => {
		const res = await fetch(`http://localhost:4000/api/RentingOrderDetails/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedReturnStatus),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			orders: state.orders.map((order) => (order._id === pid ? data.data : order)),
		}));

		return { success: true, message: data.message };
	},

  
  fetchOrders: async () => {  // Renamed to match component usage
    try {
      const res = await fetch("http://localhost:4000/api/RentingOrderDetails");

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
