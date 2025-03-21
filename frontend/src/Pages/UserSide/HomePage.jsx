import { Box,Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/background.jpg";


const HomePage = () => {
  return (
    <Box
      h="100vh"
      w="100vw"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      m={0}
      p={0}
    >
      
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bgImage={`url(${backgroundImage})`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        opacity={"70%"}
      />

     <ButtonGroup className="btnGroup" gap={3}>
      <Button as={Link} to={"/adminSide"}>Admin Side</Button>
      <Button as={Link} to={"/userSide"}>User Side</Button>
      
      
     </ButtonGroup>
      
    </Box>
  );
};

export default HomePage;
