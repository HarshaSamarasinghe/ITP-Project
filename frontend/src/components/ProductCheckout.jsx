import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/rentingItems";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Image,
  Link,
  Flex,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";

const ProductCheckout = () => {
  const { id } = useParams();
  const product = useProductStore((state) =>
    state.products.find((prod) => prod._id === id)
  );

  const [rentalPeriod, setRentalPeriod] = useState(1);
  const shippingFee = 500;

  const totalPrice = product ? (product.eqPrice * rentalPeriod) + shippingFee : 0;

  return (
    <Box maxW="6xl" mx="auto" p={8} display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} borderRadius="lg" boxShadow="xl">
      {/* Left Section: Shipping Information */}
      <Box p={6} bg="grey.500" borderRadius="lg" boxShadow="lg">
        <Heading size="lg" mb={4} color="blue.600">Shipping Information</Heading>
        <Text fontSize="sm" mb={4}>
          Already have an account? <Link >Login</Link>
        </Text>
        
        <Stack spacing={4}>
          <FormControl>
            <Input placeholder="Full Name"  borderColor={'grey.200'}/>
          </FormControl>
          <Flex gap={4}>
            <FormControl flex="1">
              <Input placeholder="Email" borderColor={'grey.200'}/>
            </FormControl>
            <FormControl flex="1">
              <Input placeholder="Phone" borderColor={'grey.200'}/>
            </FormControl>
          </Flex>
          <FormControl>
            <Input placeholder="Address" borderColor={'grey.200'}/>
          </FormControl>
          <FormControl>
            <Select placeholder="Select city..." borderColor={'grey.200'}>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
            </Select>
          </FormControl>
          <FormControl>
            <Input placeholder="Postal code" borderColor={'grey.200'}/>
          </FormControl>
          
        </Stack>

        {/* Shipping Method */}
        <Heading size="md" mt={6} >Shipping Method</Heading>
        <RadioGroup defaultValue="heavy">
          <Stack p={3} border="1px" borderRadius="md" borderColor="gray.200" >
            <Radio value="heavy">Heavy Delivery - Rs.500.00</Radio>
          </Stack>
        </RadioGroup>

        {/* Rental Period */}
        <Heading size="md" mt={6} >Rental Period</Heading>
        <Stack p={2} border="1px" borderRadius="md" borderColor="gray.200" >
          <Select
            border="0px"
            placeholder="Select Rental Period..."
            fontWeight="sm"
            value={rentalPeriod}
            onChange={(e) => setRentalPeriod(Number(e.target.value))}
          >
            {[...Array(7)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} Day{i > 0 ? "s" : ""}</option>
            ))}
          </Select>
        </Stack>
      </Box>

      {/* Right Section: Order Summary */}
      <Box borderLeft={{ md: "1px solid" }} borderColor="gray.200" pl={{ md: 6 }} p={6}  borderRadius="lg" boxShadow="lg">
        <Heading size="md" mb={4} >Order Summary</Heading>
        <HStack alignItems="start" spacing={6}>
          <Image src={product?.eqImage} alt={product?.eqName} boxSize='200px' objectFit='cover' rounded={'lg'} shadow="md" />
          <VStack alignItems="start" spacing={2}>
          <Heading size="md" mb={4} >{product.eqName}</Heading>
            <Text >Price Per Day: Rs.{product?.eqPrice}</Text>
            <Text>Rental Period: {rentalPeriod} Day{rentalPeriod > 1 ? "s" : ""}</Text>
          </VStack>
        </HStack>

        {/* Pricing Breakdown */}
        <Box mt={6} textAlign="right">
          <Text>
            Subtotal: <Text as="span" fontWeight="semibold">Rs.{product ? product.eqPrice * rentalPeriod : 0}</Text>
          </Text>
          <Text>
            Shipping Fee: <Text as="span" fontWeight="semibold">Rs.{shippingFee}</Text>
          </Text>
          <Divider my={2} />
          <Text fontSize="xl" fontWeight="bold" >Total: Rs.{totalPrice}</Text>
        </Box>

        <Button colorScheme="blue" size="lg" mt={6} w="full">Proceed to Checkout</Button>

       
      </Box>
    </Box>
  );
};

export default ProductCheckout;