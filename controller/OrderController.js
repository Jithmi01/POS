const Order = require('../model/OrderSchema');

const saveOrder = async (req,resp)=>{ // admin, manager
    try{
        const createdOrder = new Order(req.body);
        const savedOrder = await createdOrder.save();
        resp.status(201).json({message:"Order saved",data:savedOrder});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}
const updateOrder = async (req,resp)=>{ // admin
    try{
        const updatedOrder = await Order.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new:true,
                    }
                );
                if(updatedOrder){
                    return resp.status(201).json({message:"order updated",data:updatedOrder});
                }
                resp.status(404).json({message:"Order not found!"});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}
const updateOrderStatus = async (req,resp)=>{ // admin
    try{
        const {id} = req.params;
        const {status}= req.body;

        if(!["PENDING","REJECTED","COMPLETED","CANCELLED"].includes(status)){
            return resp.status(400).json({message:"invalid status",data:null});
        }

        const updatedOrder = await Order.findByIdAndUpdate(
                    id,{status},{new:true,}
                );
                if(updatedOrder){
                    return resp.status(201).json({message:"order updated",data:updatedOrder});
                }
                resp.status(404).json({message:"Order not found!"});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}
const deleteOrder = async (req,resp)=>{// admin
    try{
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if(deletedOrder){
            return resp.status(200).json({message:"Order deleted",data:deletedOrder});
        }
        resp.status(404).json({message:"Order not found!"});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}
const findOrder = async (req,resp)=>{// admin, manager
    try{
        const selectedOrder = await Order.findById(req.params.id);
        if(selectedOrder){
            return resp.status(200).json({message:"Order found!",data:selectedOrder});
        }
        resp.status(404).json({message:"Order not found!"});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}
const loadAllOrders = async (req,resp)=>{// admin, manager
    try{
        const {page=1, size=10}= req.query;
        const orderList = await Order.find().sort({Date:-1}).skip((page-1)* size).limit(parseInt(size));
        const total = await Customer.countDocuments();
        resp.status(200).json({message:"data list",data:{dataList:orderList,count:total}})
    }catch(e){
        resp.status(500).json({error:e.message})
    }
}
module.exports={
    saveOrder,updateOrder,updateOrderStatus,deleteOrder,findOrder,loadAllOrders
};