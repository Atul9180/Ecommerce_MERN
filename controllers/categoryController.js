import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController= async (req,res)=>{
    try{
        const {name} = req.body;
        if(!name){ return res.status(401).send({message:'Name is required'}) }

        //check if duplicate category
        const existingCategory=await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({success:true,message:'Category already exists'})
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save();
        //here slugified the name so as if space is there convert it to - or _ helpful in seo
        res.status(201).send({success:true,message:'New category created',category})
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in category creation',
            error
        })
    }
};


//@desc get all categories 
export const getAllCategoryController= async (req,res)=>{
    try{
        const category = await categoryModel.find({})
        res.status(200).send({success:true,message:'All Categories List',category})
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while fetching all category',
            error
        })
    }
};



//@desc: fetch single category
export const getSingleCategoryController= async (req,res)=>{
    try{
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({success:true,message:'Category found Successfully',category})
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while fetching category by id',
            error
        })
    }
};




//@desc: updating category
export const updateCategoryController= async (req,res)=>{
    try{
        const {name} = req.body;
        const {id} = req.params;
        if(!name){ return res.status(401).send({message:'Name is required'}) }
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({success:true,message:'Category updated Successfully',category})
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while updating category',
            error
        })
    }
};



//@desc: delete single category
export const deleteCategoryController= async (req,res)=>{
    try{
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({success:true,message:'Category deleted Successfully'})
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting category',
            error
        })
    }
};