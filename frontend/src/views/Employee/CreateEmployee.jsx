import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);

    const formSchema = Yup.object().shape({
        name: Yup.string().required("* Department name is required!"),
        department: Yup.string().required("* Department is required!"),
        position: Yup.string().required("* Position is required!"),
        employeeId: Yup.string().required("* Employee ID is required!"),
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

    const nav = useNavigate();
    const [pending, setPending] = useState(false);


    const postData = async (data) => {
        if (pending) return;
        setPending(true);

        try {
            const formData = {
                name: data.name,
                employeeId: data.employeeId,
                department: data.department, // Doğru departman ID'sini buraya ekledik
                position: data.position, // Doğru pozisyon ID'sini buraya ekledik
            }
            await privateAxios.post("/employees", formData);
            toast.success(`Employee created successfully`, {
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
            <ToastContainer />
            <div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-between mb-3">
                            <h5 className="card-title">New Department</h5>
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
                                            placeholder="Department Name"
                                            type="text"
                                            className="form-control"
                                            {...register("name")}
                                        />
                                        <span className="error-message">
                                            {errors.name?.message}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="employeeId">Employee ID</label>
                                        <input
                                            name="employeeId"
                                            id="employeeId"
                                            placeholder="Department Name"
                                            type="text"
                                            className="form-control"
                                            {...register("employeeId")}
                                        />
                                        <span className="error-message">
                                            {errors. employeeId?.message}
                                        </span>
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
                                        <span className="error-message">
                                            {errors.department?.message}
                                        </span>
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
                                        <span className="error-message">
                                            {errors.position?.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 d-flex align-items-center">
                                <div className="ml-auto">
                                    <button className="btn btn-primary">
                                        {pending ? "Creating..." : "Create"}{" "}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateEmployee;
