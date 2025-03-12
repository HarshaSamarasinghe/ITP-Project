
import { Box, Button, Container, Heading, Input, Select, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        eqName: "",
        eqDescription: "",
        eqPrice: "",
        eqImage: "",
        eqAvailability: "",
    });
    const toast = useToast();

    const handleAddProduct = async () => {
        try {
            const response = await axios.post("/api/rentingItems",newProduct) //  actual API endpoint
            toast({
                title: "Success",
                description: response.data.message,
                status: "success",
                isClosable: true,
            });
            setNewProduct({ eqName: "", eqPrice: "", eqImage: "", eqAvailability: "", eqDescription: "" });
        } catch (error) {
            toast({
                title: "Error",
                description: error.response ? error.response.data.message : "An error occurred",
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Add New Renting Items
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            name="eqName"
                            value={newProduct.eqName}
                            onChange={(e) => setNewProduct({ ...newProduct, eqName: e.target.value })}
                        />
                        <Input
                            placeholder="Description"
                            name="eqDescription"
                            value={newProduct.eqDescription}
                            onChange={(e) => setNewProduct({ ...newProduct, eqDescription: e.target.value })}
                        />
                        <Input
                            placeholder="Price"
                            name="eqPrice"
                            type="number"
                            value={newProduct.eqPrice}
                            onChange={(e) => setNewProduct({ ...newProduct, eqPrice: e.target.value })}
                        />
                        <Input
                            placeholder="Image URL"
                            name="eqImage"
                            value={newProduct.eqImage}
                            onChange={(e) => setNewProduct({ ...newProduct, eqImage: e.target.value })}
                        />
                        <Select
                            placeholder="Select Availability"
                            name="eqAvailability"
                            value={newProduct.eqAvailability}
                            onChange={(e) => setNewProduct({ ...newProduct, eqAvailability: e.target.value })}
                        >
                            <option value="In Stock">In Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </Select>
                        

                        <Button colorScheme="blue" onClick={handleAddProduct} w="full">
                            Add Equipment
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;

