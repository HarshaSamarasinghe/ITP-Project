import { motion, AnimatePresence } from "framer-motion";
import {VStack, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {FaHome, FaPlus, FaShoppingCart, FaList } from "react-icons/fa";
function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: -250 }}
                    animate={{ x: 0 }}
                    exit={{ x: -250 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: "fixed", top: 0, left: 0, width: "200px", height: "100vh", background: "#2D3748", color: "white", paddingTop: "60px" }}
                >
                    <VStack spacing={6} align="stretch">
                        <Link to="/" onClick={toggleSidebar}><Flex align="center" p={3}><FaHome /><Text ml={3}>Home</Text></Flex></Link>
                        <Link to="/create" onClick={toggleSidebar}><Flex align="center" p={3}><FaPlus /><Text ml={3}>Create</Text></Flex></Link>
                        <Link to="/rentedItems" onClick={toggleSidebar}><Flex align="center" p={3}><FaList /><Text ml={3}>Rented Items</Text></Flex></Link>
                        <Link to="/checkout/:id" onClick={toggleSidebar}><Flex align="center" p={3}><FaShoppingCart /><Text ml={3}>Checkout</Text></Flex></Link>
                    </VStack>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
export default Sidebar;

