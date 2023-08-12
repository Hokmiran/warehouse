import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { privateAxios } from "../../utils/privateAxios";
import Pagination from "../../components/Pagination/Pagination";
import TimePassedComponent from "../../components/TimePassed/TimePassedComponent";
import { toast } from "react-toastify";

function ContactRequests() {
  const [pagination, setPagination] = useState({
    pageNo: 1,
    totalPages: 1,
    next: "",
    previous: "",
  });

  const [list, setList] = useState([]);
  const getData = async (url) => {
    try {
      let res = await privateAxios.get(`/admin/contact-message/filter?${url}`);

      setList(res.data.data);
      setPagination({
        pageNo: res.data.pageNo,
        totalPages: res.data.totalPages,
        next: res.data.next,
        previous: res.data.previous,
      });
    } catch (error) {
      setList([]);
    }
  };

  const [filterItems, setFilterItems] = useState({
    email: null,
    name: null,
    subject: null,
  });

  const handleSearch = (e) => {
    const { name, value } = e.target;
    if (value) {
      setFilterItems({ ...filterItems, [name]: value });
    } else {
      setFilterItems({ ...filterItems, [name]: null });
    }
  };
  useEffect(() => {
    let url = "page=1&limit=10&seen=false&";
    for (const key in filterItems) {
      if (filterItems[key]) {
        url += `${key}=${filterItems[key]}&`;
      }
    }
    url = url.substring(0, url.length - 1);
    getData(url);
  }, [filterItems]);

  //   modal
  const [open, setOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({});

  const openModal = (id) => {
    setOpen(true);
    const data = list.find((e) => e.id == id);
    setModalDetails(data);
  };
  const closeModal = () => {
    setOpen(false);
    setModalDetails({});
  };

  //   delete item
  const deleteItem = async () => {
    try {
      await privateAxios.delete(`/admin/contact-message/${modalDetails?.id}`);

      setList(list.filter((e) => e.id !== modalDetails?.id));

      closeModal();
      toast.success(`Contact deleted successfully`, {
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

  const changeToSeen = async (id) => {
    try {
      await privateAxios.patch(`/admin/contact-message/seen/${id}`);

      setList(list.filter((e) => e.id !== id));

      toast.success(`Contact status changed successfully`, {
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
              <h5 className="card-title">Contacts Requests</h5>
            </div>
            <table className="mb-0 table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="form-control"
                      onChange={(e) => handleSearch(e)}
                      style={{ maxWidth: "150px" }}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      onChange={(e) => handleSearch(e)}
                      style={{ maxWidth: "150px" }}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="form-control"
                      onChange={(e) => handleSearch(e)}
                      style={{ maxWidth: "150px" }}
                    />
                  </th>
                  <th>Message</th>
                  <th>Date</th>
                  <th style={{ textAlign: "center" }}>
                    <i className="pe-7s-edit"> </i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, key) => (
                  <tr key={item?.id}>
                    <th scope="row">{key + 1}</th>
                    <td>{item?.name}</td>
                    <td>{item?.email} </td>
                    <td>{item?.subject} </td>
                    <td>{item?.message} </td>
                    <td>
                      <TimePassedComponent datetime={item?.sentAt} />{" "}
                    </td>
                    <td style={{ width: "20%", textAlign: "center" }}>
                      <div
                        role="group"
                        className="btn-group"
                        data-toggle="buttons"
                      >
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => changeToSeen(item?.id)}
                        >
                          <i
                            className="fa fa-fw"
                            aria-hidden="true"
                            title="Copy to use check"
                          >
                            
                          </i>
                          <i
                            className="fa fa-fw"
                            aria-hidden="true"
                            title="Copy to use check"
                            style={{ marginLeft: "-10px" }}
                          >
                            
                          </i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => openModal(item?.id)}
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
        </div>
        <Pagination pagination={pagination} setData={getData} limit={1} />
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

export default ContactRequests;
