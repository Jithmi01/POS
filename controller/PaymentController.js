const Payment = require('../model/PaymentSchema');

const makePayment = async (req,resp)=>{ // admin, manager
    try{
        const createdPayment = new Payment(req.body);
        const savedPayment = await createdPayment.save();
        resp.status(201).json({message:"payment saved",data:savedPayment});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}

const findIncomeToday = async (req,resp)=>{ // admin, manager
    try{
        const {day}= req.query; // YYYY-MM-DD
        const startDay = new Date(day);
        const endDay = new Date(day);

        endDay.setDate(endDay.getDate()+1);
        const data = await Payment.find({
            Date:{
                $gte:startDay,
                $lt:endDay
            }
        });
        const totalIncome  = data.reduce((sum, payment)=>sum+payment.amount,0);
        resp.status(200).json({message:"today\'s income",data:totalIncome});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}

const findIncomeByCurrentMonth = async (req,resp)=>{ // admin, manager
    try{
        const now= new Date();
        const startOfMonth = new Date(now.getFullYear, now.getMonth(),1);
        const endOfMonth = new Date(now.getFullYear, now.getMonth()+1,1);

        const data = await Payment.find({
            Date:{
                $gte:startOfMonth,
                $lt:endOfMonth
            }
        });
        const incomebyDay  = data.reduce((acc, payment)=>{
            const day = payment.Date.toISOString().split("T")[0];// [date,time]
            acc[day] = (acc[day] || 0)+payment.amount;
            return acc;
        },{});
        resp.status(200).json({message:"month income",data:{month:now.getMonth()+1,income:incomebyDay}});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}

module.exports={
    makePayment,findIncomeToday,findIncomeByCurrentMonth
};