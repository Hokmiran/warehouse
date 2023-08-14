import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { privateAxios } from "../../utils/privateAxios";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";

function Teachers() {
  const [pagination, setPagination] = useState({
    pageNo: 1,
    totalPages: 1,
    next: "",
    previous: "",
  });
  const [list, setList] = useState([]);
  const getData = async (url) => {
    try {
      let res = await privateAxios.get(`/teacher/getAll?${url}`);

      setList(res.data.data.data);
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
    getData("page=1&limit=10");
  }, []);
  return (
    <Layout>
      <div>
        <div className="main-card mb-3 card">
          <div className="card-body">
            <div className="w-100 d-flex justify-content-between mb-3">
              <h5 className="card-title">Teachers</h5>
            </div>
            <table className="mb-0 table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th style={{ textAlign: "center" }}>
                    <i className="pe-7s-edit"> </i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, key) => (
                  <tr key={item?.id}>
                    <th scope="row">{key + 1}</th>
                    <td>
                      <img
                        src={item?.picture}
                        alt={item?.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{item?.name} </td>
                    <td>{item?.surname} </td>
                    <td style={{ width: "20%", textAlign: "center" }}>
                      <div
                        role="group"
                        className="btn-group"
                        data-toggle="buttons"
                      >
                        <Link
                          to={`/teachers/${item?.id}/edit`}
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

export default Teachers;
