import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const CreateTransaction = () => {

    const formSchema = Yup.object().shape({
        employee: Yup.string().required("* Employee name is required!"),
        productName: Yup.string().required("* Product name is required!"),
        transactionType: Yup.string().required("* Transaction type is required!"),
        quantity: Yup.number().required("* Quantity is required!"),
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
    const [products, setProducts] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await privateAxios.get("/products");
                setProducts(response.data.products);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await privateAxios.get("/employees");
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchEmployees();
    }, []);

    const postData = async (data) => {
        if (pending) return;
        setPending(true);

        try {
            const formData = {
                employee: data.name,
                productName: data.employeeId,
                quantity: data.quantity,
                transactionType: data.transactionType,
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
    console.log(products, "hjk");
    return (
        <Layout>
            <div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-between mb-3">
                            <h5 className="card-title">New Transaction</h5>
                            <button onClick={() => nav(-1)} className="btn btn-primary mr-5">
                                <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                                Back
                            </button>
                        </div>
                        <form className="w-100" onSubmit={handleSubmit(postData)}>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="employee">Employee</label>
                                        <select
                                            name="employee"
                                            id="employee"
                                            className="form-control"
                                            {...register("employee")}
                                        >
                                            <option value="">Select a employee</option>
                                            {employees.map((employee) => (
                                                <option key={employee._id} value={employee._id}>
                                                    {employee.name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="error-message">
                                            {errors.employee?.message}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="employee">Product Name</label>
                                        <select
                                            name="productName"
                                            id="productName"
                                            className="form-control"
                                            {...register("productName")}
                                        >
                                            <option value="">Select a product name</option>
                                            {products?.map((product) => (
                                                <option key={product._id} value={product._id}>
                                                    {product.productName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="quantity">Quantity</label>
                                        <input
                                            name="quantity"
                                            id="quantity"
                                            placeholder="Quantity"
                                            type="text"
                                            className="form-control"
                                            {...register("quantity")}
                                        />
                                        <span className="error-message">
                                            {errors.quantity?.message}
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

export default CreateTransaction;
