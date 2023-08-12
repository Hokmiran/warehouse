import { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";

function ProductEdit() {
  const nav = useNavigate();
  const { id } = useParams();

  const getDataById = async () => {
    try {
      const res = await privateAxios.get(`/admin/price/${id}`);
      let data = res.data.data;
      delete data.createdDate;
      reset(data);
    } catch (error) {
      nav("/pricing");
    }
  };
  useEffect(() => {
    getDataById();
  }, [id]);

  const [pending, setPending] = useState(false);

  const formSchema = Yup.object().shape({
    price: Yup.number()
      .typeError("* Rəqəm olmalıdır")
      .required("* price is required !"),
    useDayCount: Yup.number()
      .typeError("* Rəqəm olmalıdır")
      .required("* useDayCount is required !"),
    lessonsCount: Yup.number()
      .typeError("* Rəqəm olmalıdır")
      .required("* lessonCount is required !"),
    detail1: Yup.string().required("* Detail is required !"),
    detail2: Yup.string().required("* Detail is required !"),
    detail3: Yup.string().required("* Detail is required !"),
    description: Yup.string().required("* Description is required !"),
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
      await privateAxios.patch(`/admin/price/${id}`, data);
      nav("/pricing");
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
              <h5 className="card-title">Edit Price</h5>
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
                      Price
                    </label>
                    <input
                      name="price"
                      id="price"
                      placeholder="Price"
                      type="text"
                      className="form-control"
                      {...register("price")}
                    />
                  </div>
                  <span className="error-message">{errors.price?.message}</span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="lessonsCount" className="">
                      lessonCount
                    </label>
                    <input
                      name="lessonsCount"
                      id="lessonsCount"
                      placeholder="lessonsCount"
                      type="text"
                      className="form-control"
                      {...register("lessonsCount")}
                    />
                  </div>
                  <span className="error-message">
                    {errors.lessonsCount?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="useDayCount" className="">
                      useDayCount
                    </label>
                    <input
                      name="useDayCount"
                      id="useDayCount"
                      placeholder="useDayCount"
                      type="text"
                      className="form-control"
                      {...register("useDayCount")}
                    />
                  </div>
                  <span className="error-message">
                    {errors.useDayCount?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="detail1" className="">
                      detail1
                    </label>
                    <input
                      name="detail1"
                      id="detail1"
                      placeholder="detail1"
                      type="text"
                      className="form-control"
                      {...register("detail1")}
                    />
                  </div>
                  <span className="error-message">
                    {errors.detail1?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="detail2" className="">
                      detail2
                    </label>
                    <input
                      name="detail2"
                      id="detail2"
                      placeholder="detail2"
                      type="text"
                      className="form-control"
                      {...register("detail2")}
                    />
                  </div>
                  <span className="error-message">
                    {errors.detail2?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="detail3" className="">
                      detail3
                    </label>
                    <input
                      name="detail3"
                      id="detail3"
                      placeholder="detail3"
                      type="text"
                      className="form-control"
                      {...register("detail3")}
                    />
                  </div>
                  <span className="error-message">
                    {errors.detail3?.message}
                  </span>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="description" className="">
                      description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      {...register("description")}
                    ></textarea>
                  </div>
                  <span className="error-message">
                    {errors.description?.message}
                  </span>
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

export default ProductEdit;
