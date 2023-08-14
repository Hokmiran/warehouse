import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddUser = () => {

    const formSchema = Yup.object().shape({
        email: Yup.string().required("* Email is required!"),
        password: Yup.string()
            .required("* Password is required!")
            .min(8, "Password must be at least 8 characters"),
        name: Yup.string().required("* Name is required!"),
        role: Yup.string().required("* Role is required!"),
        phone: Yup.string().required("* Rhone is required!").default("+994"), // Assuming the default value is valid
        bio: Yup.string().max(50, "Bio must not exceed 50 characters"),
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

    const nav = useNavigate();
    const [pending, setPending] = useState(false);

    const postData = async (data) => {
        if (pending) return;
        setPending(true);
        try {
            await privateAxios.post("/users/register", data);
            toast.success(`User created successfully`, {
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
                            <h5 className="card-title">Add New User</h5>
                            <button onClick={() => nav(-1)} className="btn btn-primary mr-5">
                                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                                Back
                            </button>
                        </div>
                        <form className="w-100" onSubmit={handleSubmit(postData)}>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="name">User Full Name</label>
                                        <input
                                            name="name"
                                            id="name"
                                            placeholder="Full Name"
                                            type="text"
                                            className="form-control"
                                            {...register("name")}
                                        />
                                        <span className="error-message">
                                            {errors.name?.message}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            name="email"
                                            id="email"
                                            placeholder="Email"
                                            type="text"
                                            className="form-control"
                                            {...register("email")}
                                        />
                                        <span className="error-message">
                                            {errors.email?.message}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="price">Role</label>
                                        <input
                                            name="role"
                                            id="role"
                                            placeholder="Role"
                                            type="text"
                                            className="form-control"
                                            {...register("role")}
                                        />
                                        <span className="error-message">
                                            {errors.role?.message}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="quantity">Phone</label>
                                        <input
                                            name="phone"
                                            id="phone"
                                            placeholder="Phone"
                                            type="text"
                                            className="form-control"
                                            {...register("phone")}
                                        />
                                        <span className="error-message">
                                            {errors.phone?.message}
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
                                        <label htmlFor="bio">User bio</label>
                                        <textarea
                                            className="form-control"
                                            id="bio"
                                            {...register("bio")}
                                        ></textarea>
                                        <span className="error-message">
                                            {errors.bio?.message}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="quantity">Password</label>
                                        <input
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            type="password"
                                            className="form-control"
                                            {...register("password")}
                                        />
                                        <span className="error-message">
                                            {errors.password?.message}
                                        </span>
                                    </div>
                                </div>
                                {/* Add image upload field */}
                                <div className="col-md-12">
                                    <div className="position-relative form-group">
                                        <label htmlFor="image">User Image</label>
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

export default AddUser;
