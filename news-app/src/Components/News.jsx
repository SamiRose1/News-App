import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const News = ({ newsData }) => {
  console.log(newsData);
  const { totalArticles, articles } = newsData[0];
  console.log(articles);
  const [users, setUsers] = useState(articles.slice(0, 10));
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <div className="user">
          <h3>{user.title}</h3>
          <h3>{user.description}</h3>
          <h3>{user.url}</h3>
        </div>
      );
    });
  console.log(users);
  const pageCount = Math.ceil(users.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <article className="newsContainer">
      <div className="news">
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
      </div>
    </article>
  );
};

export default News;
