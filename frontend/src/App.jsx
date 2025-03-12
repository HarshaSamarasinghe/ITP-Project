import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreatePage from "./Pages/CreatePage";
import HomePage from "./Pages/HomePage";
import Navbar from "./components/Navbar";
import ViewSingleItem from "./Pages/ViewSingleItem";
import ProductCheckout from "./components/ProductCheckout";


function App() {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.700")}>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/create' element={<CreatePage />} />
				<Route path='/viewSingleItem/:id' element={<ViewSingleItem />} />
				<Route path='/checkout/:id' element={<ProductCheckout />} />
			</Routes>
		</Box>
	);
}

export default App;
