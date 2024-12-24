const express =  require('express');
const bodyparser =  require('body-parser');
const mongoose =  require('mongoose');

require('dotenv').config();

// ===============
const CustomerRoute = require('./route/CustomerRoute');
const UserRoute = require('./route/UserRoute');
const ProductRoute = require('./route/ProductRoute');
const PaymentRoute = require('./route/PaymentRoute');
const OrderRoute = require('./route/OrderRoute');

// ===============

const app = express();

// Middleware
app.use(bodyparser.json());


const PORT = process.env.PORT | 3000;

mongoose.connect('mongodb://127.0.0.1:27017/pos_db').then(()=>{
    console.log('DB Connected');
}).catch(e=>{
    console.log(e);
});

app.use('api/v1/customers',CustomerRoute);
app.use('api/v1/orders',OrderRoute);
app.use('api/v1/users',UserRoute);
app.use('api/v1/payments',PaymentRoute);
app.use('api/v1/products',ProductRoute);

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})