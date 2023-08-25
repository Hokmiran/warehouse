import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { privateAxios } from "../../utils/privateAxios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NoData from "../../components/lottie/NoData";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import moment from "moment";



function Positions() {
    const navigate = useNavigate();
    const location = useLocation();
    const [list, setList] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;


    // Get all products
    const getData = async (page) => {
        try {
            let res = await privateAxios.get(`/positions?page=${page}`);
            const transformedData = res.data.map(item => ({
                ...item,
                title: item.title
            }));
            setList(transformedData);
        } catch (error) {
            setList([]);
        } finally {
            setIsPending(false);
        }
    };

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
            await privateAxios.delete(`/positions/${modalDetails?._id}`);

            setList(list.filter((e) => e._id !== modalDetails?._id));

            closeModal();

            toast.success(`Position deleted successfully`, {
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
                navigate("/positions");
            } else {
                navigate(`/positions?page=${newPage + 1}`);
            }
            getData(newPage);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const pageFromUrl = parseInt(searchParams.get("page")) || 1;

        setCurrentPage(pageFromUrl - 1);
        getData(pageFromUrl - 1);
    }, [location.search]);

    return (
        <Layout>
            <div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <div className="w-100 d-flex justify-content-between mb-3">
                            <h5 className="card-title">Positions</h5>
                            <Link to={"/position/create"} className="btn btn-primary mr-5">
                                <i
                                    className="fa fa-fw"
                                    aria-hidden="true"
                                    title="Copy to use plus"
                                >
                                    
                                </i>
                                New Position
                            </Link>
                        </div>
                        {isPending ? (
                            <SkeletonTheme>
                                <Skeleton animation="wave" count={10} />
                            </SkeletonTheme>

                        ) : list.length > 0 ?
                            <table className="mb-0 table">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Created At</th>
                                        <th style={{ textAlign: "center" }}>
                                            <i className="pe-7s-edit"> </i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((item, key) => (
                                        <tr key={item?._id}>
                                            <th scope="row">{key + 1}</th>
                                            <td>{item?.title} </td>
                                            <td>{moment(item.createdAt).format("D MMMM YYYY")}</td>
                                            <td style={{ width: "20%", textAlign: "center" }}>
                                                <div
                                                    role="group"
                                                    className="btn-group"
                                                    data-toggle="buttons"
                                                >
                                                    <Link
                                                        to={`/position/${item?._id}/edit`}
                                                        className="btn btn-success"
                                                        
                                                    >
                                                        {console.log(item?._id)}
                                                        <i
                                                            className="fa fa-fw"
                                                            aria-hidden="true"
                                                            title="Copy to use edit"
                                                        >
                                                            
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
                                disabled={0 == Math.floor(list.length / itemsPerPage) || list.length < itemsPerPage}

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
}

export default Positions;