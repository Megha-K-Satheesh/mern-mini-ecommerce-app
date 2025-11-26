
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ProductContext } from "../contextAPI/productContext";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// File input component
const FileInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    helpers.setValue(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">{label}</label>
      <input
        type="file"
        name={props.name}
        onChange={handleChange}
        className="mt-1 border border-gray-300 rounded p-2 text-sm"
      />
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-2 w-24 h-24 object-cover rounded border"
        />
      )}
      {meta.touched && meta.error && (
        <div className="text-red-600 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

// Validation Schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  rating: Yup.number()
    .typeError("Rating must be a number")
    .min(0, "Rating must be at least 0")
    .max(5, "Rating cannot exceed 5")
    .required("Rating is required"),
  images: Yup.mixed().required("Image is required"),
});

function AddProducts() {
  const { addProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    await addProducts(values);
    resetForm();
    navigate("/");
    console.log(values);
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg sm:mt-35">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>
      <Formik
        initialValues={{
          title: "",
          category: "",
          description: "",
          price: "",
          rating: "",
          images: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (

          <Form className="space-y-4">
            {/* Title */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Title</label>
              <Field
                type="text"
                name="title"
                placeholder="Enter product title"
                className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Category</label>
              <Field
                as="select"
                name="category"
                className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="grocery">Grocery</option>
                <option value="fashion">Fashion</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Description</label>
              <Field
                type="text"
                name="description"
                placeholder="Enter product description"
                className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Price</label>
              <Field
                type="number"
                name="price"
                placeholder="Enter product price"
                className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Rating */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Rating</label>
              <Field
                type="number"
                name="rating"
                placeholder="Enter product rating"
                className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="rating"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Image Upload */}
            <FileInput label="Image" name="images" />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddProducts;
