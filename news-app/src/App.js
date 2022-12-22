import "./App.css";
import Header from "./Components/Header";
import News from "./Components/News";
import Weather from "./Components/Weather";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useState, useReducer, useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";

const reduce = (state, action) => {
  switch (action.type) {
    case "NEWSDATA":
      return [state, { newsData: action.payload }];
    case "WEATHERDATA":
      return [...state, { weatherData: action.payload }];

    case "WEATHERCITY":
      return [state, { weatherCity: action.payload }];
    case "DEFAULTNEWS":
      return [...state, { defaultNews: action.payload }];
    case "HEADERRESPONE":
      return [...state, { headerResponse: action.payload }];
    case "PAGENUMBER":
      return [...state, { pageNumber: action.payload }];
    case "INPUTNAME":
      return [...state, { inputName: action.payload }];
    case "SEARCHINPUT":
      return [...state, { pageCount: action.payload }];
    default:
      break;
  }
};

function App() {
  const [newsData, setNewsData] = useState([]);
  const [weatherData, setweatherData] = useState([]);
  const [weatherCity, setWeatherCity] = useState("edmonton");
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState({
    newsSearch: "",
    weatherSearch: "",
  });
  useEffect(() => {
    document.querySelector(".input").setAttribute("name", "newsSearch");
    navigate("/");
  }, []);
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

    // fetchNews();
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
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${state.weatherCity}`,
      options
    )
      .then((response) => response.json())
      .then((response) => dispatch({ type: "WEATHERDATA", payload: response }))
      .catch((err) => console.error(err));
  }, [weatherCity]);

  //fetch the data for both news and weather
  //done
  //set the pagination
  //done
  //pagination for news starts here
  const [pageNumber, setPageNumber] = useState(0);
  const newsPerPage = 5;
  const pagesVisited = pageNumber * newsPerPage;
  const displayNews = state.newsData
    ? state.newsData
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
    dispatch({ type: "PAGENUMBER", payload: selected });
    setPageNumber(selected);
  };

  ///pagination stops here

  //////////////

  //display the data for the news
  // fetchData();
  //mapping the weather data below
  let current, location;
  console.log(state);
  if (state?.weatherData?.length !== 0) {
    current = weatherData.current;
    location = weatherData.location;
  }
  //handling search inputs
  let inputName;
  const handleChange = (e) => {
    const { name, value } = e.target;
    inputName = name;
    setSearchInput(() => {
      return {
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.weatherSearch) {
      setWeatherCity(searchInput.weatherSearch);
    }
    if (searchInput.newsSearch) {
      console.log("handle news search");
    }
    dispatch({
      type: "SEARCHINPUT",
      payload: {
        newsSearch: "",
        weatherSearch: "",
      },
    });
    setSearchInput(() => {
      return {
        newsSearch: "",
        weatherSearch: "",
      };
    });
  };
  const handleHeaderLinkClick = (e) => {
    switch (e.target.className) {
      case "newsLink":
        console.log("newsLink");
        document.querySelector(".input").setAttribute("name", "newsSearch");
        console.log(document.querySelector(".input"));

        break;
      case "weatherLink":
        console.log("weatherLink");
        document.querySelector(".input").setAttribute("name", "weatherSearch");
        console.log(document.querySelector(".input"));
      default:
        break;
    }
  };

  return (
    <div className="App">
      <Header
        handleHeaderLinkClick={handleHeaderLinkClick}
        searchInput={state.newsSearch}
        setSearchInput={state.searchInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Routes>
        <Route
          path="/"
          element={
            <News
              pageCount={pageCount}
              changePage={changePage}
              displayNews={displayNews}
            />
          }
        />
        <Route
          path="news/weather"
          element={
            <Weather
              weatherData={state.weatherData}
              location={location}
              current={current}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
