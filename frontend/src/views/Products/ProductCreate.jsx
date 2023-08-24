import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {

  const formSchema = Yup.object().shape({
    productName: Yup.string().required("* Product name is required!"),
    category: Yup.string().required("* Category is required!"),
    price: Yup.string().required("* Price is required!"),
    quantity: Yup.number().required("* Quantity is required!"),
    description: Yup.string().required("* Description is required!"),
    // image: Yup.mixed().required("* Image is required!"),

  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const nav = useNavigate();
  const [pending, setPending] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await privateAxios.get("/products/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const postData = async (data) => {
    if (pending) return;
    setPending(true);
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("description", data.description);
      formData.append("image", selectedImage);

      await privateAxios.post("/products/create", formData);
      toast.success(`Product created successfully`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPending(false);
      reset();
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPending(false);
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  useEffect(() => {
  }, [selectedImage]);

  return (
    <Layout>
      <div>
        <div className="main-card mb-3 card">
          <div className="card-body">
            <div className="w-100 d-flex justify-content-between mb-3">
              <h5 className="card-title">New Product</h5>
              <button onClick={() => nav(-1)} className="btn btn-primary mr-5">
                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                Back
              </button>
            </div>
            <form className="w-100" onSubmit={handleSubmit(postData)}>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input
                      name="productName"
                      id="productName"
                      placeholder="Product Name"
                      type="text"
                      className="form-control"
                      {...register("productName")}
                    />
                    <span className="error-message">
                      {errors.productName?.message}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      name="category"
                      id="category"
                      className="form-control"
                      {...register("category")}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <span className="error-message">
                      {errors.category?.message}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      name="price"
                      id="price"
                      placeholder="Price"
                      type="text"
                      className="form-control"
                      {...register("price")}
                    />
                    <span className="error-message">
                      {errors.price?.message}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      name="quantity"
                      id="quantity"
                      placeholder="Quantity"
                      type="text"
                      className="form-control"
                      {...register("quantity")}
                    />
                    <span className="error-message">
                      {errors.quantity?.message}
                    </span>
                  </div>
                </div>
                {/* <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="sku">SKU</label>
                    <textarea
                      className="form-control"
                      id="sku"
                      {...register("sku")}
                    ></textarea>
                    <span className="error-message">
                      {errors.sku?.message}
                    </span>
                  </div>
                </div> */}
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      {...register("description")}
                    ></textarea>
                    <span className="error-message">
                      {errors.description?.message}
                    </span>
                  </div>
                </div>
                {/* Add image upload field */}
                <div className="col-md-12">
                  <div className="position-relative form-group">
                    <label htmlFor="image">Product Image</label>
                    <input
                      name="image"
                      id="image"
                      type="file"
                      className="form-control-file"
                      onChange={(e) => {
                        handleImageChange(e);
                      }}
                    />
                    <span className="error-message">
                      {errors.image?.message}
                    </span>
                    {selectedImage && (
                      <div className="image-preview">
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="product"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 d-flex align-items-center">
                <div className="ml-auto">
                  <button className="btn btn-primary">
                    {pending ? "Creating..." : "Create"}{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductCreate;
