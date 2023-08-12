import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";

function ResourceCreate() {
  const [pending, setPending] = useState(false);

  const formSchema = Yup.object().shape({
    url: Yup.string()
      .required("* Url is required !")
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "* Field should be valid url"
      ),
    topic: Yup.string().required("* Topic is required !"),
    type: Yup.string().required("* Topic is required !"),
    level: Yup.string().required("Level is required"),
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

  const postData = async (data) => {
    if (pending) return;
    setPending(true);
    try {
      await privateAxios.post("/admin/resource", data);
      toast.success(`Resource created successfully`, {
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
      <div>
        <div className="main-card mb-3 card">
          <div className="card-body">
            <div className="w-100 d-flex justify-content-between mb-3">
              <h5 className="card-title">New Resource</h5>
              <Link to={"/resources"} className="btn btn-primary mr-5">
                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                back
              </Link>
            </div>
            <form className="w-100" onSubmit={handleSubmit(postData)}>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="topic" className="">
                      Topic
                    </label>
                    <input
                      name="topic"
                      id="topic"
                      placeholder="topic"
                      type="text"
                      className="form-control"
                      {...register("topic")}
                    />
                  </div>
                  <span className="error-message">{errors.topic?.message}</span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="level" className="">
                      Level
                    </label>
                    <input
                      name="level"
                      id="level"
                      placeholder="level"
                      type="text"
                      className="form-control"
                      {...register("level")}
                    />
                  </div>
                  <span className="error-message">{errors.level?.message}</span>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="url" className="">
                      URL
                    </label>
                    <input
                      name="url"
                      id="url"
                      placeholder="url"
                      type="text"
                      className="form-control"
                      {...register("url")}
                    />
                  </div>
                  <span className="error-message">{errors.url?.message}</span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="url" className="">
                      Type
                    </label>
                    <select
                      name="type"
                      className="form-control"
                      defaultValue={""}
                      {...register("type")}
                    >
                      <option value={""}>Choose type</option>
                      <option value={"LISTENING"}>LISTENING</option>
                      <option value={"READING"}>READING</option>
                      <option value={"MOVIE"}>MOVIE</option>
                    </select>
                  </div>
                  <span className="error-message">{errors.type?.message}</span>
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
}

export default ResourceCreate;
