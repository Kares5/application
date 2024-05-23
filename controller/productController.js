import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs'
import categoryModel from "../models/categoryModel.js";
import orderModel from '../models/orderModel.js'
import dotenv from "dotenv";

dotenv.config();

export const createProductController  = async(req, res) => {
    try {
        const {name , description , price , category } = req.fields
        const {photo} = req.files
        switch (true) {
            case !name :
            res.status(500).send({error : "Name is required"});
            case !description :
            res.status(500).send({error : "Description is required"});
            case !price : 
            res.status(500).send({error : "Price is required"});
            case !category :
            res.status(500).send({error : "Category is required"});
            case photo && photo.size > 1000000 :
                res.status(500).send({error : "Photo is required and should be less than 1mb"})
        }
        const products = new productModel({...req.fields , slug : slugify(name)})
        if(photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({success : true , message : 'product created successfully', products});

    } catch (error) {
        console.log(error);
        res.status(500).send({success : false , error , message : 'Erorr in creating Product'});
        
    }
}
// get all 
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({createdAt: -1})
        res.status(200).send({success: true, message : "Get Products Success" , products , countTotal : products.length})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({success : false , error , message : 'Erorr in getting  Products'});
        
    }
}
// get single
export const getSingleProductController =async (req, res) => {
    try {
        const product = await productModel.findOne({slug : req.params.slug}).select('-photo').populate('category')
        res.status(200).send({success: true, message : "Get single Product Success" , product})
    } catch (error) {
        console.log(error);
        res.status(500).send({success : false , error , message : 'Erorr in getting  Product'});
    }

}
// get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if (product.photo.data) {
            res.set('Content-Type' , product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({success : false , error , message : 'Erorr in getting photo Product'});
    }
}
// update
export const updateProductController = async (req, res) => {
    try {
        const {name , description , price , category } = req.fields
        const {photo} = req.files
        switch (true) {
            case !name :
            res.status(500).send({error : "Name is required"});
            case !description :
            res.status(500).send({error : "Description is required"});
            case !price : 
            res.status(500).send({error : "Price is required"});
            case !category :
            res.status(500).send({error : "Category is required"}); 
            case photo && photo.size > 1000000 :
                res.status(500).send({error : "Photo is required and should be less than 1mb"}) 
        } 
        const products = await productModel.findByIdAndUpdate(req.params.pid , {...req.fields , slug : slugify(name)} , {new : true});
        if(photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({success : true , message : 'product Updated successfully', products});
    } catch (error) {
        console.log(error);
        res.status(500).send({success : false , error , message : 'Erorr in updating  Product'});
    }
}
// delete product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({success : true , message : 'product deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).send({success : false , error , message : 'Erorr in deleting  Product'});  
    }
}

// filter
export const productFilterController = async (req , res) => {
    try {
        const {checked} = req.body
        let args = {}
        // عبيلي الارغس اوبجيكت بالكاتيغوري يلي اليوزر عمل عليها تشيكد
        if(checked.length > 0) args.category = checked
        // عبيلي الارغس اوبجيكت بالبرايس يلي عمل عليها اليوزر راديو
        //  array : [20 , 39]  
        // الراديو عند الاندكس صفر يعني قيمة العشرين
        // الراديو عند الاندكس واحد يعني قيمة 39
        const products = await productModel.find(args)
        res.status(200).send({success : true , products})    
    } catch (error) {
        console.log(error);
        res.status(400).send({success : false , error , message : 'Erorr in filter Product'});  
    }
}
// count 
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({success : true , total})    
    } catch (error) {
        console.log(error);
        res.status(400).send({success : false , error , message : 'Erorr in count Product'}); 
        
    }
}

// product List based on page
export const productListController = async (req , res) => {
    try {
        const perPage = 5
        // اذا رقم البيج موجود بالرابط اعرضلي هاد الرقم اذا مو موجود الرقم  اعرضلي الصفحة الاولى
        const page = req.params.page ? req.params.page : 1
        // البيج مارح تكون واحد تحت لانو عطيت الشرط انو تكون واحد 
        const products = await productModel.find({}).select
        ('-photo').skip( (page - 1) * perPage ).limit( perPage).sort({createdAt: -1})
        res.status(200).send({success : true , products}) 
        // اذا البيج كانت تلاتة 
        // .skip( (page - 1) * perPage ) 
        // .skip( (3 - 1) * 6 )  
        // .skip( 12 )  
        // بالصفحة التالتة رح ينعمل السكب لتنعش منتج
    } catch (error) {
        console.log(error);
        res.status(400).send({success : false , error , message : 'Erorr in page Product'}); 
        
    }
}


// similar product
export const relatedProductController = async (req ,res) => {
    try {
        const {pid , cid} = req.params
         // يعني  جبلي كل الايديهات تبع المنتج يلي واقفة عليه من نفس كاتيغوري ولكن  الايدي تبعو نوت انكلود البرودكت ايدي يلي فاتحة عليه 
        const products = await productModel.find({category : cid , _id : {$ne : pid}}).select('-photo').limit(3).populate('category')
        res.status(200).send({success : true , products})      
    } catch (error) {
        console.log(error);
        res.status(400).send({success : false , error , message : 'Erorr in related Product'});       
    }
}

// get products in category
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({slug : req.params.slug})
        // من الفيلد يلي اسمو كاتيغوري الموجود بالبرودكت جبلي كل شي معلومات بخص الكاتيغوري موبس الايدي كمان النيم والسلغ
        const products = await productModel.find({category}).populate('category')
        res.status(200).send({success : true , products , category}) 
        
    } catch (error) {
        console.log(error);
        res.status(400).send({success : false , error , message : 'Erorr in getting  Product in category'});  
    }
}

// create order 
export const createOrderController = async(req , res) => {
    try {        
        const {cart} = req.body
        const order = new orderModel({
            products : cart,
            buyer : req.user._id
        }).save()
        res.json({ok: true})
    } catch (error) {
        console.log(error);
    }
}
