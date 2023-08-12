import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";

function Courses() {
  const getData = async () => {
    try {
      const res = await privateAxios.get(`/admin/website-content/courses`);
      let data = res.data.data;

      reset(data);
    } catch (error) {
      //   nav("/pricing");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [pending, setPending] = useState(false);

  const formSchema = Yup.object().shape({
    COURSES_HEADER_TITLE: Yup.string().required("*Required !"),
    COURSES_HEADER_BODY: Yup.string().required("*Required !"),
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
      await privateAxios.patch(`/admin/website-content`, data);
      toast.success(`Content updated successfully`, {
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
              <h5 className="card-title">Courses page Content</h5>
              <Link to={"/pricing"} className="btn btn-primary mr-5">
                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                back
              </Link>
            </div>

            <form className="w-100" onSubmit={handleSubmit(postData)}>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="COURSES_HEADER_TITLE" className="">
                      COURSES_HEADER_TITLE
                    </label>
                    <textarea
                      name="COURSES_HEADER_TITLE"
                      id="COURSES_HEADER_TITLE"
                      rows={5}
                      placeholder="COURSES_HEADER_TITLE"
                      type="text"
                      className="form-control"
                      {...register("COURSES_HEADER_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.COURSES_HEADER_TITLE?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="COURSES_HEADER_BODY" className="">
                      COURSES_HEADER_BODY
                    </label>
                    <textarea
                      name="COURSES_HEADER_BODY"
                      id="COURSES_HEADER_BODY"
                      rows={5}
                      placeholder="COURSES_HEADER_BODY"
                      type="text"
                      className="form-control"
                      {...register("COURSES_HEADER_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.COURSES_HEADER_BODY?.message}
                  </span>
                </div>
              </div>
              <hr />

              <div className="mt-4 d-flex align-items-center">
                <div className="ml-auto">
                  <button className="btn btn-primary">
                    {pending ? "Updating..." : "Edit"}{" "}
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

export default Courses;
