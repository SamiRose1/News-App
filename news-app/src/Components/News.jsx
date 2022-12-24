import React from "react";
import ReactPaginate from "react-paginate";

const News = ({ pageCount, changePage, displayNews }) => {
  // displayNews is another container I probably shouldn't put in another div, we'll refactor someday inshaAllah
  return (
    <article className="newsContainer">
      <div className="news">{displayNews}</div>
      {/* I used ReactPaginate library for pagination */}
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
