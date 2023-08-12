import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";

function About() {
  const [pictures, setPictures] = useState({
    ABOUT_US_ABOUT_TALKERS_IMAGE: "",
    ABOUT_US_WHY_LEARN_SECTION1_IMAGE: "",
    ABOUT_US_WHY_LEARN_SECTION2_IMAGE: "",
    ABOUT_US_WHY_LEARN_SECTION3_IMAGE: "",
    ABOUT_US_WHY_LEARN_SECTION4_IMAGE: "",
    ABOUT_US_HEADER_VIDEO_BACKGROUND_IMAGE: "",
  });

  const getData = async () => {
    try {
      const res = await privateAxios.get(`/admin/website-content/about-us`);
      let data = res.data.data;
      setPictures({
        ABOUT_US_ABOUT_TALKERS_IMAGE:
          data.ABOUT_US_ABOUT_TALKERS_IMAGE + "?lang=az",
        ABOUT_US_WHY_LEARN_SECTION1_IMAGE:
          data.ABOUT_US_WHY_LEARN_SECTION1_IMAGE + "?lang=az",
        ABOUT_US_WHY_LEARN_SECTION2_IMAGE:
          data.ABOUT_US_WHY_LEARN_SECTION2_IMAGE + "?lang=az",
        ABOUT_US_WHY_LEARN_SECTION3_IMAGE:
          data.ABOUT_US_WHY_LEARN_SECTION3_IMAGE + "?lang=az",
        ABOUT_US_WHY_LEARN_SECTION4_IMAGE:
          data.ABOUT_US_WHY_LEARN_SECTION4_IMAGE + "?lang=az",
        ABOUT_US_HEADER_VIDEO_BACKGROUND_IMAGE:
          data.ABOUT_US_HEADER_VIDEO_BACKGROUND_IMAGE + "?lang=az",
      });
      delete data.ABOUT_US_ABOUT_TALKERS_IMAGE;
      delete data.ABOUT_US_WHY_LEARN_SECTION1_IMAGE;
      delete data.ABOUT_US_WHY_LEARN_SECTION2_IMAGE;
      delete data.ABOUT_US_WHY_LEARN_SECTION3_IMAGE;
      delete data.ABOUT_US_WHY_LEARN_SECTION4_IMAGE;
      delete data.ABOUT_US_HEADER_VIDEO_BACKGROUND_IMAGE;
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
    ABOUT_US_HEADER_TITLE: Yup.string().required("*Required !"),
    ABOUT_US_HEADER_BODY: Yup.string().required("*Required !"),

    ABOUT_US_ABOUT_TALKERS_TITLE: Yup.string().required("*Required !"),
    ABOUT_US_ABOUT_TALKERS_BODY: Yup.string().required("*Required !"),

    ABOUT_US_WHY_LEARN_TITLE: Yup.string().required("*Required !"),
    ABOUT_US_WHY_LEARN_BODY: Yup.string().required("*Required !"),

    ABOUT_US_WHY_LEARN_SECTION1_TITLE: Yup.string().required("*Required !"),
    ABOUT_US_WHY_LEARN_SECTION1_BODY: Yup.string().required("*Required !"),
    ABOUT_US_WHY_LEARN_SECTION2_TITLE: Yup.string().required("*Required !"),
    ABOUT_US_WHY_LEARN_SECTION2_BODY: Yup.string().required("*Required !"),
    ABOUT_US_WHY_LEARN_SECTION3_TITLE: Yup.string().required("*Required !"),
    ABOUT_US_WHY_LEARN_SECTION3_BODY: Yup.string().required("*Required !"),
    ABOUT_US_WHY_LEARN_SECTION4_TITLE: Yup.string().required("*Required !"),
    ABOUT_US_WHY_LEARN_SECTION4_BODY: Yup.string().required("*Required !"),

    ABOUT_US_HEADER_VIDEO_URL: Yup.string().required("*Required !"),
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
              <h5 className="card-title">About page Content</h5>
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
                        src={pictures?.ABOUT_US_ABOUT_TALKERS_IMAGE}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>ABOUT_US_ABOUT_TALKERS_IMAGE</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) =>
                          handleChangeImage(e, "ABOUT_US_ABOUT_TALKERS_IMAGE")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 ">
                  <div className="form-image-card">
                    <div className="img-card">
                      <img
                        src={pictures?.ABOUT_US_WHY_LEARN_SECTION1_IMAGE}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>ABOUT_US_WHY_LEARN_SECTION1_IMAGE</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) =>
                          handleChangeImage(
                            e,
                            "ABOUT_US_WHY_LEARN_SECTION1_IMAGE"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 ">
                  <div className="form-image-card">
                    <div className="img-card">
                      <img
                        src={pictures?.ABOUT_US_WHY_LEARN_SECTION2_IMAGE}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>ABOUT_US_WHY_LEARN_SECTION2_IMAGE</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) =>
                          handleChangeImage(
                            e,
                            "ABOUT_US_WHY_LEARN_SECTION2_IMAGE"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 ">
                  <div className="form-image-card">
                    <div className="img-card">
                      <img
                        src={pictures?.ABOUT_US_WHY_LEARN_SECTION3_IMAGE}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>ABOUT_US_WHY_LEARN_SECTION3_IMAGE</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) =>
                          handleChangeImage(
                            e,
                            "ABOUT_US_WHY_LEARN_SECTION3_IMAGE"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 ">
                  <div className="form-image-card">
                    <div className="img-card">
                      <img
                        src={pictures?.ABOUT_US_WHY_LEARN_SECTION4_IMAGE}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>ABOUT_US_WHY_LEARN_SECTION4_IMAGE</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) =>
                          handleChangeImage(
                            e,
                            "ABOUT_US_WHY_LEARN_SECTION4_IMAGE"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 ">
                  <div className="form-image-card">
                    <div className="img-card">
                      <img
                        src={pictures?.ABOUT_US_HEADER_VIDEO_BACKGROUND_IMAGE}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>ABOUT_US_HEADER_VIDEO_BACKGROUND_IMAGE</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) =>
                          handleChangeImage(
                            e,
                            "ABOUT_US_HEADER_VIDEO_BACKGROUND_IMAGE"
                          )
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
                    <label htmlFor="ABOUT_US_HEADER_TITLE" className="">
                      ABOUT_US_HEADER_TITLE
                    </label>
                    <textarea
                      name="ABOUT_US_HEADER_TITLE"
                      id="ABOUT_US_HEADER_TITLE"
                      rows={5}
                      placeholder="ABOUT_US_HEADER_TITLE"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_HEADER_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_HEADER_TITLE?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="ABOUT_US_HEADER_BODY" className="">
                      ABOUT_US_HEADER_BODY
                    </label>
                    <textarea
                      name="ABOUT_US_HEADER_BODY"
                      id="ABOUT_US_HEADER_BODY"
                      rows={5}
                      placeholder="ABOUT_US_HEADER_BODY"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_HEADER_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_HEADER_BODY?.message}
                  </span>
                </div>
              </div>
              <hr />
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="ABOUT_US_ABOUT_TALKERS_TITLE" className="">
                      ABOUT_US_ABOUT_TALKERS_TITLE
                    </label>
                    <textarea
                      name="ABOUT_US_ABOUT_TALKERS_TITLE"
                      id="ABOUT_US_ABOUT_TALKERS_TITLE"
                      rows={5}
                      placeholder="ABOUT_US_ABOUT_TALKERS_TITLE"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_ABOUT_TALKERS_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_ABOUT_TALKERS_TITLE?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="ABOUT_US_ABOUT_TALKERS_BODY" className="">
                      ABOUT_US_ABOUT_TALKERS_BODY
                    </label>
                    <textarea
                      name="ABOUT_US_ABOUT_TALKERS_BODY"
                      id="ABOUT_US_ABOUT_TALKERS_BODY"
                      rows={5}
                      placeholder="ABOUT_US_ABOUT_TALKERS_BODY"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_ABOUT_TALKERS_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_ABOUT_TALKERS_BODY?.message}
                  </span>
                </div>
              </div>
              <hr />
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="ABOUT_US_WHY_LEARN_TITLE" className="">
                      ABOUT_US_WHY_LEARN_TITLE
                    </label>
                    <textarea
                      name="ABOUT_US_WHY_LEARN_TITLE"
                      id="ABOUT_US_WHY_LEARN_TITLE"
                      rows={5}
                      placeholder="ABOUT_US_WHY_LEARN_TITLE"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_WHY_LEARN_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_WHY_LEARN_TITLE?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="ABOUT_US_WHY_LEARN_BODY" className="">
                      ABOUT_US_WHY_LEARN_BODY
                    </label>
                    <textarea
                      name="ABOUT_US_WHY_LEARN_BODY"
                      id="ABOUT_US_WHY_LEARN_BODY"
                      rows={5}
                      placeholder="ABOUT_US_WHY_LEARN_BODY"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_WHY_LEARN_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_WHY_LEARN_BODY?.message}
                  </span>
                </div>
              </div>
              <hr />
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="ABOUT_US_WHY_LEARN_SECTION1_TITLE"
                      className=""
                    >
                      ABOUT_US_WHY_LEARN_SECTION1_TITLE
                    </label>
                    <textarea
                      name="ABOUT_US_WHY_LEARN_SECTION1_TITLE"
                      id="ABOUT_US_WHY_LEARN_SECTION1_TITLE"
                      rows={5}
                      placeholder="ABOUT_US_WHY_LEARN_SECTION1_TITLE"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_WHY_LEARN_SECTION1_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_WHY_LEARN_SECTION1_TITLE?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="ABOUT_US_WHY_LEARN_SECTION1_BODY"
                      className=""
                    >
                      ABOUT_US_WHY_LEARN_SECTION1_BODY
                    </label>
                    <textarea
                      name="ABOUT_US_WHY_LEARN_SECTION1_BODY"
                      id="ABOUT_US_WHY_LEARN_SECTION1_BODY"
                      rows={5}
                      placeholder="ABOUT_US_WHY_LEARN_SECTION1_BODY"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_WHY_LEARN_SECTION1_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_WHY_LEARN_SECTION1_BODY?.message}
                  </span>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="ABOUT_US_WHY_LEARN_SECTION2_TITLE"
                      className=""
                    >
                      ABOUT_US_WHY_LEARN_SECTION2_TITLE
                    </label>
                    <textarea
                      name="ABOUT_US_WHY_LEARN_SECTION2_TITLE"
                      id="ABOUT_US_WHY_LEARN_SECTION2_TITLE"
                      rows={5}
                      placeholder="ABOUT_US_WHY_LEARN_SECTION2_TITLE"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_WHY_LEARN_SECTION2_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_WHY_LEARN_SECTION2_TITLE?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="ABOUT_US_WHY_LEARN_SECTION2_BODY"
                      className=""
                    >
                      ABOUT_US_WHY_LEARN_SECTION2_BODY
                    </label>
                    <textarea
                      name="ABOUT_US_WHY_LEARN_SECTION2_BODY"
                      id="ABOUT_US_WHY_LEARN_SECTION2_BODY"
                      rows={5}
                      placeholder="ABOUT_US_WHY_LEARN_SECTION2_BODY"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_WHY_LEARN_SECTION2_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_WHY_LEARN_SECTION2_BODY?.message}
                  </span>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="ABOUT_US_WHY_LEARN_SECTION3_TITLE"
                      className=""
                    >
                      ABOUT_US_WHY_LEARN_SECTION3_TITLE
                    </label>
                    <textarea
                      name="ABOUT_US_WHY_LEARN_SECTION3_TITLE"
                      id="ABOUT_US_WHY_LEARN_SECTION3_TITLE"
                      rows={5}
                      placeholder="ABOUT_US_WHY_LEARN_SECTION3_TITLE"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_WHY_LEARN_SECTION3_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_WHY_LEARN_SECTION3_TITLE?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="ABOUT_US_WHY_LEARN_SECTION3_BODY"
                      className=""
                    >
                      ABOUT_US_WHY_LEARN_SECTION3_BODY
                    </label>
                    <textarea
                      name="ABOUT_US_WHY_LEARN_SECTION3_BODY"
                      id="ABOUT_US_WHY_LEARN_SECTION3_BODY"
                      rows={5}
                      placeholder="ABOUT_US_WHY_LEARN_SECTION3_BODY"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_WHY_LEARN_SECTION3_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_WHY_LEARN_SECTION3_BODY?.message}
                  </span>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="ABOUT_US_WHY_LEARN_SECTION4_TITLE"
                      className=""
                    >
                      ABOUT_US_WHY_LEARN_SECTION4_TITLE
                    </label>
                    <textarea
                      name="ABOUT_US_WHY_LEARN_SECTION4_TITLE"
                      id="ABOUT_US_WHY_LEARN_SECTION4_TITLE"
                      rows={5}
                      placeholder="ABOUT_US_WHY_LEARN_SECTION4_TITLE"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_WHY_LEARN_SECTION4_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_WHY_LEARN_SECTION4_TITLE?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label
                      htmlFor="ABOUT_US_WHY_LEARN_SECTION4_BODY"
                      className=""
                    >
                      ABOUT_US_WHY_LEARN_SECTION4_BODY
                    </label>
                    <textarea
                      name="ABOUT_US_WHY_LEARN_SECTION4_BODY"
                      id="ABOUT_US_WHY_LEARN_SECTION4_BODY"
                      rows={5}
                      placeholder="ABOUT_US_WHY_LEARN_SECTION4_BODY"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_WHY_LEARN_SECTION4_BODY")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_WHY_LEARN_SECTION4_BODY?.message}
                  </span>
                </div>

                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="ABOUT_US_HEADER_VIDEO_URL" className="">
                      ABOUT_US_HEADER_VIDEO_URL
                    </label>
                    <textarea
                      name="ABOUT_US_HEADER_VIDEO_URL"
                      id="ABOUT_US_HEADER_VIDEO_URL"
                      rows={5}
                      placeholder="ABOUT_US_HEADER_VIDEO_URL"
                      type="text"
                      className="form-control"
                      {...register("ABOUT_US_HEADER_VIDEO_URL")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.ABOUT_US_HEADER_VIDEO_URL?.message}
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

export default About;
