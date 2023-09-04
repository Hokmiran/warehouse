import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import { privateAxios } from "../../utils/privateAxios";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";

const CreateTransaction = () => {

    const formSchema = Yup.object().shape({
        employee: Yup.string().required("* Employee name is required!"),
        product: Yup.object()
            .shape({
                value: Yup.string().required("Teacher is required"),
                label: Yup.string().required(),
            })
            .required("Teacher is required"),
        quantity: Yup.number().required("* Quantity is required!"),
        hasReturned: Yup.bool("* Transaction type is required!"),
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

    const nav = useNavigate();
    const [pending, setPending] = useState(false);
    const [employees, setEmployees] = useState([]);

    const loadOptions = async (inputValue) => {
        try {
            const response = await privateAxios.get(
                `/products?nameFilter=${inputValue}`
            );
            const options = response.data?.products?.map((item) => ({
                value: item._id,
                label: item.productName,
            }));

            return options;
        } catch (error) {
            console.error("Error fetching options: ", error);
            return [];
        }

    };


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
        console.log(data, 'hj');
        try {
            const formData = {
                employee: data?.employee,
                product: data?.product?.value,
                quantity: data?.quantity,
                hasReturned: data?.hasReturned,
            }
            await privateAxios.post("/products/transactions", formData);
            toast.success(`Transaction created successfully`, {
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
                                        <label htmlFor="product">Product Name</label>
                                        <Controller
                                            name={"product"}
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <AsyncSelect
                                                    isSearchable
                                                    defaultOptions
                                                    isClearable
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
                                        {errors.product?.message}
                                    </span>
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
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                        <label htmlFor="hasReturned">Transaction Type</label>
                                        <select
                                            name="hasReturned"
                                            id="hasReturned"
                                            className="form-control"
                                            {...register("hasReturned")}
                                        >
                                            <option value="">Select a transaction type</option>
                                            <option value={true}>True</option>
                                            <option value={false}>False</option>
                                        </select>
                                        <span className="error-message">
                                            {console.log(errors)}
                                            {errors.hasReturned?.message}
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
