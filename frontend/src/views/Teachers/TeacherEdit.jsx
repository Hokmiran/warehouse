import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";

function TeacherEdit() {
  const nav = useNavigate();
  const { id } = useParams();

  const [pictures, setPictures] = useState({
    firstPicture: "",
    secondPicture: "",
    userId: 0,
  });

  const getDataById = async () => {
    try {
      const res = await privateAxios.get(`/teacher/${id}`);
      let data = res.data.data;
      reset({
        firstNote: data.firstNote,
        secondNote: data.secondNote,
        thirdNote: data.thirdNote,
        fourthNote: data.fourthNote,
        youtubeUrl: data.youtubeUrl,
        approved: data.approved,
        homeStatus: data.homeStatus,
      });

      setPictures({
        firstPicture: data.firstPicture,
        secondPicture: data.secondPicture,
        userId: data.userId,
      });
    } catch (error) {
      nav("/teachers");
    }
  };
  useEffect(() => {
    getDataById();
  }, [id]);

  const [pending, setPending] = useState(false);

  const formSchema = Yup.object().shape({
    firstNote: Yup.string(),
    secondNote: Yup.string(),
    thirdNote: Yup.string(),
    fourthNote: Yup.string(),
    youtubeUrl: Yup.string(),
    approved: Yup.boolean(),
    homeStatus: Yup.boolean(),
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
      await privateAxios.patch(
        `/admin/teacher/update/${pictures.userId}`,
        data
      );
      nav("/teachers");
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
        await privateAxios.patch(
          `/admin/teacher/picture/${pictures.userId}`,
          formData
        );
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
        getDataById();
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
              <h5 className="card-title">Edit Teacher</h5>
              <Link to={"/teachers"} className="btn btn-primary mr-5">
                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                Back
              </Link>
            </div>
            <div className="w-100 mb-5">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-image-card">
                    <div className="img-card">
                      <img
                        src={pictures?.firstPicture}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>First Picture</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) => handleChangeImage(e, "first")}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-image-card">
                    <div className="img-card">
                      <img
                        src={pictures?.secondPicture}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </div>
                    <div className="card-body">
                      <p>Second Picture</p>
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                        onChange={(e) => handleChangeImage(e, "second")}
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
                    <label htmlFor="firstNote" className="">
                      First Note
                    </label>
                    <input
                      name="firstNote"
                      id="firstNote"
                      placeholder="First Note"
                      type="text"
                      className="form-control"
                      {...register("firstNote")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="secondNote" className="">
                      Second Note
                    </label>
                    <input
                      name="secondNote"
                      id="secondNote"
                      placeholder="Second Note"
                      type="text"
                      className="form-control"
                      {...register("secondNote")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="thirdNote" className="">
                      Third Note
                    </label>
                    <input
                      name="thirdNote"
                      id="thirdNote"
                      placeholder="Third Note"
                      type="text"
                      className="form-control"
                      {...register("thirdNote")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="fourthNote" className="">
                      Fourth Note
                    </label>
                    <input
                      name="fourthNote"
                      id="fourthNote"
                      placeholder="Fourth Note"
                      type="text"
                      className="form-control"
                      {...register("fourthNote")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="youtubeUrl" className="">
                      Youtube Url
                    </label>
                    <input
                      name="youtubeUrl"
                      id="youtubeUrl"
                      placeholder="Youtube Url"
                      type="text"
                      className="form-control"
                      {...register("youtubeUrl")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="approved" className="">
                      Approved
                    </label>

                    <select
                      name="approved"
                      id="approved"
                      className="form-control"
                      {...register("approved")}
                    >
                      <option value={false}>False</option>
                      <option value={true}>True</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="homeStatus" className="">
                      Home Status
                    </label>

                    <select
                      name="homeStatus"
                      id="homeStatus"
                      className="form-control"
                      {...register("homeStatus")}
                    >
                      <option value={false}>False</option>
                      <option value={true}>True</option>
                    </select>
                  </div>
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

export default TeacherEdit;
