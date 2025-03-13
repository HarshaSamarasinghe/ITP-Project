// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useProductStore } from "../store/rentingItems";
// import axios from "axios";

// import {
//   Box,
//   Button,
//   Divider,
//   FormControl,
//   Input,
//   Select,
//   Stack,
//   Text,
//   Image,
//   Flex,
//   Heading,
//   HStack,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";

// const ProductCheckout = () => {
//   const { id } = useParams();
//   const product = useProductStore((state) =>
//     state.products.find((prod) => prod._id === id)
//   );

//   const [rentalPeriod, setNewRentingOrder] = useState(1);
//   const shippingFee = 500;


//    const toast = useToast();
      

//       const proceedToCheckout = async () => {
//         try {
//             const response = await axios.post("/api/RentingOrderDetails",newRentingOrder) //  actual API endpoint
//             toast({
//               title: 'Order Placed',
//               description: `${response.data.message}, ${product.eqName} order has been placed successfully.`,
//               status: 'success',
//               isClosable: true,
//           });
//             setNewRentingOrder({ cusName: "", cusEmail: "", cusPhone: "", cusAddress: "", cusCity: "", cusPostalCode: "", TotalPrice: "", rentalPeriod: "", shippingMethod: "" });
//         } catch (error) {
//             toast({
//                 title: "Error",
//                 description: error.response ? error.response.data.message : "An error occurred",
//                 status: "error",
//                 isClosable: true,
//             });
//         }
//     };

//   const totalPrice = product ? (product.eqPrice * rentalPeriod) + shippingFee : 0;

//   return (
//     <Box maxW="6xl" mx="auto" p={8} display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} borderRadius="lg" boxShadow="xl">
//       {/* Left Section: Shipping Information */}
//       <Box p={6} bg="grey.500" borderRadius="lg" boxShadow="lg">
//         <Heading size="lg" mb={4} color="blue.600">Shipping Information</Heading>
        
//         <Stack spacing={4}>
//           <FormControl>
//             <Input 
//              placeholder="Full Name" 
//              borderColor={'grey.200'}
//              name="cusName"
//              value={newRentingOrder.cusName}
//              onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusName: e.target.value })}
//              />
//           </FormControl>
//           <Flex gap={4}>
//             <FormControl flex="1">
//               <Input 
//               placeholder="Email" 
//               borderColor={'grey.200'}
//               name="cusEmail"
//               type="email"
//               value={newRentingOrder.cusEmail}
//               onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusEmail: e.target.value })}
//               />
//             </FormControl>
//             <FormControl flex="1">
//               <Input 
//               placeholder="Phone" 
//               borderColor={'grey.200'}
//               name="cusPhone"
//               type="tel"
//               value={newRentingOrder.cusPhone}
//               onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusPhone: e.target.value })}
//               />
//             </FormControl>
//           </Flex>
//           <FormControl>
//             <Input 
//             placeholder="Address" 
//             borderColor={'grey.200'}
//             name="cusAddress"
//             value={newRentingOrder.cusAddress}
//             onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusAddress: e.target.value })}
//             />
//           </FormControl>
//           <FormControl>
//             <Input 
//             placeholder="City" 
//             borderColor={'grey.200'}
//             name="cusCity"
//             value={newRentingOrder.cusCity}
//             onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusCity: e.target.value })}
//             />
//           </FormControl>
//           <FormControl>
//             <Input 
//             placeholder="Postal code" 
//             borderColor={'grey.200'}
//             name="cusPostalCode"
//             value={newRentingOrder.cusPostalCode}
//             onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusPostalCode: e.target.value })}
//             />
//           </FormControl>
          
//         </Stack>

//         {/* Shipping Method */}
//         <Heading size="md" mt={6} >Shipping Method</Heading>
//         {/* <RadioGroup defaultValue="heavy">
//           <Stack p={3} border="1px" borderRadius="md" borderColor="gray.200" >
//             <Radio value="heavy">Heavy Delivery - Rs.500.00</Radio>
//           </Stack>
//         </RadioGroup> */}
//         <Select 
//           placeholder="Select Shipping Method..."
//           name="shippingMethod"
//           value={newRentingOrder.shippingMethod}
//           onChange={(e) => setNewRentingOrder({ ...newRentingOrder, shippingMethod: e.target.value })}
//         >
//           <option value="COD">Cash of Delivary - Rs.500.00</option>
//           <option value="BANK">Bank Payment - Rs.30.00</option>
//           <option value="FREE">Free Delivery - Rs.0.00</option>
//         </Select>

//         {/* Rental Period */}
//         <Heading size="md" mt={6} >Rental Period</Heading>
//         <Stack p={2} border="1px" borderRadius="md" borderColor="gray.200" >
//           <Select
//             border="0px"
//             placeholder="Select Rental Period..."
//             fontWeight="sm"
//             name="rentalPeriod"
//             value={rentalPeriod}
//             onChange={(e) => setNewRentingOrder({ ...newRentingOrder, rentalPeriod: e.target.value })}
//           >
//             {[...Array(7)].map((_, i) => (
//               <option key={i + 1} value={i + 1}>{i + 1} Day{i > 0 ? "s" : ""}</option>
//             ))}
//           </Select>
//         </Stack>
//       </Box>

//       {/* Right Section: Order Summary */}
//       <Box borderLeft={{ md: "1px solid" }} borderColor="gray.200" pl={{ md: 6 }} p={6}  borderRadius="lg" boxShadow="lg">
//         <Heading size="md" mb={4} >Order Summary</Heading>
//         <HStack alignItems="start" spacing={6}>
//           <Image src={product?.eqImage} alt={product?.eqName} boxSize='200px' objectFit='cover' rounded={'lg'} shadow="md" />
//           <VStack alignItems="start" spacing={2}>
//           <Heading size="md" mb={4} >{product.eqName}</Heading>
//             <Text >Price Per Day: Rs.{product?.eqPrice}</Text>
//             <Text>Rental Period: {rentalPeriod} Day{rentalPeriod > 1 ? "s" : ""}</Text>
//           </VStack>
//         </HStack>

//         {/* Pricing Breakdown */}
//         <Box mt={6} textAlign="right">
//           <Text>
//             Subtotal: <Text as="span" fontWeight="semibold">Rs.{product ? product.eqPrice * rentalPeriod : 0}</Text>
//           </Text>
//           <Text>
//             Shipping Fee: <Text as="span" fontWeight="semibold">Rs.{shippingFee}</Text>
//           </Text>
//           <Divider my={2} />
//           <Text fontSize="xl" fontWeight="bold"
//           name="totalPrice"
//           value={totalPrice}
//           onChange={(e) => setNewRentingOrder({ ...newRentingOrder, totalPrice: e.target.value })}
//           >Total: Rs.{totalPrice}</Text>
          
//         </Box>

//         <Button colorScheme="blue" size="lg" mt={6} w="full" onClick={proceedToCheckout}>Proceed to Checkout</Button>
//         <Button colorScheme="red" size="lg" mt={6} w="full">Cancel</Button>
       
//       </Box>
//     </Box>
//   );
// };

// export default ProductCheckout;






// import React, { useState , useEffect} from "react";
// import { useParams } from "react-router-dom";
// import { useProductStore } from "../store/rentingItems";
// import axios from "axios";

// import {
//   Box,
//   Button,
//   Divider,
//   FormControl,
//   Input,
//   Select,
//   Stack,
//   Text,
//   Image,
//   Flex,
//   Heading,
//   HStack,
//   VStack,
//   useToast,
  
// } from "@chakra-ui/react";

// const ProductCheckout = () => {
//   const { id } = useParams();
//   const product = useProductStore((state) =>
//     state.products.find((prod) => prod._id === id)
//   );

//   const [newRentingOrder, setNewRentingOrder] = useState({
//     cusName: "",
//     cusEmail: "",
//     cusPhone: "",
//     cusAddress: "",
//     cusTown: "",
//     cusPostalCode: "",
//     shippingMethod: "",
//     rentalPeriod: 1,
//     TotalPrice: 0,
//   });

//   const shippingFee = 500;
//   const toast = useToast();

//   const calculateTotalPrice = () => {
//     return product ? (product.eqPrice * newRentingOrder.rentalPeriod) + shippingFee : 0;
//   };

//   const updateTotalPrice = () => {
//     const total = calculateTotalPrice();
//     setNewRentingOrder((prevOrder) => ({
//       ...prevOrder,
//       TotalPrice: total,
//     }));
//   };

//   useEffect(() => {
//     updateTotalPrice();
//   }, [newRentingOrder.rentalPeriod, newRentingOrder.shippingMethod]);

//   const proceedToCheckout = async () => {
//     console.log(TotalPrice);
//     try {
//       const response = await axios.post("/api/RentingOrderDetails", newRentingOrder);
//       toast({
//         title: 'Order Placed',
//         description: `${response.data.message}, ${product.eqName} order has been placed successfully.`,
//         status: 'success',
//         isClosable: true,
//       });
//       setNewRentingOrder({
//         cusName: "",
//         cusEmail: "",
//         cusPhone: "",
//         cusAddress: "",
//         cusCity: "",
//         cusPostalCode: "",
//         shippingMethod: "",
//         rentalPeriod: 1,
//         TotalPrice: 0,
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.response ? error.response.data.message : "An error occurred",
//         status: "error",
//         isClosable: true,
//       });
//     }
//   };

//   // const TotalPrice = product ? (product.eqPrice * newRentingOrder.rentalPeriod) + shippingFee : 0;

//   return (
//     <Box maxW="6xl" mx="auto" p={8} display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} borderRadius="lg" boxShadow="xl">
//       {/* Left Section: Shipping Information */}
//       <Box p={6} bg="grey.500" borderRadius="lg" boxShadow="lg">
//         <Heading size="lg" mb={4} color="blue.600">Shipping Information</Heading>
        
//         <Stack spacing={4}>
//           <FormControl>
//             <Input 
//               placeholder="Full Name" 
//               borderColor={'grey.200'}
//               name="cusName"
//               value={newRentingOrder.cusName}
//               onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusName: e.target.value })}
//             />
//           </FormControl>
//           <Flex gap={4}>
//             <FormControl flex="1">
//               <Input 
//                 placeholder="Email" 
//                 borderColor={'grey.200'}
//                 name="cusEmail"
//                 type="email"
//                 value={newRentingOrder.cusEmail}
//                 onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusEmail: e.target.value })}
//               />
//             </FormControl>
//             <FormControl flex="1">
//               <Input 
//                 placeholder="Phone" 
//                 borderColor={'grey.200'}
//                 name="cusPhone"
//                 type="number"
//                 value={newRentingOrder.cusPhone}
//                 onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusPhone: e.target.value })}
//               />
//             </FormControl>
//           </Flex>
//           <FormControl>
//             <Input 
//               placeholder="Address" 
//               borderColor={'grey.200'}
//               name="cusAddress"
//               value={newRentingOrder.cusAddress}
//               onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusAddress: e.target.value })}
//             />
//           </FormControl>
//           <FormControl>
//             <Input 
//               placeholder="Town" 
//               borderColor={'grey.200'}
//               name="cusTown"
//               value={newRentingOrder.cusTown}
//               onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusTown: e.target.value })}
//             />
//           </FormControl>
//           <FormControl>
//             <Input 
//               placeholder="Postal code" 
//               borderColor={'grey.200'}
//               name="cusPostalCode"
//               value={newRentingOrder.cusPostalCode}
//               onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusPostalCode: e.target.value })}
//             />
           
//           </FormControl>
//         </Stack>

//         {/* Shipping Method */}
//         <Heading size="md" mt={6} >Shipping Method</Heading>
//         <Select 
//           placeholder="Select Shipping Method..."
//           name="shippingMethod"
//           value={newRentingOrder.shippingMethod}
//           onChange={(e) => setNewRentingOrder({ ...newRentingOrder, shippingMethod: e.target.value })}
//         >
//           <option value="COD">Cash on Delivery - Rs.500.00</option>
//           <option value="BANK">Bank Payment - Rs.30.00</option>
//           <option value="FREE">Free Delivery - Rs.0.00</option>
//         </Select>

//         {/* Rental Period */}
//         <Heading size="md" mt={6} >Rental Period</Heading>
//         <Stack p={2} border="1px" borderRadius="md" borderColor="gray.200" >
//           <Select
//             border="0px"
//             placeholder="Select Rental Period..."
//             fontWeight="sm"
//             name="rentalPeriod"
//             value={newRentingOrder.rentalPeriod}
//             onChange={(e) => setNewRentingOrder({ ...newRentingOrder, rentalPeriod: parseInt(e.target.value) })}
//           >
//             {[...Array(7)].map((_, i) => (
//               <option key={i + 1} value={i + 1}>{i + 1} Day{i > 0 ? "s" : ""}</option>
//             ))}
//           </Select>
//         </Stack>
//       </Box>

//       {/* Right Section: Order Summary */}
//       <Box borderLeft={{ md: "1px solid" }} borderColor="gray.200" pl={{ md: 6 }} p={6} borderRadius="lg" boxShadow="lg">
//         <Heading size="md" mb={4} >Order Summary</Heading>
//         <HStack alignItems="start" spacing={6}>
//           <Image src={product?.eqImage} alt={product?.eqName} boxSize='200px' objectFit='cover' rounded={'lg'} shadow="md" />
//           <VStack alignItems="start" spacing={2}>
//             <Heading size="md" mb={4} >{product.eqName}</Heading>
//             <Text >Price Per Day: Rs.{product?.eqPrice}</Text>
//             <Text>Rental Period: {newRentingOrder.rentalPeriod} Day{newRentingOrder.rentalPeriod > 1 ? "s" : ""}</Text>
//           </VStack>
//         </HStack>

//         {/* Pricing Breakdown */}
//         <Box mt={6} textAlign="right">
//           <Text>
//             Subtotal: <Text as="span" fontWeight="semibold">Rs.{product ? product.eqPrice * newRentingOrder.rentalPeriod : 0}</Text>
//           </Text>
//           <Text>
//             Shipping Fee: <Text as="span" fontWeight="semibold">Rs.{shippingFee}</Text>
//           </Text>
//           <Divider my={2} />
//           <Text fontSize="xl" fontWeight="bold">Total: Rs.{newRentingOrder.TotalPrice}</Text>
//         </Box>

//         <Button colorScheme="blue" size="lg" mt={6} w="full" onClick={proceedToCheckout}>Proceed to Checkout</Button>
//         <Button colorScheme="red" size="lg" mt={6} w="full">Cancel</Button>
//       </Box>
//     </Box>
//   );
// };

// export default ProductCheckout;





import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/rentingItems";
import axios from "axios";

import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  Select,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  HStack,
  VStack,
  useToast,
  
} from "@chakra-ui/react";

const ProductCheckout = () => {
  const { id } = useParams();
  const product = useProductStore((state) =>
    state.products.find((prod) => prod._id === id)
  );

  const [newRentingOrder, setNewRentingOrder] = useState({
    cusName: "",
    eqID: id,
    cusEmail: "",
    cusPhone: "",
    cusAddress: "",
    cusTown: "",
    cusPostalCode: "",
    shippingMethod: "",
    rentFrom: "",
    rentTo: "",
    TotalPrice: 0,
  });

  const toast = useToast();

  const calculateTotalPrice = () => {
    const rentingPeriod = getRentingPeriod();
    const shippingFee = getShippingFee();

    return product ? rentingPeriod * product.eqPrice + shippingFee : 0;
  };


  const getRentingPeriod = () => {
    if (!newRentingOrder.rentFrom || !newRentingOrder.rentTo) return 0;

    const fromDate = new Date(newRentingOrder.rentFrom);
    const toDate = new Date(newRentingOrder.rentTo);

    const diffInMs = toDate - fromDate;
    const diffInDays = Math.max(0, diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  };

  const getShippingFee = () => {
    switch (newRentingOrder.shippingMethod) {
      case "BANK":
        return 30;
      case "FREE":
        return 0;
      default:
        return 500;
    }
  };

  


  const updateTotalPrice = () => {
    const total = calculateTotalPrice();
    setNewRentingOrder((prevOrder) => ({
      ...prevOrder,
      TotalPrice: total,
    }));
  };

  useEffect(() => {
    setNewRentingOrder((prevOrder) => ({
      ...prevOrder,
      TotalPrice: calculateTotalPrice(),
    }));
  }, [newRentingOrder.rentFrom, newRentingOrder.rentTo, newRentingOrder.shippingMethod]);
 
 
  const proceedToCheckout = async () => {
    console.log(newRentingOrder.TotalPrice); // Corrected reference to TotalPrice
    try {
      await axios.post("/api/RentingOrderDetails", newRentingOrder);
      toast({
        title: 'Order Placed',
        description: `${product.eqName} order has been placed successfully.`,
        status: 'success',
        isClosable: true,
      });
      setNewRentingOrder({
        cusName: "",
        eqID: id,
        cusEmail: "",
        cusPhone: "",
        cusAddress: "",
        cusCity: "",
        cusPostalCode: "",
        shippingMethod: "",
        rentFrom: "",
        rentTo: "",
        TotalPrice: 0,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response ? error.response.data.message : "An error occurred",
        status: "error",
        isClosable: true,
      });
    }
  };

  const cancelCheckout = () => {

  };

  return (
    <Box maxW="6xl" mx="auto" p={8} display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} borderRadius="lg" boxShadow="xl">
      {/* Left Section: Shipping Information */}
      <Box p={6} bg="grey.500" borderRadius="lg" boxShadow="lg">
        <Heading size="lg" mb={4} color="blue.600">Shipping Information</Heading>
        
        <Stack spacing={4}>
          <FormControl>
            <Input 
              placeholder="Full Name" 
              borderColor={'grey.200'}
              name="cusName"
              value={newRentingOrder.cusName}
              onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusName: e.target.value })}
            />
          </FormControl>
          <Flex gap={4}>
            <FormControl flex="1">
              <Input 
                placeholder="Email" 
                borderColor={'grey.200'}
                name="cusEmail"
                type="email"
                value={newRentingOrder.cusEmail}
                onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusEmail: e.target.value })}
              />
            </FormControl>
            <FormControl flex="1">
              <Input 
                placeholder="Phone" 
                borderColor={'grey.200'}
                name="cusPhone"
                type="number"
                value={newRentingOrder.cusPhone}
                onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusPhone: e.target.value })}
              />
            </FormControl>
          </Flex>
          <FormControl>
            <Input 
              placeholder="Address" 
              borderColor={'grey.200'}
              name="cusAddress"
              value={newRentingOrder.cusAddress}
              onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusAddress: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <Input 
              placeholder="Town" 
              borderColor={'grey.200'}
              name="cusTown"
              value={newRentingOrder.cusTown}
              onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusTown: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <Input 
              placeholder="Postal code" 
              borderColor={'grey.200'}
              name="cusPostalCode"
              value={newRentingOrder.cusPostalCode}
              onChange={(e) => setNewRentingOrder({ ...newRentingOrder, cusPostalCode: e.target.value })}
            />
          </FormControl>
          <Heading size="md" mt={6} >Renting Period</Heading>
          <Flex gap={4}>
            <FormControl flex="1">
              <Input 
                placeholder="Rent From" 
                borderColor={'grey.200'}
                name="rentFrom"
                type="date"
                value={newRentingOrder.rentFrom}
                onChange={(e) => setNewRentingOrder({ ...newRentingOrder, rentFrom: e.target.value })}
              />
            </FormControl>
            <FormControl flex="1">
              <Input 
                placeholder="Rent To" 
                borderColor={'grey.200'}
                name="rentTo"
                type="date"
                value={newRentingOrder.rentTo}
                onChange={(e) => setNewRentingOrder({ ...newRentingOrder, rentTo: e.target.value })}
              />
            </FormControl>
          </Flex>
        </Stack>

        {/* Shipping Method */}
        <Heading size="md" mt={6} >Payment Method</Heading>
        <Select 
          placeholder="Select Payment Method..."
          name="shippingMethod"
          value={newRentingOrder.shippingMethod}
          onChange={(e) => setNewRentingOrder({ ...newRentingOrder, shippingMethod: e.target.value })}
        >
          <option value="COD">Cash on Delivery - Rs.500.00</option>
          <option value="BANK">Bank Payment - Rs.30.00</option>
          <option value="FREE">Free Delivery - Rs.0.00</option>
        </Select>

       
      </Box>

      {/* Right Section: Order Summary */}
      <Box borderLeft={{ md: "1px solid" }} borderColor="gray.200" pl={{ md: 6 }} p={6} borderRadius="lg" boxShadow="lg">
        <Heading size="md" mb={4} >Order Summary</Heading>
        <HStack alignItems="start" spacing={6}>
          <Image src={product?.eqImage} alt={product?.eqName} boxSize='200px' objectFit='cover' rounded={'lg'} shadow="md" />
          <VStack alignItems="start" spacing={2}>
            <Heading size="md" mb={4} >{product?.eqName}</Heading>
            <Text>Price Per Day: Rs.{product?.eqPrice}</Text>
        <Text>Rental Period: {getRentingPeriod()} days</Text>
        
       
        <Divider my={2} />
       
          </VStack>
        </HStack>

        {/* Pricing Breakdown */}
        <Box mt={6} textAlign="right">
          <Text>
            Subtotal: <Text as="span" fontWeight="semibold">Rs.{getRentingPeriod() * (product?.eqPrice || 0)}</Text>
          </Text>
          <Text>
            Shipping Fee: <Text as="span" fontWeight="semibold">Rs.{getShippingFee()}</Text>
          </Text>
          <Divider my={2} />
          <Text fontSize="xl" fontWeight="bold">Total: Rs.{newRentingOrder.TotalPrice}</Text>
        </Box>

        <Button colorScheme="blue" size="lg" mt={6} w="full" onClick={proceedToCheckout}>Proceed to Checkout</Button>
        <Button colorScheme="red" size="lg" mt={6} w="full" onClick={cancelCheckout}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default ProductCheckout;
