import { Button, ButtonGroup } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom";

const AdminSide = () => {
  return (
    <div>
        <div>
            <ButtonGroup gap={20}>
                <Button as={Link} to={"/createRentingItem"}>Create Equipment</Button>
                <Button as={Link} to={"/rentingOrderList"}>View Order List</Button>
                <Button as={Link} to={"/adRentingStore"}>Renting Store</Button>
            </ButtonGroup>
        </div>
    </div>
  )
}

export default AdminSide;