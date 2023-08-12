import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";

function Home() {
  const [pictures, setPictures] = useState({
    HOME_PAGE_ABOUT_US_IMAGE3: "",
    HOME_PAGE_ABOUT_US_IMAGE1: "",
    HOME_PAGE_HEADER_BACKGROUND: "",
  });

  const getData = async () => {
    try {
      const res = await privateAxios.get(`/admin/website-content/home-page`);
      let data = res.data.data;
      setPictures({
        HOME_PAGE_ABOUT_US_IMAGE3: data.HOME_PAGE_ABOUT_US_IMAGE3 + "?lang=az",
        HOME_PAGE_ABOUT_US_IMAGE1: data.HOME_PAGE_ABOUT_US_IMAGE1 + "?lang=az",
        HOME_PAGE_HEADER_BACKGROUND:
          data.HOME_PAGE_HEADER_BACKGROUND + "?lang=az",
      });
      delete data.HOME_PAGE_HEADER_BACKGROUND;
      delete data.HOME_PAGE_ABOUT_US_IMAGE1;
      delete data.HOME_PAGE_ABOUT_US_IMAGE3;
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
    HOME_PAGE_HEADER_TITLE: Yup.string().required("*Required !"),
    HOME_PAGE_HEADER_BODY: Yup.string().required("*Required !"),

    HOME_PAGE_POPULAR_COURSES_TITLE: Yup.string().required("*Required !"),

    HOME_PAGE_WHY_CHOOSE_US_TITLE: Yup.string().required("*Required !"),

    HOME_PAGE_ABOUT_US_TITLE: Yup.string().required("*Required !"),
    HOME_PAGE_ABOUT_US_BODY: Yup.string().required("*Required !"),

    HOME_PAGE_ABOUT_US_SUB_BODY1_TITLE: Yup.string().required("*Required !"),
    HOME_PAGE_ABOUT_US_SUB_BODY1_BODY: Yup.string().required("*Required !"),

    HOME_PAGE_ABOUT_US_SUB_BODY2_TITLE: Yup.string().required("*Required !"),
    HOME_PAGE_ABOUT_US_SUB_BODY2_BODY: Yup.string().required("*Required !"),

    HOME_PAGE_OUR_TEACHERS_TITLE: Yup.string().required("*Required !"),
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

  const handleChangeImage = async (e, pictureType) => {
    if (pending) return;
    const fileTypes = [
      "image/png",
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size / 1048576 > 2) {
        toast.error(`Fayl həcmi 2MB-dan az olmalıdır!`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      if (!fileTypes.includes(e.target.files[0].type)) {
        toast.error(`Fayl tipi şəkil olmalıdır!`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      setPending(true);
      let formData = new FormData();
      formData.append(pictureType, e.target.files[0]);
      try {
        await privateAxios.post(`/admin/website-content/picture`, formData);
        toast.success(`Picture changed successfully!`, {
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
        getData();
      } catch (error) {
        setPending(false);
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
      }
    }
  };
  return (
    <Layout>
      <div>
        <div className="main-card mb-3 card">
          <div className="card-body">
            <div className="w-100 d-flex justify-content-between mb-3">
              <h5 className="card-title">Home Content</h5>
              <Link to={"/pricing"} className="btn btn-primary mr-5">
                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                back
              </Link>
            </div>
            <div className="w-100 mb-5">
              <div className="row">
                <div className="col-12 col-md-4 ">
                  <div className="form-image-card">
                    <div className="img-card">
                      <img
                        src={pictures?.HOME_PAGE_HEADER_BACKGROUND}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>HOME_PAGE_HEADER_BACKGROUND</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) =>
                          handleChangeImage(e, "HOME_PAGE_HEADER_BACKGROUND")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-image-card">
                    <div className="img-card">
                      <img
                        src={pictures?.HOME_PAGE_ABOUT_US_IMAGE1}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>HOME_PAGE_ABOUT_US_IMAGE1</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) =>
                          handleChangeImage(e, "HOME_PAGE_ABOUT_US_IMAGE1")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-image-card">
                    <div className="img-card">
                      <img
                        src={pictures?.HOME_PAGE_ABOUT_US_IMAGE3}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>HOME_PAGE_ABOUT_US_IMAGE3</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) =>
                          handleChangeImage(e, "HOME_PAGE_ABOUT_US_IMAGE3")
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form className="w-100" onSubmit={handleSubmit(postData)}>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="HOME_PAGE_HEADER_TITLE" className="">
                      HOME_PAGE_HEADER_TITLE
                    </label>
                    <textarea
                      name="HOME_PAGE_HEADER_TITLE"
                      id="HOME_PAGE_HEADER_TITLE"
                      rows={5}
                      placeholder="HOME_PAGE_HEADER_TITLE"
                      type="text"
                      className="form-control"
                      {...register("HOME_PAGE_HEADER_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.HOME_PAGE_HEADER_TITLE?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="HOME_PAGE_HEADER_BODY" className="">
                      HOME_PAGE_HEADER_BODY
                    </label>
                    <textarea
                      name="HOME_PAGE_HEADER_BODY"
                      id="HOME_PAGE_HEADER_BODY"
                      rows={5}
                      placeholder="HOME_PAGE_HEADER_BODY"
                      type="text"
                      className="form-control"
                      {...register("HOME_PAGE_HEADER_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.HOME_PAGE_HEADER_BODY?.message}
                  </span>
                </div>
              </div>
              <hr />
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="HOME_PAGE_POPULAR_COURSES_TITLE"
                      className=""
                    >
                      HOME_PAGE_POPULAR_COURSES_TITLE
                    </label>
                    <textarea
                      name="HOME_PAGE_POPULAR_COURSES_TITLE"
                      id="HOME_PAGE_POPULAR_COURSES_TITLE"
                      rows={5}
                      placeholder="HOME_PAGE_POPULAR_COURSES_TITLE"
                      type="text"
                      className="form-control"
                      {...register("HOME_PAGE_POPULAR_COURSES_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.HOME_PAGE_POPULAR_COURSES_TITLE?.message}
                  </span>
                </div>
              </div>

              <hr />
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="HOME_PAGE_WHY_CHOOSE_US_TITLE" className="">
                      HOME_PAGE_WHY_CHOOSE_US_TITLE
                    </label>
                    <textarea
                      name="HOME_PAGE_WHY_CHOOSE_US_TITLE"
                      id="HOME_PAGE_WHY_CHOOSE_US_TITLE"
                      rows={5}
                      placeholder="HOME_PAGE_WHY_CHOOSE_US_TITLE"
                      type="text"
                      className="form-control"
                      {...register("HOME_PAGE_WHY_CHOOSE_US_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.HOME_PAGE_WHY_CHOOSE_US_TITLE?.message}
                  </span>
                </div>
              </div>

              <hr />
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="HOME_PAGE_ABOUT_US_TITLE" className="">
                      HOME_PAGE_ABOUT_US_TITLE
                    </label>
                    <textarea
                      name="HOME_PAGE_ABOUT_US_TITLE"
                      id="HOME_PAGE_ABOUT_US_TITLE"
                      rows={5}
                      placeholder="HOME_PAGE_ABOUT_US_TITLE"
                      type="text"
                      className="form-control"
                      {...register("HOME_PAGE_ABOUT_US_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.HOME_PAGE_ABOUT_US_TITLE?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="HOME_PAGE_ABOUT_US_BODY" className="">
                      HOME_PAGE_ABOUT_US_BODY
                    </label>
                    <textarea
                      name="HOME_PAGE_ABOUT_US_BODY"
                      id="HOME_PAGE_ABOUT_US_BODY"
                      rows={5}
                      placeholder="HOME_PAGE_ABOUT_US_BODY"
                      type="text"
                      className="form-control"
                      {...register("HOME_PAGE_ABOUT_US_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.HOME_PAGE_ABOUT_US_BODY?.message}
                  </span>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="HOME_PAGE_ABOUT_US_SUB_BODY1_TITLE"
                      className=""
                    >
                      HOME_PAGE_ABOUT_US_SUB_BODY1_TITLE
                    </label>
                    <textarea
                      name="HOME_PAGE_ABOUT_US_SUB_BODY1_TITLE"
                      id="HOME_PAGE_ABOUT_US_SUB_BODY1_TITLE"
                      rows={5}
                      placeholder="HOME_PAGE_ABOUT_US_SUB_BODY1_TITLE"
                      type="text"
                      className="form-control"
                      {...register("HOME_PAGE_ABOUT_US_SUB_BODY1_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.HOME_PAGE_ABOUT_US_SUB_BODY1_TITLE?.message}
                  </span>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="HOME_PAGE_ABOUT_US_SUB_BODY1_BODY"
                      className=""
                    >
                      HOME_PAGE_ABOUT_US_SUB_BODY1_BODY
                    </label>
                    <textarea
                      name="HOME_PAGE_ABOUT_US_SUB_BODY1_BODY"
                      id="HOME_PAGE_ABOUT_US_SUB_BODY1_BODY"
                      rows={5}
                      placeholder="HOME_PAGE_ABOUT_US_SUB_BODY1_BODY"
                      type="text"
                      className="form-control"
                      {...register("HOME_PAGE_ABOUT_US_SUB_BODY1_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.HOME_PAGE_ABOUT_US_SUB_BODY1_BODY?.message}
                  </span>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="HOME_PAGE_ABOUT_US_SUB_BODY2_TITLE"
                      className=""
                    >
                      HOME_PAGE_ABOUT_US_SUB_BODY2_TITLE
                    </label>
                    <textarea
                      name="HOME_PAGE_ABOUT_US_SUB_BODY2_TITLE"
                      id="HOME_PAGE_ABOUT_US_SUB_BODY2_TITLE"
                      rows={5}
                      placeholder="HOME_PAGE_ABOUT_US_SUB_BODY2_TITLE"
                      type="text"
                      className="form-control"
                      {...register("HOME_PAGE_ABOUT_US_SUB_BODY2_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.HOME_PAGE_ABOUT_US_SUB_BODY2_TITLE?.message}
                  </span>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="HOME_PAGE_ABOUT_US_SUB_BODY2_BODY"
                      className=""
                    >
                      HOME_PAGE_ABOUT_US_SUB_BODY2_BODY
                    </label>
                    <textarea
                      name="HOME_PAGE_ABOUT_US_SUB_BODY2_BODY"
                      id="HOME_PAGE_ABOUT_US_SUB_BODY2_BODY"
                      rows={5}
                      placeholder="HOME_PAGE_ABOUT_US_SUB_BODY2_BODY"
                      type="text"
                      className="form-control"
                      {...register("HOME_PAGE_ABOUT_US_SUB_BODY2_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.HOME_PAGE_ABOUT_US_SUB_BODY2_BODY?.message}
                  </span>
                </div>
              </div>

              <hr />
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="HOME_PAGE_OUR_TEACHERS_TITLE" className="">
                      HOME_PAGE_OUR_TEACHERS_TITLE
                    </label>
                    <textarea
                      name="HOME_PAGE_OUR_TEACHERS_TITLE"
                      id="HOME_PAGE_OUR_TEACHERS_TITLE"
                      rows={5}
                      placeholder="HOME_PAGE_OUR_TEACHERS_TITLE"
                      type="text"
                      className="form-control"
                      {...register("HOME_PAGE_OUR_TEACHERS_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.HOME_PAGE_OUR_TEACHERS_TITLE?.message}
                  </span>
                </div>
              </div>

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

export default Home;
