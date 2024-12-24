const Customer = require('../model/CustomerSchema');


const saveCustomer = async(req,resp)=>{  //admin
    try{
        const createdCustomer = new Customer (req,resp);
        const savedCustomer = await createdCustomer.save();
        resp.status(201).json({message:"Customer saved",data:savedCustomer});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}
const updateCustomer = async(req,resp)=>{
    try{
        const updatedCustomer = await Customer.findByIdAndUpdate(
           req.params.id,  //get id 
           req.body,{  //request body
              new:true,
           }
        );
        if(updatedCustomer){
            return resp.status(201).json({message:"Customer Updated",data:updatedCustomer});
        }
        resp.status(500).json({message:"Customer not found"});
    }catch(e){
        resp.status(500).json({error:e.message});
    }   
}

const deleteCustomer = async(req,resp)=>{
    try{
        const deletedCustomer = await Customer.findByIdAndDelete(
           req.params.id);
        if(deletedCustomer){
            return resp.status(201).json({message:"Customer Deleted",data:deletedCustomer});
        }
        resp.status(500).json({message:"Customer not found"});
    }catch(e){
        resp.status(500).json({error:e.message});
    }   
}

const findCustomer = async(req,resp)=>{
    try{
        const selectedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if(selectedCustomer){
            return resp.status(201).json({message:"Customer Found",data:selectedCustomer});
        }
        resp.status(500).json({message:"Customer not found"});
    }catch(e){
        resp.status(500).json({error:e.message});
    }    
}

const loadAllCustomer = async(req,resp)=>{
    try{
        const {searchText, page=1, size=10}=req.query;
        const filter = searchText?{$or:[
            {customerName:{$regex:searchText,$option:"i"}},
            {address:{$regex:searchText,$option:"i"}},
            {email:{$regex:searchText,$option:"i"}}
        ]}:{};
        const customerList =  await Customer.find(filter).skip((page-1)*size).limit(parseInt(size));
        const total =  await Customer.countDocuments(filter);
        resp.status(200).json({message:"data list",data:{dataList:customerList,count:total}});

    }catch(e){
        resp.status(500).json({error:e.message});
    }   
}

module.exports={
    saveCustomer,updateCustomer,deleteCustomer,findCustomer,loadAllCustomer
     
};