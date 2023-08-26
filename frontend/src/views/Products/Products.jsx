import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { privateAxios } from "../../utils/privateAxios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import NoData from "../../components/lottie/NoData";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import moment from "moment";
import './Category.css';



function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [list, setList] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [pageNumberInput, setPageNumberInput] = useState("");
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalProducts: 0
  });

  const getData = async (page = 1, limit = 10) => {
    try {
      let res = await privateAxios.get(`/products?page=${page}&limit=${limit}`);
      const transformedData = res.data.products.map(item => ({
        ...item,
        category: item.category.name
      }));
      setList(transformedData);
      setPaginationInfo({
        currentPage: res.data.paginationInfo.currentPage,
        totalPages: res.data.paginationInfo.totalPages,
        pageSize: res.data.paginationInfo.pageSize,
        totalProducts: res.data.paginationInfo.totalProducts
      });
    } catch (error) {
      setList([]);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const page = new URLSearchParams(location.search).get("page") || 1;
    getData(page);
  }, [location.search]);

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
      await privateAxios.delete(`/products/${modalDetails?._id}`);

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

            ) : list.length > 0 ?
              <div>
                {/* Items per page dropdown */}
                <div className="page-size-select">
                  <span>Show</span>
                  <select
                    id="limitSelect"
                    value={paginationInfo.pageSize}
                    onChange={(event) => {
                      const newLimit = parseInt(event.target.value);
                      getData(1, newLimit);
                    }}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                  </select>
                  <span>per page</span>
                </div>
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
                    {list.map((item, key) => (
                      <tr key={item?._id}>
                        <th scope="row">{key + 1}</th>
                        <td>{item?.productName} </td>
                        <td>{item?.category} </td>
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
                <div className="pagination-container">

                  <button
                    className="pagination-button prev"
                    onClick={() => {
                      const newPage = Math.max(1, paginationInfo.currentPage - 1);
                      navigate(`?page=${newPage}`);
                    }}
                    disabled={paginationInfo.currentPage === 1}
                  >
                    Previous
                  </button>
                  <div className="page-numbers">
                    {paginationInfo.currentPage > 5 && (
                      <button
                        className="pagination-button"
                        onClick={() =>
                          getData(paginationInfo.currentPage - 5, paginationInfo.pageSize)
                        }
                      >
                        ...
                      </button>
                    )}
                    {Array.from({ length: paginationInfo.totalPages }, (_, index) => {
                      if (
                        index + 1 >= Math.max(1, paginationInfo.currentPage - 2) &&
                        index + 1 <= Math.min(paginationInfo.totalPages, paginationInfo.currentPage + 2)
                      ) {
                        return (
                          <button
                            key={index}
                            className={`pagination-button ${paginationInfo.currentPage === index + 1 ? "active" : ""}`}
                            onClick={() => {
                              navigate(`?page=${index + 1}`);
                            }}
                          >
                            {index + 1}
                          </button>
                        );
                      }
                      return null;
                    })}
                    {paginationInfo.currentPage <= paginationInfo.totalPages - 5 && (
                      <button
                        className="pagination-button"
                        onClick={() =>
                          getData(paginationInfo.currentPage + 5, paginationInfo.pageSize)
                        }
                      >
                        ...
                      </button>
                    )}
                    {paginationInfo.currentPage < paginationInfo.totalPages && (
                      <div>
                        <span className="total-pages-text">Total pages</span>
                        <button
                          className={`pagination-button ${paginationInfo.currentPage === paginationInfo.totalPages ? "active" : ""
                            }`}
                          onClick={() => getData(paginationInfo.totalPages, paginationInfo.pageSize)}
                        >
                          {paginationInfo.totalPages}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="page-number-input">
                    <input
                      type="text"
                      placeholder="Go to page"
                      value={pageNumberInput}
                      onChange={(e) => setPageNumberInput(e.target.value)}
                    />
                    <button
                      className="pagination-button"
                      onClick={() => {
                        const enteredPageNumber = parseInt(pageNumberInput);
                        if (
                          !isNaN(enteredPageNumber) &&
                          enteredPageNumber > 0 &&
                          enteredPageNumber <= paginationInfo.totalPages
                        ) {
                          navigate(`?page=${enteredPageNumber}`);
                          setPageNumberInput("");
                        }
                      }}
                    >
                      Go
                    </button>
                  </div>
                  <button
                    className="pagination-button next"
                    onClick={() => {
                      const newPage = Math.min(paginationInfo.currentPage + 1, paginationInfo.totalPages);
                      navigate(`?page=${newPage}`);
                    }}
                    disabled={paginationInfo.currentPage === paginationInfo.totalPages}
                  >
                    Next
                  </button>
                </div>

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

export default Products;
