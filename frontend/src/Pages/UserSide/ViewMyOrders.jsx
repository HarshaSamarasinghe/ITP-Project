import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useOrderDetails } from "../../store/rentingOrderDetails.js";
import OrderDetailsCard from "../../components/OrderDetailsCard.jsx";

const ViewMyOrders = () => {
	const { fetchOrders, orders } = useOrderDetails();

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	console.log("orders", orders);

	return (
		<Container maxW="container.xl" py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={30} 
					fontWeight="bold"
					bgGradient="linear(to-r, cyan.400, blue.500)"
					bgClip="text"
					textAlign="center"
				>
					My Rented Items
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 1,
					}}
					spacing={10}
					w="full"
				>
					{(orders ?? []).map((order) => (
						<OrderDetailsCard key={order._id} order={order} />
					))}
				</SimpleGrid>
			</VStack>
		</Container>
	);
};

export default ViewMyOrders;
