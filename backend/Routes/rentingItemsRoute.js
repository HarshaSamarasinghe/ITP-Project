import {Router} from 'express';
import { createRentingItem,
    getRentingItem,
    listAllRentingItems,
    updateRentingItem,
    deleteRentingItem } from '../Controllers/rentingItemsController.js';


const rentingItemsRoute = Router();

//create a new renting item
rentingItemsRoute.post('/create', createRentingItem);
//list all renting items
rentingItemsRoute.get('/list', listAllRentingItems);
//get a single renting item
rentingItemsRoute.get('/get/:id', getRentingItem);
//update a renting item
rentingItemsRoute.put('/update/:id', updateRentingItem);
//delete a renting item
rentingItemsRoute.delete('/delete/:id', deleteRentingItem);

export default rentingItemsRoute;
