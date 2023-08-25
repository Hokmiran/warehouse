import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";

function EditEmployee() {
  const nav = useNavigate();
  const { id } = useParams();
  const [pending, setPending] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);



  const getDataById = async () => {
    try {
      const res = await privateAxios.get(`/employees/${id}`);
      let data = res.data;
      delete data.createdDate;
      reset({
        name: data.name,
        employeeId: data.employeeId,
        department: data.department,
        position: data.position,
      });
    } catch (error) {
      nav("/employees");
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
      await privateAxios.patch(`/employees/${id}`, data);
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

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await privateAxios.get("/departments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchDepartments();
  }, []);

  useEffect(() => {
    async function fetchPositions() {
      try {
        const response = await privateAxios.get("/positions");
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchPositions();
  }, []);

  return (
    <Layout>
      <div>
        <div className="main-card mb-3 card">
          <div className="card-body">
            <div className="w-100 d-flex justify-content-between mb-3">
              <h5 className="card-title">Edit Employee</h5>
              <button onClick={() => nav(-1)} className="btn btn-primary mr-5">
                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                Back
              </button>
            </div>
            <form className="w-100" onSubmit={handleSubmit(postData)}>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="name">Employee Name</label>
                    <input
                      name="name"
                      id="name"
                      placeholder="Employee Name"
                      type="text"
                      className="form-control"
                      {...register("name")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor=" employeeId">Employee ID</label>
                    <input
                      name="employeeId"
                      id="employeeId"
                      placeholder="Employee ID"
                      type="text"
                      className="form-control"
                      {...register("employeeId")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="department">Department</label>
                    <select
                      name="department"
                      id="department"
                      className="form-control"
                      {...register("department")}
                    >
                      <option value="">Select a department</option>
                      {departments.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="position-relative form-group">
                    <label htmlFor="position">Position</label>
                    <select
                      name="position"
                      id="position"
                      className="form-control"
                      {...register("position")}
                    >
                      <option value="">Select a position</option>
                      {positions.map((position) => (
                        <option key={position._id} value={position._id}>
                          {position?.title}
                        </option>
                      ))}
                    </select>
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

export default EditEmployee;
