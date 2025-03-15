import { Box, useColorModeValue, IconButton,} from "@chakra-ui/react";
import { Route, Routes, } from "react-router-dom";
import { FaBars, FaTimes,} from "react-icons/fa";
import { useState } from "react";
import CreatePage from "./Pages/CreatePage";
import HomePage from "./Pages/HomePage";
import ViewSingleItem from "./Pages/ViewSingleItem";
import ProductCheckout from "./components/ProductCheckout";
import RentedItems from "./Pages/RentedItems";
import Footer from "./components/Footer";
import Sidebar from "./components/SideBar";


function App() {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.700")}> 
            <IconButton
                icon={isOpen ? <FaTimes /> : <FaBars />}
                onClick={toggleSidebar}
                position="fixed"
                top={4}
                left={4}
                zIndex={10}
                aria-label="Toggle Sidebar"
            />
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <Box ml={isOpen ? "200px" : "0"} transition="margin 0.3s">
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/create' element={<CreatePage />} />
                    <Route path='/viewSingleItem/:id' element={<ViewSingleItem />} />
                    <Route path='/checkout/:id' element={<ProductCheckout />} />
                    <Route path='/rentedItems' element={<RentedItems />} />
                </Routes>
            </Box>
            <Footer />
        </Box>
    );
}

export default App;
