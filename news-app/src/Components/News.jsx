import React from "react";
import ReactPaginate from "react-paginate";

const News = ({ pageCount, changePage, displayNews }) => {
  return (
    <article className="newsContainer">
      <div className="news">{displayNews}</div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBtns"}
        previousLinkClassName={"prevBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </article>
  );
};

export default News;
