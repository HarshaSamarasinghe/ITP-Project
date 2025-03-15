import { Box, Button, Container, Heading, Image, VStack, Text, useToast, HStack } from '@chakra-ui/react';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductStore } from '../store/rentingItems';


const ViewSingleItem = () => {
    const { id } = useParams();
    const product = useProductStore((state) => 
        state.products.find((prod) => prod._id === id)
    ); 

    const isAvailable = product.eqAvailability === 'In Stock';

    return (
        <Container maxW='container.xl' py={12}>
            <HStack spacing={10} align='start'>
                <Box shadow={'lg'} rounded={'lg'}>
                <Image src={product.eqImage} alt={product.eqName} boxSize='400px' objectFit='cover' rounded={'lg'}/>
                </Box>
                
                
                <VStack align='start' spacing={4} flex={1} shadow={'lg'} rounded={'lg'} p={8} maxHeight={'fit-content'}>
                <Heading>{product.eqName}</Heading>
                    <Text fontSize='2xl' fontWeight='bold' >
                        $ {product.eqPrice} / day
                    </Text>
                   
                   <Text fontWeight={'bold'}>
                        Availability : <Text as='span' color={product.eqAvailability === 'In Stock' ? 'green.500' : 'red.500'}>{product.eqAvailability}</Text>
                    </Text>
                
                    <Text fontWeight={'light'}>{product.eqDescription}</Text>
                

                   <HStack spacing={40}>
                        <VStack>
                       
                    <Button 
                                as={Link} 
                                to={isAvailable ? `/checkout/${product._id}` : '#'} 
                                colorScheme='green' 
                                size='lg' 
                                isDisabled={!isAvailable}
                            >
                                Proceed to Pay
                            </Button>
                        </VStack>

                        <VStack spacing={4} w='full'>
                            <Button colorScheme='red' as={Link} to='/'>Cancel</Button>
                   </VStack>
                   </HStack>
                  
                    
                    
                </VStack>
            </HStack>
        </Container>
       
    );
};

export default ViewSingleItem;



