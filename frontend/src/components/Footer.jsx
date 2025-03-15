import {
	Box,
	Container,
	Flex,
	HStack,
	Text,

  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  
 const Footer = () => {
	return (
	  <Box as="footer" bg="gray.800" color="white" py={8}>
		<Container maxW="1050px" >
		  <Flex
			direction={{ base: "column", md: "row" }}
			justify="space-between"
			align="center"
		  >
			<Text fontSize="xl" fontWeight="bold">
			  Product Store 🛒
			</Text>
			<HStack spacing={8}>
			  <Link to="/about">
				<Text>About Us</Text>
			  </Link>
			  <Link to="/contact">
				<Text>Contact</Text>
			  </Link>
			  <Link to="/privacy">
				<Text>Privacy Policy</Text>
			  </Link>
			</HStack>
		  </Flex>
		  <Text mt={4} textAlign="center" fontSize="sm">
			&copy; {new Date().getFullYear()} Sports Saga Store. All rights reserved.
		  </Text>
		</Container>
	  </Box>
	);
  };

  export default Footer;