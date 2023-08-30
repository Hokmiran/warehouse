import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { privateAxios } from "../../utils/privateAxios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import NoData from "../../components/lottie/NoData";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import moment from "moment";

function ProductsTransactions() {

    const [list, setList] = useState([]);
    const [isPending, setIsPending] = useState(true);


    const getData = async () => {
        try {
            setIsPending(true);
            let res = await privateAxios.get(`/products/transactions`);
            setList(res.data);
        } catch (error) {
            setList([]);
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    // Modal
    const [open, setOpen] = useState(false);
    const [modalDetails, setModalDetails] = useState({});

    const openModal = (_id) => {
        setOpen(true);
        const data = list.find((e) => e._id == _id);
        setModalDetails(data);
    };

    const closeModal = () => {
        setOpen(false);
        setModalDetails({});
    };

    //   delete item
    const deleteItem = async () => {
        try {
            await privateAxios.delete(`/products/transactions/${modalDetails?._id}`);

            setList(list.filter((e) => e._id !== modalDetails?._id));

            closeModal();

            toast.success(`Product deleted successfully`, {
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
        }
    };
    console.log(list);
    return (
        <Layout>
            <div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-between mb-3">
                            <h5 className="card-title">Transactions</h5>
                            <Link to={"/transaction/create"} className="btn btn-primary mr-5">
                                <i
                                    className="fa fa-fw"
                                    aria-hidden="true"
                                    title="Copy to use plus"
                                >
                                    
                                </i>
                                New Transaction
                            </Link>
                        </div>
                        {isPending || list.length === 0 ? (
                            <SkeletonTheme>
                                <Skeleton animation="wave" count={10} />
                            </SkeletonTheme>

                        ) : list.length > 0 ?
                            <div>
                                <table className="mb-0 table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th className="filter-item">
                                                Employee Name
                                            </th>
                                            <th className="filter-item">
                                                Product Name
                                            </th>
                                            <th className="filter-item">
                                                Quantity
                                            </th>
                                            <th className="filter-item">
                                                Transaction Type
                                            </th>
                                            <th className="filter-item">
                                                Created At{" "}
                                            </th>
                                            <th style={{ textAlign: "center" }}>
                                                <i className="pe-7s-edit"> </i>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((item, key) => (
                                            <tr key={item?._id}>
                                                <th scope="row">{key + 1}</th>
                                                <td>{item?.employee?.name} </td>
                                                <td>{item?.product?.productName} </td>
                                                <td>{item?.quantity} </td>
                                                <td> {item?.transactionType} </td>
                                                <td>{moment(item.createdAt).format("D MMMM YYYY")}</td>
                                                <td style={{ width: "20%", textAlign: "center" }}>
                                                    <div
                                                        role="group"
                                                        className="btn-group"
                                                        data-toggle="buttons"
                                                    >
                                                        <Link
                                                            to={`/product/transactions/${item?._id}/edit`}
                                                            className="btn btn-success"
                                                        >
                                                            <i
                                                                className="fa fa-fw"
                                                                aria-hidden="true"
                                                                title="Copy to use edit"
                                                            >
                                                                
                                                            </i>
                                                        </Link>
                                                        <Link
                                                            to={`/product/transactions/${item?._id}/view`}
                                                            className="btn btn-primary"
                                                        >
                                                            <i
                                                                className="fa fa-eye"
                                                                aria-hidden="true"
                                                                title="Copy to see product details"
                                                            >

                                                            </i>
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={() => openModal(item?._id)}
                                                        >
                                                            <i
                                                                className="fa fa-fw"
                                                                aria-hidden="true"
                                                                title="Copy to use trash"
                                                            >
                                                                
                                                            </i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            : <NoData />
                        }
                    </div>
                </div>
            </div>
            <div
                className={`modal fade bd-example-modal-lg ${open ? "show " : ""}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => closeModal()}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h3 className="text-center mt-5">Are you sure ?</h3>
                            <div
                                className="d-flex justify-content-center mt-4"
                                style={{ gap: "10px" }}
                            >
                                <button className="btn btn-danger" onClick={() => closeModal()}>
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={() => deleteItem()}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductsTransactions;
