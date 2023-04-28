import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from "slugify";


//create product
export const createProductController= async(req,res)=>{
try{
        const {name,description,price,category,quantity,shipping} = req.fields;      //req.fields from formidable used as middleware 
        const {photo} = req.files;                                                          //req.files from formidable 
        //validation 
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})
            case !price:
                return res.status(500).send({error:'price is required'})
            case !category:
                return res.status(500).send({error:'category is required'})
            case !quantity:
                return res.status(500).send({error:'quantity is required'})
            case photo && photo.size>1000000:
                return res.status(500).send({error:'Photo is required and should  be less than 1mb'})
            }
        const products=new productModel({...req.fields, slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
        }
        await products.save();
        res.status(201).send({success:true,message:'Product created Successfully',products})
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while creating product',
            error:error.message
        })
    }
}


//get all products- without photo
export const getProductController= async(req,res)=>{
try{
        const products= await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1}).populate('category')
        res.status(200).send({success:true,message:'All Products ',totalCount:products.length,products,})
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while finding product',
            error:error.message
        })
    }
}


//get product photo :
export const productPhotoController= async(req,res)=>{
try{
        const product= await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }        
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting product Photo',
            error:error.message
        })
    }
}



//get singleProduct without photo
export const getProductByIdController= async(req,res)=>{
try{
        const product= await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
        res.status(200).send({success:true,message:'One Product Fetched ',product})
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while fetching single product',
            error:error.message
        })
    }
}


//delete single product 
export const deleteProductController= async(req,res)=>{
try{
        await productModel.findByIdAndDelete(req.params.pid)
        res.status(200).send({success:true,message:'Product deleted Successfully'})
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting product',
            error:error.message
        })
    }
}



//update product route
export const updateProductController= async(req,res)=>{
try{
        const {name,description,price,category,quantity,shipping} = req.fields;      //req.fields from formidable used as middleware 
        const {photo} = req.files;                                                          //req.files from formidable 
        //validation 
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})
            case !price:
                return res.status(500).send({error:'price is required'})
            case !category:
                return res.status(500).send({error:'category is required'})
            case !quantity:
                return res.status(500).send({error:'quantity is required'})
            case photo && photo.size>1000000:
                return res.status(500).send({error:'Photo is required and should  be less than 1mb'})
            }
        const products= await productModel.findByIdAndUpdate(req.params.pid,
                         {...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
        }
        await products.save();
        res.status(201).send({success:true,message:'Product updated Successfully',products})
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while updating product',
            error:error.message
        })
    }
}



//product Filter Controller
export const productFilterController=async(req,res)=>{
    try{
        //get radio and category checked array values to filter based on that:
        const {radio,checked}= req.body;
        let args={}
        if(checked.length>0) args.category=checked;     //fullfill it in args if category has values
        if(radio.length) args.price={$gte:radio[0] , $lte:radio[1]};
        
        const products=await productModel.find(args);
        res.status(200).send({success:true,totalCount:products.length,products})
    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while filtering product',
            error:error.message
        })
    }
}



// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};



// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};