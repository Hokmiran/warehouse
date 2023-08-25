import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateDepartmment = () => {

  const formSchema = Yup.object().shape({
    name: Yup.string().required("* Department name is required!"),
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
      let jsonData = {
        name: data.name
      }
      await privateAxios.post("/departments", jsonData);
      toast.success(`Department created successfully`, {
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

  return (
    <Layout>
      <ToastContainer />
      <div>
        <div className="main-card mb-3 card">
          <div className="card-body">
            <div className="w-100 d-flex justify-content-between mb-3">
              <h5 className="card-title">New Department</h5>
              <button onClick={() => nav(-1)} className="btn btn-primary mr-5">
                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                Back
              </button>
            </div>
            <form className="w-100" onSubmit={handleSubmit(postData)}>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="name">Department Name</label>
                    <input
                      name="name"
                      id="name"
                      placeholder="Department Name"
                      type="text"
                      className="form-control"
                      {...register("name")}
                    />
                    <span className="error-message">
                      {errors.name?.message}
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

export default CreateDepartmment;
