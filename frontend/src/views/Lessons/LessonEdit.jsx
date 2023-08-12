import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm, Controller } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";
import AsyncSelect from "react-select/async";

function LessonEdit() {
  const { id } = useParams();
  const getDefData = async (id) => {
    try {
      const res = await privateAxios.get(`/lesson/${id}`);
      const defData = await res.data.data;
      reset({
        teacherId: {
          value: defData.teacherId,
          label: defData.teacher,
        },
        topic: defData.topic,
        url: defData.url,
        date: defData.date,
        beginTime: defData.beginTime,
        endTime: defData.endTime,
        level: defData.level,
        studentCount: defData.studentCount,
      });
    } catch (err) {}
  };
  useEffect(() => {
    getDefData(id);
  }, [id]);
  const [pending, setPending] = useState(false);

  const loadOptions = async (inputValue) => {
    try {
      const response = await privateAxios.get(
        `/admin/teacher/fullName?fullName=${inputValue}`
      );
      const options = response.data.data.map((item) => ({
        value: item.teacherId,
        label: item.fullName,
      }));
      return options;
    } catch (error) {
      console.error("Error fetching options: ", error);
      return [];
    }
  };

  const formSchema = Yup.object().shape({
    teacherId: Yup.object()
      .shape({
        value: Yup.string().required("Teacher is required"),
        label: Yup.string().required(),
      })
      .required("Teacher is required"),
    topic: Yup.string().required("* Topic is required !"),
    level: Yup.string().required("Level is required"),
    studentCount: Yup.number()
      .typeError("Student count should be number")
      .required("Student count is required"),
    date: Yup.string().required("* Date is required !"),
    beginTime: Yup.string().required("* Begin time is required !"),
    endTime: Yup.string().required("* End time is required !"),
    url: Yup.string()
      .required("* Url is required !")
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "* Field should be valid url"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const postData = async (data) => {
    data.teacherId = Number(data.teacherId?.value);
    data.endTime = data.endTime + ":00";
    data.beginTime = data.beginTime + ":00";
    if (pending) return;
    setPending(true);
    try {
      await privateAxios.patch(`/admin/lesson/${id}`, data);
      toast.success(`Lesson editted successfully`, {
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
              <h5 className="card-title">Edit Lesson</h5>
              <Link to={"/pricing"} className="btn btn-primary mr-5">
                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                back
              </Link>
            </div>
            <form className="w-100" onSubmit={handleSubmit(postData)}>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="price" className="">
                      Teacher
                    </label>
                    <Controller
                      name={"teacherId"}
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <AsyncSelect
                          isSearchable
                          defaultOptions
                          value={value}
                          onChange={(selectedOption) =>
                            onChange(selectedOption)
                          }
                          loadOptions={loadOptions}
                        />
                      )}
                    />
                  </div>
                  <span className="error-message">
                    {errors.teacherId?.value?.message}
                  </span>
                </div>
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
                    <label htmlFor="studentCount" className="">
                      Student Count
                    </label>
                    <input
                      name="studentCount"
                      id="studentCount"
                      placeholder="Student Count"
                      type="text"
                      className="form-control"
                      {...register("studentCount")}
                    />
                  </div>
                  <span className="error-message">
                    {errors.studentCount?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="date" className="">
                      Date
                    </label>
                    <input
                      name="date"
                      id="date"
                      placeholder="date"
                      type="date"
                      className="form-control"
                      {...register("date")}
                    />
                  </div>
                  <span className="error-message">{errors.date?.message}</span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="beginTime" className="">
                      Begin Time
                    </label>
                    <input
                      name="beginTime"
                      id="beginTime"
                      placeholder="beginTime"
                      type="time"
                      className="form-control"
                      {...register("beginTime")}
                    />
                  </div>
                  <span className="error-message">
                    {errors.beginTime?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="endTime" className="">
                      End Time
                    </label>
                    <input
                      name="endTime"
                      id="endTime"
                      placeholder="endTime"
                      type="time"
                      className="form-control"
                      {...register("endTime")}
                    />
                  </div>
                  <span className="error-message">
                    {errors.endTime?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="url" className="">
                      Url
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
              </div>

              <div className="mt-4 d-flex align-items-center">
                <div className="ml-auto">
                  <button className="btn btn-primary">
                    {pending ? "Edit..." : "Edit"}{" "}
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

export default LessonEdit;
