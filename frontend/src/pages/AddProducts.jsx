


import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ProductContext } from "../contextAPI/productContext";

function AddProducts() {
  const { addProducts } = useContext(ProductContext);
  const navigate = useNavigate();

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
    images: Yup.string()
      .url("Must be a valid URL")
      .required("Image URL is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    await addProducts(values);
    resetForm();
    navigate("/");
    alert("Product created successfully!");
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
          images: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
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

            {/* Image URL */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Image URL</label>
              <Field
                type="text"
                name="images"
                placeholder="Paste image URL here"
                className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-600 text-sm mt-1"
              />

              {/* Live Preview */}
              {values.images && (
                <img
                  src={values.images}
                  alt="preview"
                  className="mt-2 w-24 h-24 object-cover rounded border"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>

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
