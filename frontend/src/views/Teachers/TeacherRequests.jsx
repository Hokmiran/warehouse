import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { privateAxios } from "../../utils/privateAxios";
import Pagination from "../../components/Pagination/Pagination";
import TimePassedComponent from "../../components/TimePassed/TimePassedComponent";
import { toast } from "react-toastify";

function TeacherRequests() {
  const [pagination, setPagination] = useState({
    pageNo: 1,
    totalPages: 1,
    next: "",
    previous: "",
  });
  const [list, setList] = useState([]);
  const getData = async (url) => {
    try {
      let res = await privateAxios.get(
        `/admin/teacher/requests?approved=false&${url}`
      );

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
  useEffect(() => {
    getData("page=1&limit=1");
  }, []);

  const acceptRequest = async (id) => {
    try {
      await privateAxios.put(`/admin/teacher/approve/${id}`);
      setList(list.filter((e) => e.userId !== id));
      toast.success(`Approved successfully!`, {
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

  const declineRequest = async (id) => {
    try {
      await privateAxios.put(`/admin/teacher/decline/${id}`);
      setList(list.filter((e) => e.userId !== id));
      toast.success(`Declined successfully!`, {
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
              <h5 className="card-title">Teachers</h5>
              {/* <button
                className="btn btn-primary mr-5"
                onClick={() => newCategory()}
              >
                <i
                  className="fa fa-fw"
                  aria-hidden="true"
                  title="Copy to use plus"
                >
                  
                </i>
                Yeni Kateqoriya
              </button> */}
            </div>
            <table className="mb-0 table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Note</th>
                  <th>Date</th>
                  <th style={{ textAlign: "center" }}>
                    <i className="pe-7s-edit"> </i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, key) => (
                  <tr key={item?.userId}>
                    <th scope="row">{key + 1}</th>

                    <td>{item?.name} </td>
                    <td>{item?.surname} </td>
                    <td>{item?.note} </td>
                    <td>
                      <TimePassedComponent datetime={item?.sendDate} />
                    </td>
                    <td style={{ width: "20%", textAlign: "center" }}>
                      <div
                        role="group"
                        className="btn-group"
                        data-toggle="buttons"
                      >
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => declineRequest(item?.userId)}
                        >
                          <i
                            className="fa fa-fw"
                            aria-hidden="true"
                            title="Copy to use cancel"
                          >
                            
                          </i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => acceptRequest(item?.userId)}
                        >
                          <i
                            className="fa fa-fw"
                            aria-hidden="true"
                            title="Copy to use check"
                          >
                            
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
    </Layout>
  );
}

export default TeacherRequests;
