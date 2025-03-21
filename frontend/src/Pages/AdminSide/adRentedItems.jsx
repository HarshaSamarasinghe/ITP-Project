
import { Container, Text, VStack, Table, Thead, Tbody, Tr, Th, Td, Image, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useOrderDetails } from "../../store/rentingOrderDetails.js";
import { IconButton } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

const adRentedItems = () => {
    const { fetchOrders, orders, updateReturnStatus } = useOrderDetails();
    const [updatedReturnStatus, setUpdatedReturnStatus] = useState({
        returnStatus: "Fine",
        fineValue: 0
    });
    const [selectedOrder, setSelectedOrder] = useState(null); // To store the selected order
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const calculateFineValue = (rentTo, returnDate) => {
        const lateDays = Math.max(
            0,
            Math.ceil((new Date(returnDate) - new Date(rentTo)) / (1000 * 60 * 60 * 24))
        );
        return lateDays * 100; // Fine is 100 per late day
    };

    const handleOpenModal = (order) => {
        setSelectedOrder(order); // Store the selected order
        const fineValue = calculateFineValue(order?.rentTo, order?.returnDate); // Calculate fine dynamically
        setUpdatedReturnStatus({
            
           fineValue: fineValue,
        returnStatus: fineValue === 0 ? "Successful" : "Fine"
        });
        onOpen();
    };

    const handleUpdateReturnStatus = async (pid, updatedReturnStatus) => {
        const { success, message } = await updateReturnStatus(pid, updatedReturnStatus);
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
                description: "Return Request Sent successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8}>
                <Text fontSize={30} fontWeight="bold" bgColor={'black'} bgClip="text" textAlign="center">
                    Return Request List
                </Text>

                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Image</Th>
                            <Th>Equipment Name</Th>
                            <Th>Ref Number</Th>
                            <Th>Price Paid</Th>
                            <Th>Return Requested Date</Th>
                            <Th>Rented From</Th>
                            <Th>Rented To</Th>
                            <Th>Return Status</Th>
                            <Th>Fine Value</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {(orders ?? [])
                            .filter((order) => order?.returnStatus === "Pending") // Filter for Pending returns
                            .map((order) => (
                                <Tr key={order?._id}>
                                    <Td fontSize="sm">
                                        <Image
                                            src={order?.eqID?.eqImage || "https://via.placeholder.com/150"}
                                            alt={order?.eqID?.eqName || "Equipment Image"}
                                            boxSize="60px"
                                            objectFit="cover"
                                        />
                                    </Td>
                                    <Td fontSize="sm">{order?.eqID?.eqName || "Equipment Name"}</Td>
                                    <Td fontSize="sm">{order?._id}</Td>
                                    <Td fontSize="sm">Rs.{order?.TotalPrice || "N/A"}</Td>
                                    <Td fontSize="sm">
                                        {new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" })
                                            .format(new Date(order?.returnDate))}
                                    </Td>
                                    <Td fontSize="sm">
                                        {new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" })
                                            .format(new Date(order?.rentFrom))}
                                    </Td>
                                    <Td fontSize="sm">
                                        {new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" })
                                            .format(new Date(order?.rentTo))}
                                    </Td>
                                    <Td fontSize="sm">{order?.returnStatus}</Td>
                                    <Td fontSize="sm">
                                        {calculateFineValue(order?.rentTo, order?.returnDate)}
                                    </Td>

                                    <Td fontSize="sm">
                                        <IconButton
                                            onClick={() => handleOpenModal(order)}  // Pass order to open the modal
                                            fontSize="20px"
                                            icon={<InfoIcon />}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Make Return Request</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input hidden readOnly value={updatedReturnStatus.returnStatus} />
                            <Input hidden readOnly value={updatedReturnStatus.fineValue} />
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                colorScheme='blue' 
                                mr={3} 
                                onClick={() => handleUpdateReturnStatus(selectedOrder?._id, updatedReturnStatus)} 
                            >
                                Update
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </VStack>
        </Container>
    );
};

export default adRentedItems;
