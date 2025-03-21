import { motion, AnimatePresence } from "framer-motion";
import {VStack, Flex, Text,useColorMode, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {FaHome, FaPlus, FaShoppingCart, FaList } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

function Sidebar({ isOpen, toggleSidebar }) {

    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: -250 }}
                    animate={{ x: 0 }}
                    exit={{ x: -250 }}
                    transition={{ duration: 0.4 }}
                    style={{ position: "fixed",
                         top: 0, left: 0, 
                         width: "200px", 
                         height: "100vh", 
                         paddingTop: "60px",
                         boxShadow: "4px 0 8px rgba(0, 0, 0, 0.2)", // Adds shadow for depth
                         borderTopRightRadius: "10px", // Rounded top right corner
                         borderBottomRightRadius: "10px",
                         zIndex: 1000,
                        }}
                >
                    <VStack spacing={6} align="stretch">
                        <Link to="/" onClick={toggleSidebar}><Flex align="center" p={3}><FaHome /><Text ml={3}>Home</Text></Flex></Link>
                        <Link to="/create" onClick={toggleSidebar}><Flex align="center" p={3}><FaPlus /><Text ml={3}>Create</Text></Flex></Link>
                        <Link to="/rentedItems" onClick={toggleSidebar}><Flex align="center" p={3}><FaList /><Text ml={3}>Rented Items</Text></Flex></Link>
                        
                        <Link to="/rentingStore" onClick={toggleSidebar}><Flex align="center" p={3}><FaShoppingCart /><Text ml={3}>Equipment Store</Text></Flex></Link>
                        <Flex><Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />} </Button></Flex>
					
                    </VStack>
                   
                </motion.div>
            )}
        </AnimatePresence>
    );
};
export default Sidebar;

