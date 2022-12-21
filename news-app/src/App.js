import "./App.css";
import Header from "./Components/Header";
import News from "./Components/News";
import ReactPaginate from "react-paginate";
import { useState, useReducer, useRef, useEffect } from "react";

function App() {
  const [newsData, setNewsData] = useState([]);
  const [weatherData, setweatherData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const api = await fetch(
        "https://gnews.io/api/v4/top-headlines?token=fcb3d604f8dd7d68bdc2bd6e460d0f28&lang=en"
      );
      const parse = await api.json();
      if (parse) {
        setNewsData(parse?.articles?.slice(0, 6));
      } else {
        console.log("still loading");
      }
    };

    fetchNews();
    // api key for Gnews fcb3d604f8dd7d68bdc2bd6e460d0f28
    // for headlines https://gnews.io/api/v4/top-headlines?token=fcb3d604f8dd7d68bdc2bd6e460d0f28&lang=en
    //to search https://gnews.io/api/v4/search?q=russia&token=fcb3d604f8dd7d68bdc2bd6e460d0f28&lang=en
    ////////////////////////////////////

    // fetching weather data
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "1d07dcf1a7mshd340d7d196c25a9p12a4b4jsn24eff67cfc99",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    fetch(
      "https://weatherapi-com.p.rapidapi.com/current.json?q=kampala",
      options
    )
      .then((response) => response.json())
      .then((response) => setweatherData([response]))
      .catch((err) => console.error(err));
  }, []);

  console.log(newsData);
  //fetch the data for both news and weather
  //done
  //set the pagination

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const newsPerPage = 5;
  const pagesVisited = pageNumber * newsPerPage;
  console.log(newsData);
  const displayNews = newsData
    ? newsData
        .slice(pagesVisited, pagesVisited + newsPerPage)
        .map((article) => {
          return (
            <div className="newsArticle">
              <h3 className="title" key={new Date().getMilliseconds()}>
                {article.title}
              </h3>
              <img src={article.image} alt="" />
              <h2 className="description">{article.description}</h2>
              <p>{article.source.name}</p>
              <p>{article.source.url}</p>
            </div>
          );
        })
    : console.log("not working");

  const pageCount = Math.ceil(newsData?.length / newsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  ///pagination stops here

  //////////////

  //display the data for the news
  // fetchData();

  return (
    <div className="App">
      <Header />
      <News
        newsData={newsData}
        pageCount={pageCount}
        changePage={changePage}
        displayNews={displayNews}
      />
    </div>
  );
}

export default App;
