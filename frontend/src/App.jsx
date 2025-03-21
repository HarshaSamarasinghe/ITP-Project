import { Route, Routes } from "react-router-dom";
import CreateRentingItems from "./Pages/AdminSide/CreateRentingItems";
import HomePage from "./Pages/UserSide/HomePage";
import ViewSingleItem from "./Pages/UserSide/ViewSingleItem";
import ProductCheckout from "./Pages/UserSide/ProductCheckout";
import RentedItems from "./Pages/AdminSide/adRentedItems.jsx";
import AdminViewRentingStore from "./Pages/AdminSide/AdminViewRentingStore.jsx";
import './App.css'
import AdminSide from "./Pages/AdminSide/AdminSide.jsx";
import UserSide from "./Pages/UserSide/UserSide.jsx";
import RentingStore from "./Pages/UserSide/RentingStore.jsx";
import ViewMyOrders from "./Pages/UserSide/ViewMyOrders.jsx";
import AdminViewRentingOrders from "./Pages/AdminSide/adRentedItems.jsx";

function App() {
   

    return (
        
        <>
             <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/createRentingItem" element={<CreateRentingItems />} />
                    <Route path="/adRentingStore" element = {<AdminViewRentingStore/>}/>
                    <Route path="/viewSingleItem/:id" element={<ViewSingleItem />} />
                    <Route path="/checkout/:id" element={<ProductCheckout />} />
                    <Route path="/rentedItems" element={<RentedItems />} />
                    <Route path="/adminSide" element={<AdminSide />} />
                    <Route path="/userSide" element={<UserSide />} />
                    <Route path="/rentingStore" element={<RentingStore />} />
                    <Route path="/viewMyOrders" element={<ViewMyOrders />} />
                    

                    <Route path="/rentingOrderList" element= {<AdminViewRentingOrders />}/>
                    
                </Routes>
        </>
    );
}

export default App;
