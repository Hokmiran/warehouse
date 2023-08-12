import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";

function ContactUs() {
  const [pictures, setPictures] = useState({
    CONTACT_US_MESSAGE_IMAGE: "",
  });

  const getData = async () => {
    try {
      const res = await privateAxios.get(`/admin/website-content/contact-us`);
      let data = res.data.data;
      setPictures({
        CONTACT_US_MESSAGE_IMAGE: data.CONTACT_US_MESSAGE_IMAGE + "?lang=az",
      });
      delete data.CONTACT_US_MESSAGE_IMAGE;
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
    CONTACT_US_HEADER_TTLE: Yup.string().required("*Required !"),

    CONTACT_US_MESSAGE_TITLE: Yup.string().required("*Required !"),

    CONTACT_US_EMAIL1: Yup.string().required("*Required !"),
    CONTACT_US_EMAIL2: Yup.string().required("*Required !"),
    CONTACT_US_PHONE_NUMBER1: Yup.string().required("*Required !"),
    CONTACT_US_PHONE_NUMBER2: Yup.string().required("*Required !"),
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
              <h5 className="card-title">Courses page Content</h5>
              <Link to={"/pricing"} className="btn btn-primary mr-5">
                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                back
              </Link>
            </div>
            <div className="w-100 mb-5">
              <div className="row">
                <div className="col-12 col-md-6 ">
                  <div className="form-image-card">
                    <div className="img-card">
                      <img
                        src={pictures?.CONTACT_US_MESSAGE_IMAGE}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>CONTACT_US_MESSAGE_IMAGE</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) =>
                          handleChangeImage(e, "CONTACT_US_MESSAGE_IMAGE")
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
                    <label htmlFor="CONTACT_US_HEADER_TTLE" className="">
                      CONTACT_US_HEADER_TTLE
                    </label>
                    <textarea
                      name="CONTACT_US_HEADER_TTLE"
                      id="CONTACT_US_HEADER_TTLE"
                      rows={5}
                      placeholder="CONTACT_US_HEADER_TTLE"
                      type="text"
                      className="form-control"
                      {...register("CONTACT_US_HEADER_TTLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.CONTACT_US_HEADER_TTLE?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="CONTACT_US_MESSAGE_TITLE" className="">
                      CONTACT_US_MESSAGE_TITLE
                    </label>
                    <textarea
                      name="CONTACT_US_MESSAGE_TITLE"
                      id="CONTACT_US_MESSAGE_TITLE"
                      rows={5}
                      placeholder="CONTACT_US_MESSAGE_TITLE"
                      type="text"
                      className="form-control"
                      {...register("CONTACT_US_MESSAGE_TITLE")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.CONTACT_US_MESSAGE_TITLE?.message}
                  </span>
                </div>
              </div>
              <hr />
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="CONTACT_US_EMAIL1" className="">
                      CONTACT_US_EMAIL1
                    </label>
                    <textarea
                      name="CONTACT_US_EMAIL1"
                      id="CONTACT_US_EMAIL1"
                      rows={5}
                      placeholder="CONTACT_US_EMAIL1"
                      type="text"
                      className="form-control"
                      {...register("CONTACT_US_EMAIL1")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.CONTACT_US_EMAIL1?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="CONTACT_US_EMAIL2" className="">
                      CONTACT_US_EMAIL2
                    </label>
                    <textarea
                      name="CONTACT_US_EMAIL2"
                      id="CONTACT_US_EMAIL2"
                      rows={5}
                      placeholder="CONTACT_US_EMAIL2"
                      type="text"
                      className="form-control"
                      {...register("CONTACT_US_EMAIL2")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.CONTACT_US_EMAIL2?.message}
                  </span>
                </div>
              </div>
              <hr />
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="CONTACT_US_PHONE_NUMBER1" className="">
                      CONTACT_US_PHONE_NUMBER1
                    </label>
                    <textarea
                      name="CONTACT_US_PHONE_NUMBER1"
                      id="CONTACT_US_PHONE_NUMBER1"
                      rows={5}
                      placeholder="CONTACT_US_PHONE_NUMBER1"
                      type="text"
                      className="form-control"
                      {...register("CONTACT_US_PHONE_NUMBER1")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.CONTACT_US_PHONE_NUMBER1?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="CONTACT_US_PHONE_NUMBER2" className="">
                      CONTACT_US_PHONE_NUMBER2
                    </label>
                    <textarea
                      name="CONTACT_US_PHONE_NUMBER2"
                      id="CONTACT_US_PHONE_NUMBER2"
                      rows={5}
                      placeholder="CONTACT_US_PHONE_NUMBER2"
                      type="text"
                      className="form-control"
                      {...register("CONTACT_US_PHONE_NUMBER2")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.CONTACT_US_PHONE_NUMBER2?.message}
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

export default ContactUs;
