import { Button, ButtonGroup } from '@chakra-ui/react'
import React from 'react';
import { Link } from "react-router-dom";

const UserSide = () => {
  return (
    <div>
        <ButtonGroup>
        <Button as={Link} to={"/rentingStore"}>Renting Store</Button>
        <Button as={Link} to={"/viewMyOrders"}>View My Orders</Button>
        </ButtonGroup>
    </div>
  )
}

export default UserSide