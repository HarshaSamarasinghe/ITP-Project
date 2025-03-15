import {
	Box,
	Flex,
	Heading,
	Image,
	Text,
	useColorModeValue,
	Divider
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

const OrderDetailsCard = ({ order }) => {
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	return (
		<Link to={`/#/${order?._id}`}>
		<Box
			shadow="lg"
			rounded="lg"
			overflow="hidden"
			transition="all 0.3s"
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
			w={700}
			h={220}
		>
			<Flex>
			<Box w={200} borderRight={"1px"} borderColor={"grey"}>
			
			<Image
				src={order?.eqID?.eqImage || "/placeholder.png"} // Added fallback image
				alt={order?.eqID?.eqName || "Equipment Image"}
				h={60}
				w="full"
				objectFit="cover" // Changed from 'fill' to 'cover'
			/>
			</Box>


			<Box flex="2" ml={{ md: 4 }} paddingLeft={4}>
          <Heading as="h3" size="lg" mb={2} color={useColorModeValue("gray.800", "gray.100")}>
            {order?.eqID?.eqName || "Equipment Name"}
          </Heading>


          <Flex direction="column" gap={2}>
            <Box>
              <Text fontWeight="bold" fontSize="md" color={textColor}>
                Ref Number: <span style={{ fontWeight: "normal" }}>{order?._id}</span>
              </Text>
              <Text fontWeight="bold" fontSize="md" color={textColor}>
                Price Paid: <span style={{ fontWeight: "normal" }}>Rs.{order?.TotalPrice || "N/A"}</span>
              </Text>
              <Text fontWeight="bold" fontSize="md" color={textColor}>
                Shipping Method: <span style={{ fontWeight: "normal" }}>{order?.shippingMethod || "N/A"}</span>
              </Text>
            </Box>
			<Divider/>
 
            <Box mt={2}>
              <Text fontWeight="bold" fontSize="md" color={textColor}>
                Rented From: <span style={{ fontWeight: "normal" }}>{order?.rentFrom || "N/A"}</span>
              </Text>
              <Text fontWeight="bold" fontSize="md" color={textColor}>
                Rented To: <span style={{ fontWeight: "normal" }}>{order?.rentTo || "N/A"}</span>
              </Text>
			  <Text fontWeight="bold" fontSize="md" color={textColor}>
                Return Status: <span style={{ fontWeight: "normal" }}>{ "N/A"}</span>
              </Text>
            </Box>
          </Flex>
        </Box>
		</Flex>
	</Box>
  
		</Link>
	);
};

export default OrderDetailsCard;
