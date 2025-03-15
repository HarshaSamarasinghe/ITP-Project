import {  DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Divider,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/rentingItems";
import { useState } from "react";
import { Link, } from "react-router-dom";
import React from "react";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteProduct, updateProduct } = useProductStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure()
	


	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	

	return (
		
		
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-10px)", shadow: "xl" }}
			bg={bg}
			w={280}
		>
			<Link to={`/viewSingleItem/${product._id}`}>
			<Image src={product.eqImage} alt={product.eqName} h={48} w='full' objectFit={'fill'} />
			</Link>
			<Divider borderWidth="2px" borderColor="gray.500" />
			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.eqName}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					Rs.{product.eqPrice} / day
				</Text>

				<HStack spacing={10} justify='center' mt={4}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue'  w={'full'}/>
					
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteProduct(product._id)}
						colorScheme='red'
						w={'full'}
						
					/>
	
				</HStack>
			</Box>
			

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Equipment</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='eqName'
								value={updatedProduct.eqName}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, eqName: e.target.value })}
							/>
							<Input
								placeholder='Description'
								name='eqDescription'
								value={updatedProduct.eqDescription}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, eqDescription: e.target.value })}
							/>
							<Input
								placeholder='Price Per Day'
								name='eqPrice'
								value={updatedProduct.eqPrice}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, eqPrice: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='eqImage'
								value={updatedProduct.eqImage}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, eqImage: e.target.value })}
							/>
							<Select
								placeholder='Select Availability'
								name='eqAvailability'
								value={updatedProduct.eqAvailability}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, eqAvailability: e.target.value })}
							>
								<option value="In Stock">In Stock</option>
								<option value="Out of Stock">Out of Stock</option>
							</Select>
							
							
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			
		</Box>
		
		
	);
};
export default ProductCard;
