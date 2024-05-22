import { response } from "express";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req , res) => {
    try {
        // get data from user
        const {name} = req.body
        if(!name) {
            return res.status(401).send({message : 'name required'})
        }
        // check if category exists already in database
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory) {
            return res.status(200).send({ success :true ,message : 'category already exists '})
        }
        const category = await new categoryModel({name , slug :slugify(name)}).save()
        res.status(201).send({ success :true ,message : 'New category created successfully' , category})
    } catch (error) {
        console.log(error);
        res.status(500).send({success : false , error , message : 'Error creating category'})
    }
}
// Uodate category
export const updateCategoryController = async (req,res) => {
    try {
        // get data from user and id from params
        const {name} = req.body
        const {id} = req.params
        // updata data in database
        const category = await categoryModel.findByIdAndUpdate(id , {name , slug : slugify(name)} , {new : true})
        res.status(200).send({ success :true ,message : ' category Updated successfully' , category})
    } catch (error) {
        console.log(error)
        res.status(500).send({success : false , error , message : 'Error creating category'})
        
    }
}

// get all categories
export const getCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({ success :true ,message : ' All Category List' , category})
    } catch (error) {
        console.log(error)
        res.status(500).send({success : false , error , message : 'Error in getting category'}) 
    }
}


// delete category
export const deleteCategoryController =async (req, res) => {
    try {
         // get data from params
         const {id} = req.params
         await categoryModel.findOneAndDelete(id)
        res.status(200).send({ success :true ,message : ' delete category successfully'})     
    } catch (error) {
        console.log(error)
        res.status(500).send({success : false , error , message : 'Error in deletin  category'})
    }
}
