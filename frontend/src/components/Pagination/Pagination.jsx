import React, { useEffect, useState } from "react";

function Pagination({ pagination, setData, limit }) {
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    if (pagination.next) {
      const url = new URL(pagination.next);
      const searchParams = url.searchParams;
      const page = searchParams.get("page");
      setNext(page);
    } else {
      setNext(null);
    }

    if (pagination.previous) {
      const url = new URL(pagination.previous);
      const searchParams = url.searchParams;
      const page = searchParams.get("page");
      setPrevious(page);
    } else {
      setPrevious(null);
    }
  }, [pagination]);

  const setPage = (page) => {
    if (!page) return;
    setData(`page=${page}&limit=${limit}`);
  };

  const renderPageNumbers = () => {
    const totalPages = pagination.totalPages;
    const currentPage = pagination.pageNo;
    const pageNumbers = [];

    pageNumbers.push(
      <li
        key={1}
        className={currentPage === 1 ? "active" : ""}
        onClick={() => setPage(1)}
      >
        <span>1</span>
      </li>
    );

    if (totalPages > 5 && currentPage > 3) {
      pageNumbers.push(
        <li key="dots" className="disabled">
          <span>...</span>
        </li>
      );
    }

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(
          <li
            key={i}
            className={currentPage === i ? "active" : ""}
            onClick={() => setPage(i)}
          >
            <span>{i}</span>
          </li>
        );
      }
    }

    if (totalPages > 5 && currentPage < totalPages - 2) {
      pageNumbers.push(
        <li key="dots" className="disabled">
          <span>...</span>
        </li>
      );
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <li
          key={totalPages}
          className={currentPage === totalPages ? "active" : ""}
          onClick={() => setPage(totalPages)}
        >
          <span>{totalPages}</span>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="row">
      <div className="col-lg-12 mt--60">
        <nav>
          <ul className="rbt-pagination">
            <li
              className={previous ? "" : "disabled"}
              onClick={() => setPage(previous)}
            >
              <span aria-label="Previous">
                <i className="feather-chevron-left"></i>
              </span>
            </li>
            {renderPageNumbers()}
            <li
              className={next ? "" : "disabled"}
              onClick={() => setPage(next)}
            >
              <span aria-label="Next">
                <i className="feather-chevron-right"></i>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
