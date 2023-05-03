const Product = require('../models/productModel')
const APIFeatures = require('../utils/apiFeature');

// Get Product - /api/v1/product

exports.getProducts= async(req,res,next)=>{
    try{
     
        let apiFeatures = new APIFeatures(Product.find(),req.query).search(); 
        const products = await apiFeatures.query;
        res.status(200).json({
            succcess:true,
            count:products.length,
           products
        })
    }catch(err){
        console.log(`something has failed ${err}`)
    }
}

//Create Product - /api/v1/product/new
exports.newProduct =async(req,res,next)=>{
    try{
        const product= await Product.create(req.body);
        res.status(201).json({
         success:true,
         product
        })
    }catch(err){
       
        let message = Object.values(err.errors).map(val =>val.message)
        res.status(201).json({
            success:true,
            message
        })
    }
}

// Get Single Product -/api/v1/product/:id -Get
exports.getSingleProduct = async(req,res,next)=>{
  try{
      const product = await Product.findById(req.params.id);
      res.status(201).json({
        success:true,
        product
    })

  }catch(err){
    res.status(404).json({
        success:false,
        message:"product not found"
    });
  }      
}

// Update Product -/api/v1/product/:id - PUT
exports.updateProduct = async (req,res,next)=>{
try{

    let product = await Product.findById(req.params.id);
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        product
    })

}catch{
    res.status(404).json({
           success:true,
           message:"product not found"
       })
}
}

//  Delete Product  - /api/v1/product/:id - DELETE
exports.deleteProduct = async (req,res,next)=>{
    try{

        let product = await Product.findById(req.params.id);
       const deleted= await product.deleteOne()
            
    
        res.status(200).json({
            success:true,
           message:"product deleted"
        })
    
    }catch{
        res.status(404).json({
               success:false,
               message:"product not found"
           })
    }
}

// search and Paginate   -  /api/v1/getproduct/ - GET
exports.searchAndPaginateProducts = async (req, res,next) => {
  
 const category = req.query.category;
  const keyword = req.query.keyword;
  const price= parseInt(req.query.price) 
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10;

  const search =  keyword ? {
    name: { $regex: keyword, $options: 'i' }
  }:{};
   
  const sort =  category ? {
    category:{$regex:category, $options:'i' }
  }:{};

  const filterByPrice=   price ? {
    price:{$lte:price}
  }:{};

  const filter = {
    ...search,
    ...sort,
    ...filterByPrice
  }

  try {
   
    const products = await Product.find({
      $or: [
        filter
      ]
    })
      .skip((page-1)*limit)
      .limit(limit);

    const totalCount = await Product.countDocuments({
      $or: [
        filter
      
      ]
    });
    
    const totalPages = Math.ceil(totalCount / limit);

   
    res.status(200).json({
      products,
      page,
      limit,
      totalCount,
      totalPages,
    });
  } catch (err) {
    console.error('Failed to search and paginate products:', err);
    res.status(500).json({ error: 'Failed to search and paginate products' });
  }
};