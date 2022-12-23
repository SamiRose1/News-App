import "./App.css";
import Header from "./Components/Header";
import News from "./Components/News";
import Weather from "./Components/Weather";
import Footer from "./Components/Footer";
import Expand from "./Components/expand.png";
import Cancel from "./Components/cancel.png";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useReducer, useEffect } from "react";

const reduce = (state, action) => {
  switch (action.type) {
    case "NEWSDATA":
      return state.map((news) => {
        if (news.id === action.id) {
          return { ...news, newsData: action.payload };
        }
        return news;
      });
    case "WEATHERDATA":
      return state.map((weather) => {
        if (weather.id === action.id) {
          return { ...weather, weatherData: action.payload };
        }
        return weather;
      });

    case "WEATHERCITY":
      return state.map((weatherC) => {
        if (weatherC.id === action.id) {
          return { ...weatherC, weatherCity: action.payload };
        }
        return weatherC;
      });
    case "DEFAULTNEWS":
      return state.map((defaultNews) => {
        if (defaultNews.id === action.id) {
          return { ...defaultNews, defaultNews: action.payload };
        }
        return defaultNews;
      });
    case "HEADERRESPONE":
      return state.map((headerResponse) => {
        if (headerResponse.id === action.id) {
          return {
            ...headerResponse,
            headerResponse: (action.payload = !action.payload),
            icon: action.payload ? Cancel : Expand,
          };
        }
        return headerResponse;
      });
    case "PAGENUMBER":
      return state.map((pageNumber) => {
        if (pageNumber.id === action.id) {
          return { ...pageNumber, pageNumber: action.payload };
        }
        return pageNumber;
      });

    case "INPUTNAME":
      return state.map((inputName) => {
        if (inputName.id === action.id) {
          return { ...inputName, inputName: action.payload };
        }
        return inputName;
      });
    case "SEARCHINPUT":
      return state.map((searchInput) => {
        if (searchInput.id === action.id) {
          let inputName = action.inputName;
          return {
            ...searchInput,
            searchInput: action.payload,
            inputName: action.inputName,
          };
        }
        return searchInput;
      });
    default:
      return state;
  }
};
const defaultState = [
  {
    id: 1,
    newsData: [],
  },
  {
    id: 2,
    weatherData: [],
  },
  {
    id: 3,
    weatherCity: "edmonton",
  },
  {
    id: 4,
    defaultNews: "top-headlines?",
  },
  {
    id: 5,
    headerResponse: false,
    icon: Expand,
  },
  {
    id: 6,
    pageNumber: 0,
  },
  {
    id: 7,
    inputName: "",
  },
  {
    id: 8,
    searchInput: {
      newsSearch: "",
      weatherSearch: "",
    },
  },
];

function App() {
  const [state, dispatch] = useReducer(reduce, defaultState);
  const [
    newsData,
    weatherData,
    weatherCity,
    defaultNews,
    headerResponse,
    pageNumber,
    inputName,
    searchInput,
  ] = state;

  const handleResponse = () => {
    dispatch({
      type: "HEADERRESPONE",
      payload: headerResponse.headerResponse,
      id: 5,
    });
    if (headerResponse.headerResponse) {
      document.querySelector(".headerContainer").classList.remove("expand");
      document.querySelector(".weatherLink").classList.remove("align");
      document.querySelector(".newsLink").classList.remove("align");
      document.querySelector(".form").classList.remove("align");
    } else if (!headerResponse.headerResponse) {
      document.querySelector(".weatherLink").classList.add("align");
      document.querySelector(".newsLink").classList.add("align");
      document.querySelector(".form")?.classList.add("align");
      document.querySelector(".headerContainer").classList.add("expand");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector(".input").setAttribute("name", "newsSearch");
    navigate("/");
  }, []);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        let response = await fetch(
          `https://gnews.io/api/v4/${defaultNews.defaultNews}token=fcb3d604f8dd7d68bdc2bd6e460d0f28&lang=en`
        );
        let data = await response.json();
        return dispatch({
          type: "NEWSDATA",
          payload: data.articles?.slice(0, 10),
          id: 1,
        });
      } catch (err) {
        console.log(err);
      }
      // const api = await fetch(
      //   `https://gnews.io/api/v4/${defaultNews.defaultNews}token=fcb3d604f8dd7d68bdc2bd6e460d0f28&lang=en`
      // );
      // const parse = await api.json();
      // if (parse) {
      //   console.log(parse);
      //   dispatch({
      //     type: "NEWSDATA",
      //     payload: parse?.articles?.slice(0, 10),
      //     id: 1,
      //   });
      // } else {
      //   console.log("still loading");
      // }
    };
    // fetchNews();

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
    const fetchWeatherData = async () => {
      try {
        let response = await fetch(
          `https://weatherapi-com.p.rapidapi.com/current.json?q=${weatherCity.weatherCity}`,
          options
        );
        let data = await response.json();
        return dispatch({
          type: "WEATHERDATA",
          payload: data,
          id: 2,
        });
      } catch (err) {
        console.err(err);
        alert("connection timeout, please refresh!");
      }
    };

    fetchWeatherData();
  }, [defaultNews.defaultNews, weatherCity.weatherCity]);

  //fetch the data for both news and weather
  //done
  //set the pagination
  //done
  //pagination for news starts here
  const newsPerPage = 6;
  const pagesVisited = pageNumber.pageNumber * newsPerPage;
  const displayNews = newsData.newsData
    ? newsData.newsData
        .slice(pagesVisited, pagesVisited + newsPerPage)
        .map((article) => {
          return (
            <div className="newsArticle">
              <h3 className="title" key={new Date().getMilliseconds()}>
                {article.title.substr(0, 50)}...
              </h3>
              <img src={article.image} alt="" />
              <h2 className="description">
                {article.description.substr(0, 150)}...
              </h2>
              <h3 className="content">{article.content.substr(0, 400)}...</h3>
              <p>{article.source.name}</p>
              <a href={article.source.url}>{article.source.url}</a>
            </div>
          );
        })
    : console.log("not working");

  const pageCount = Math.ceil(newsData?.newsData?.length / newsPerPage);
  const changePage = ({ selected }) => {
    dispatch({ type: "PAGENUMBER", payload: selected, id: 6 });
  };

  ///pagination stops here

  //////////////

  //display the data for the news
  // fetchData();
  //handling search inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "SEARCHINPUT",
      payload: {
        [name]: value,
      },
      inputName: name,
      id: 8,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.inputName === "weatherSearch") {
      dispatch({
        type: "WEATHERCITY",
        payload: searchInput.searchInput.weatherSearch,
        id: 3,
      });
    }
    if (searchInput.inputName === "newsSearch") {
      dispatch({
        type: "DEFAULTNEWS",
        payload: `search?q=${searchInput.searchInput.newsSearch}&`,
        id: 4,
      });
    }
  };
  const handleHeaderLinkClick = (e) => {
    const name = e.target.className;
    if (name.includes("newsLink")) {
      document.querySelector(".input").setAttribute("name", "newsSearch");
    }
    if (name.includes("weatherLink")) {
      document.querySelector(".input").setAttribute("name", "weatherSearch");
    }
  };

  return (
    <div className="App">
      <Header
        handleHeaderLinkClick={handleHeaderLinkClick}
        inputName={inputName.inputName}
        searchInput={searchInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        headerResponse={headerResponse.headerResponse}
        icon={headerResponse.icon}
        handleResponse={handleResponse}
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
          element={<Weather weatherData={weatherData.weatherData} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
