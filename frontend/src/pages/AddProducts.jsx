import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/productContext";

const API_BASE_URL = import.meta.env.VITE_API_URL;



const FileInput  = ({label,...props})=>{
     const[field,meta,helpers] = useField(props);
     const [preview,setPreview] = useState(null);

   const  handleChange=(event)=>{
            const file = event.currentTarget.files[0]
   
     helpers.setValue(file)
      
     if(file){
      setPreview(URL.createObjectURL(file));
     }else
      setPreview(null)}
      return(
        <>
          <label>{label}</label>
          <input type="file" name={props.name} onChange={(e)=>handleChange(e)}   className="mt-2 object-cover border rounded"/>
               {preview&&(<img src={preview} alt="img"    className=" w-24 h-24"/>)}
          
        </>
      )
}


function AddProducts (){
          
  const {addProducts} = useContext(ProductContext)
  const navigate  = useNavigate()
      const handleSubmit = async (values)=>{
        await  addProducts(values);
         
           navigate('/')
          console.log(values)
      }
      return(
        <>
        <Formik
         initialValues={{title:'',
                       category:'',
                      description:'',
                      price:null,
                      rating:null,
                       images:null,
                    }}
         onSubmit={handleSubmit}
        >
         <Form>
          <div className="border-b-blue-600">
              <div>
                <label className="">Title</label>
                <Field type='text' name='title'   className="border border-gray-400 p-2 rounded" />
                <ErrorMessage name="title" component="div"/>
              </div>
              <div>
                <label >Category</label>
                <Field as='select' name='category'   className="border border-gray-400 p-2 rounded">

                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="grocery">Grocery</option>
                <option value="fashion">Fashion</option>
               </Field>
               <ErrorMessage name="category"  component='div'/>
              </div>
               <div>
                <label className="" >Discription</label>
                <Field type='text' name='description'    className="border border-gray-400 p-2 rounded"/>
                <ErrorMessage name="title" component="div"/>
              </div>
               <div>
                <label className="" >Price</label>
                <Field type='number' name='price'   className="border border-gray-400 p-2 rounded" />
                <ErrorMessage name="price" component="div"/>
              </div>
               <div>
                <label className="" >Rating</label>
                <Field type='number' name='rating'   className="border border-gray-400 p-2 rounded"/>
                <ErrorMessage name="rating" component="div"/>
              </div>
                <div>
                  <FileInput label="images" name="images"     />
                  <ErrorMessage name="images" component='div'/>
                </div>
          </div>


             
            <button type="submit">Submit</button>
         </Form>

        </Formik>
        
        </>
      )
}
export default AddProducts