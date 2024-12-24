const express =  require('express');
const router = express.Router();
const PaymentController = require('../controller/PaymentController');

router.post('/create', PaymentController.makePayment);
router.get('/income-by-day', PaymentController.findIncomeToday);
router.get('/income-by-month', PaymentController.findIncomeByCurrentMonth);

module.exports=router;