const Product = require('../model/ProductSchema');

const saveProduct = async (req,resp)=>{ // admin, manager
    try{
        const createdProduct = new Product(req.body);
        const savedProduct = await createdProduct.save();
        resp.status(201).json({message:"Product saved",data:savedProduct});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}
const updateProduct = async (req,resp)=>{// admin
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
            }
        );
        if(updatedProduct){
            return resp.status(201).
            json({message:"product updated",data:updatedProduct});
        }
        resp.status(404).json({message:"product not found!"});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}
const deleteProduct = async (req,resp)=>{// admin
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(deletedProduct){
            return resp.status(200).json({message:"product deleted",data:deletedProduct});
        }
        resp.status(404).json({message:"product not found!"});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}
const findProduct = async (req,resp)=>{// admin, manager, user
    try{
        const selectedProduct = await Product.findById(req.params.id);
        if(selectedProduct){
            return resp.status(200).json({message:"product found!",data:selectedProduct});
        }
        resp.status(404).json({message:"product not found!"});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}
const loadAllProducts = async (req,resp)=>{// admin, manager, user
    try{
        const {searchText, page=1, size=10}= req.query;
        const filter= searchText?{$or:[
            {productName:{$regex:searchText, $options:"i"}},
            {description:{$regex:searchText, $options:"i"}}
        ]}:{};
        const productList = await Product.find(filter).skip((page-1)* size).limit(parseInt(size));
        const total = await Product.countDocuments(filter);
        resp.status(200).json({message:"data list",data:{dataList:productList,count:total}})
    }catch(e){
        resp.status(500).json({error:e.message})
    }
}
const findLowStockProducts = async (req,resp)=>{ // admin, manager
    try{
       const dataList = await Product.findLowStockProducts();
        resp.status(201).json({message:"lower qty list",data:dataList});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}

module.exports={
    saveProduct,updateProduct,deleteProduct,
    findProduct,loadAllProducts,findLowStockProducts
};