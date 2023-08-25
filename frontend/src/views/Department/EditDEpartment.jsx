import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";

function EditDepartment() {
  const nav = useNavigate();
  const { id } = useParams();
  const [pending, setPending] = useState(false);



  const getDataById = async () => {
    try {
      const res = await privateAxios.get(`/departments/${id}`);
      let data = res.data;
      delete data.createdDate;
      reset({
      name: data.name,
    });
    } catch (error) {
      nav("/departments");
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
      await privateAxios.patch(`/departments/${id}`, data);
      nav(-1);
      // toast.success(`Department editted successfully`, {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
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
                    <label htmlFor="name">Department Name</label>
                    <input
                      name="name"
                      id="name"
                      placeholder="Department Name"
                      type="text"
                      className="form-control"
                      {...register("name")}
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

export default EditDepartment;
