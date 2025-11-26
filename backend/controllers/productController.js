
import Product from "../models/productModel.js";

const getImageUrl = (req) => {
  // If a file is uploaded
  if (req.file) return `/uploads/${req.file.filename}`;

  // If client sent an image URL in the request body
  if (req.body.images && req.body.images.length > 0) return req.body.images;

  // Default placeholder image
  return ["https://placehold.co/300x300?text=No+Image"];
};



  export const getProducts = async(req, res)=>{

    
        try {
            // destructure query params from req.query
            const {category, page, limit,sort,search} = req.query

            //empty filter object
            const filter = {}

            //filter logic
            if(category) filter.category = category  //.split(',')      
          
            // search logic
           if(search) filter.title = {$regex:search,$options:'i'}

            //sort logic
             const sortObj = {}
            if(sort) {
                sort.startsWith('-') ? sortObj[sort.slice(1)] = -1 : sortObj[sort] = 1
            }

            //handle pagination
            const currentPage = page || 1
            const productPerPage = limit || 6
            const skipValue = (currentPage-1)*productPerPage

           
            const [data, totalCount, categories] = 
             await Promise.all([Product.find(filter).skip(skipValue).limit(productPerPage).sort(sortObj),
                Product.countDocuments(filter), 
                Product.distinct('category')])

                res.json({totalCount:totalCount,
                          products:data,
                          allCategories:categories
                        })
            
        } catch (error) {
            res.json(error.message)
        }

        
}
   

export const createProduct = async (req, res) => {
  const {title,category,description,price,rating,images} = req.body;
  try {
    
    const ProductData = new Product({
           title,
           category,
           description,
           price,
           rating,

         
          //images: req.file ? [`/uploads/${req.file.filename}`] : [], 

          images: getImageUrl(req),

        })

    await ProductData.save()
    res.json({message:"product Uploaded",product:ProductData})
    

  } catch (error) {
    
      res.status(500).json({ message: "Error from createProduct", error: error.message });
    
  }
};

