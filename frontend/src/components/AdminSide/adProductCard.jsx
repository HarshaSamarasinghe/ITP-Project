import {  DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Button,
	ButtonGroup,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../../store/rentingItems";
import { useState } from "react";
import { Link, } from "react-router-dom";
import React from "react";
import "./adProductCard.css"
import 'boxicons/css/boxicons.min.css';


const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

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

		<React.Fragment>
			
			
				<div className="card-product">
					
					<Link to={`/viewSingleItem/${product._id}`}>
					<div className="card-product-img">
						<img src={product.eqImage} alt={product.eqName} className="product-img"/>
					</div>
					</Link>
					<div className="card-product-body">
        				<h1 className="product-name"></h1>
        					<div className="flex-item">
							<h1 className="product-name">{product.eqName}</h1>
							<p className="product-price">Rs. {product.eqPrice}/day</p>
        					</div>
					</div>
					<div className="product-rate">
						
          				<i className="bx bx-star icon-rate"></i>
						<p> 4.5</p>
          				<span className="rate"></span>
        			</div>
					<ButtonGroup gap={5}>
					<IconButton icon={<EditIcon />} 
					onClick={onOpen} 
					colorScheme="blue"
					size={'sm'}
					/>
					
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteProduct(product._id)}
						colorScheme="red"
						size={'sm'}
					/>
					</ButtonGroup>
				</div>

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
			
		</React.Fragment>
		
		
		// // <Box
		// // 	rounded='lg'
		// // 	overflow='hidden'
		// // 	transition='all 0.3s'
		// // 	_hover={{ transform: "translateY(-10px)", shadow: "xl" }}
		// // 	borderWidth={1}
		// // 	w={250}
			
		// // 	backgroundColor={'grey.100'}
		// // >
		// // 	<Box 
		// // 	p={3}
		// // 	overflow= 'hidden'
		// // 	>
		// // 	<Link to={`/viewSingleItem/${product._id}`}>
		// // 	<Image src={product.eqImage} alt={product.eqName} h={40} w='full' objectFit={'fill'}  rounded= {8}/>
		// // 	</Link>

		// // 	</Box>
			
			
		// // 	<Box p={4} >
		// // 		<Text fontWeight={'bold'} size='20px' mb={2}>
		// // 			{product.eqName}
		// // 		</Text>

		// // 		<Text fontWeight='bold' fontSize='20px' color={textColor} mb={4}>
		// // 			Rs.{product.eqPrice} / day
		// // 		</Text>

		// // 		<HStack spacing={10} justify='center' mt={4}>
		// // 			
					
		// // 			<IconButton
		// // 				icon={<DeleteIcon />}
		// // 				onClick={() => handleDeleteProduct(product._id)}
		// // 				colorScheme='red'
		// // 				w={'full'}
						
		// // 			/>
	
		// // 		</HStack>
		// // 	</Box>
			

		// 	
			
		// //</Box>
		
		
	);
};
export default ProductCard;
