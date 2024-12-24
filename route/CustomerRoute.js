const express =  require('express');
const router = express.Router();
const CustomerController = require('../controller/CustomerController');

router.post('/create', CustomerController.saveCustomer);
router.put('/update', CustomerController.updateCustomer);
router.delete('/delete', CustomerController.deleteCustomer);
router.get('/find', CustomerController.findCustomer);
router.get('/find-all', CustomerController.loadAllCustomer);


module.exports=router;