import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";

function EditPostion() {
  const nav = useNavigate();
  const { id } = useParams();
  const [pending, setPending] = useState(false);



  const getDataById = async () => {
    try {
      const res = await privateAxios.get(`/positions/${id}`);
      let data = res.data;
      delete data.createdDate;
      reset({
      title: data.title,
    });
    } catch (error) {
      nav("/positions");
    }

  };
  useEffect(() => {
    getDataById();
  }, [id]);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const postData = async (data) => {
    if (pending) return;
    setPending(true);
    try {
      await privateAxios.patch(`/positions/${id}`, data);
      nav(-1);
      toast.success(`Position editted successfully`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
              <h5 className="card-title">Edit Product</h5>
              <button onClick={() => nav(-1)} className="btn btn-primary mr-5">
                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                Back
              </button>
            </div>
            <form className="w-100" onSubmit={handleSubmit(postData)}>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="title">Position Name</label>
                    <input
                      name="title"
                      id="title"
                      placeholder="Position Name"
                      type="text"
                      className="form-control"
                      {...register("title")}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 d-flex align-items-center">
                <div className="ml-auto">
                  <button className="btn btn-primary">
                    {pending ? "Editing..." : "Edit"}{" "}
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

export default EditPostion;
