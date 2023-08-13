import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const ProductCreate = () => {

  const formSchema = Yup.object().shape({
    productName: Yup.string().required("* Product name is required!"),
    category: Yup.string().required("* Category is required!"),
    price: Yup.number().required("* Price is required!"),
    quantity: Yup.number().required("* Quantity is required!"),
    description: Yup.string().required("* Description is required!"),
    // image: Yup.mixed().required("* Image is required!")
    // .test(
    //   "fileType",
    //   "* Supported file formats: jpg, jpeg, png, gif",
    //   (value) => {
    //     if (!value) return false;

    //     const supportedFormats = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    //     return supportedFormats.includes(value.type);
    //   }
    // ),
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

  const [pending, setPending] = useState(false);

  const postData = async (data) => {
    if (pending) return;
    setPending(true);
    try {
      await privateAxios.post("/products/create", data);
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

  // const [image, setProductImage] = useState("");
  // const [imagePreview, setImagePreview] = useState(null);

  // const handleImageChange = (e) => {
  //   setProductImage(e.target.files[0]);
  //   setImagePreview(URL.createObjectURL(e.target.files[0]));
  // };

  return (
    <Layout>
      <div>
        <div className="main-card mb-3 card">
          <div className="card-body">
            <div className="w-100 d-flex justify-content-between mb-3">
              <h5 className="card-title">New Product</h5>
              <Link to={"/products"} className="btn btn-primary mr-5">
                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                back
              </Link>
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
                    <input
                      name="category"
                      id="category"
                      placeholder="Category"
                      type="text"
                      className="form-control"
                      {...register("category")}
                    />
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
                      // onChange={(e) => handleImageChange(e)}
                      {...register("image")}
                    />
                    {/* {imagePreview != null ? (
                      <div className="image-preview">
                        <img src={imagePreview} alt="product" />
                      </div>
                    ) : (
                      <p>No image set for this poduct.</p>
                    )} */}
                    <span className="error-message">
                      {errors.image?.message}
                    </span>
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
