import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { privateAxios } from "../../utils/privateAxios";
import Layout from "../../components/Layout/Layout";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import moment from "moment";
import NoData from "../../components/lottie/NoData";
import { toast } from "react-toastify";

const ProductCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const fetchProductsByCategory = async (page) => {
        try {
            const response = await privateAxios.get(`/products/category/${id}?page=${page}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products by category:", error);
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        fetchProductsByCategory();
    }, [id]);


    // Modal
    const [open, setOpen] = useState(false);
    const [modalDetails, setModalDetails] = useState({});

    const openModal = (_id) => {
        setOpen(true);
        const data = products.find((e) => e._id == _id);
        setModalDetails(data);
    };

    const closeModal = () => {
        setOpen(false);
        setModalDetails({});
    };

    //   delete item
    const deleteItem = async () => {
        try {
            await privateAxios.delete(`/products/${modalDetails?._id}`);

            setProducts(products.filter((e) => e._id !== modalDetails?._id));

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


    // Pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 0) {
            setIsPending(true);
            setCurrentPage(newPage);
            if (newPage === 0) {
                navigate("/products");
            } else {
                navigate(`/products?page=${newPage + 1}`);
            }
            fetchProductsByCategory(newPage);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const pageFromUrl = parseInt(searchParams.get("page")) || 1;

        setCurrentPage(pageFromUrl - 1);
        fetchProductsByCategory(pageFromUrl - 1);
    }, [location.search]);

    return (
        <Layout>
            <div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-between mb-3">
                            <h5 className="card-title">Products</h5>
                            <Link to={"/product/create"} className="btn btn-primary mr-5">
                                <i
                                    className="fa fa-fw"
                                    aria-hidden="true"
                                    title="Copy to use plus"
                                >
                                    
                                </i>
                                New Product
                            </Link>
                        </div>
                        {isPending ? (
                            <SkeletonTheme>
                                <Skeleton animation="wave" count={10} />
                            </SkeletonTheme>

                        ) : products.length > 0 ?
                            <table className="mb-0 table">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Image</th>
                                        <th>Description</th>
                                        <th>Created At</th>
                                        <th style={{ textAlign: "center" }}>
                                            <i className="pe-7s-edit"> </i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item, key) => (
                                        <tr key={item?._id}>
                                            <th scope="row">{key + 1}</th>
                                            <td>{item?.productName} </td>
                                            <td>{item?.category?.name} </td>
                                            <td>{item?.price} </td>
                                            <td>{item?.quantity} </td>
                                            <td><img style={{ width: 50, height: 50 }} src={item?.image?.filePath} /></td>
                                            <td>{item?.description} </td>
                                            <td>{moment(item.createdAt).format("D MMMM YYYY")}</td>
                                            <td style={{ width: "20%", textAlign: "center" }}>
                                                <div
                                                    role="group"
                                                    className="btn-group"
                                                    data-toggle="buttons"
                                                >
                                                    <Link
                                                        to={`/product/${item?._id}/edit`}
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
                                                        // to={`/pricing/${item?.id}/edit`}
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
                            : <NoData />
                        }
                        <div className="d-flex justify-content-center mt-3">
                            <button
                                className="btn btn-primary"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                            >
                                Previous
                            </button>
                            <button
                                className="btn btn-primary ml-2"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={0 == Math.floor(products.length / itemsPerPage) || products.length < itemsPerPage}

                            >
                                Next
                            </button>
                        </div>
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
};

export default ProductCategory;