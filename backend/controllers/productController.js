
import Product from "../models/productModel.js";

export const getProducts = async(req,res)=>{

    try {
      const products = await Product.find();
      return res.status(200).json(products);
      
    } catch (error) {
       res.status(500).json({error:error.message})
    }

}



export const createProduct = async (req, res) => {
  const {title,category,description,price,rating,images} = req.body;
  try {
    console.log('from createproduct',req.body)
   
    const ProductData = new Product({
           title,
           category,
           description,
           price,
           rating,
//images: [`/uploads/${req.file.filename}`] 
         
          images: req.file ? [`/uploads/${req.file.filename}`] : [], 
        })

    await ProductData.save()
    res.json({message:"product Uploaded",product:ProductData})
    

  } catch (error) {
    //res.send("eroor from createproduct",error)
      res.status(500).json({ message: "Error from createProduct", error: error.message });
    console.log(res.send)
  }
};
