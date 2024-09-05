import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
 export const createCategoryController=async(req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            return res.status(401).send({message:"Name is required"});
        }
        const existingCategory=await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'Category already exists',
            })
        }
        const category=await new categoryModel({name,slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:'new category created',
            category,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in Category",
        })
    }
 };

//update category
export const updateCategoryController=async (req, res)=>{
    try {
        const {name}=req.body
        const {id}=req.params              //we will get id from the url segements from specific positions in the URL 
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});                      // the third parameter (new:true) should be given to update the category page 
        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }
};


//Get all Category
export const categoryController=async (req,res)=>{
    try{
        const category=await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"All categories List ",
            category
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while Getting all categories"
        });
    }
};

//single Category
export const singleCategoryController=async(req,res)=>{
    try {
        const {slug}=req.params;
        const category=await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:"Get single category Successful",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while Getting single categories"
        });
    }
};

//delete category
export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"category deleted Successful",
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while Getting deleting category",
            error,
        });    
    }
};


 /*
 A slug is a user-friendly, URL-safe version of a string, typically used in URLs to represent a resource (such as a blog post, product, or category) in a more readable and SEO-friendly manner. Slugs are often derived from titles or names by converting them to lowercase and replacing spaces and special characters with hyphens.
 slugify('some string') // some-string

 if you prefer something other than '-' as separator
 slugify('some string', '_')  // some_string

 */