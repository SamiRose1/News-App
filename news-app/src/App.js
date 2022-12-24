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
          return {
            ...searchInput,
            searchInput: action.payload,
            inputName: action.inputName,
            id: 8,
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
    inputName: "newsSearch",
    searchInput: {
      newsSearch: "",
      weatherSearch: "",
    },
  },
];

function App() {
  const [state, dispatch] = useReducer(reduce, defaultState);
  const navigate = useNavigate();

  const [
    //destrucutred the state here for easy use
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
    //so I made a whole function to handle just the header responsiveness, yeah I'm bad but it works just fine
    dispatch({
      type: "HEADERRESPONE",
      payload: headerResponse.headerResponse, //this is a bolean value
      id: 5,
    });
    if (headerResponse.headerResponse) {
      //if false we are removing it so headerResponse.headerRespone comes as false by default
      document.querySelector(".headerContainer").classList.remove("expand"); //expand does something in the css file. Note. it doesn't come by default, it's added here and removed here. the same follows for align. Code below
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

  useEffect(() => {
    //on first load the input on the header should default it's name to newsSearch since the first page is the news page
    document.querySelector(".input").setAttribute("name", "newsSearch");
    navigate("/");
  }, []);
  useEffect(() => {
    // this is fetching the news data
    const fetchNews = async () => {
      try {
        let response = await fetch(
          `https://gnews.io/api/v4/${defaultNews.defaultNews}token={your api key}&lang=en`
        );
        let data = await response.json();
        if (data.length <= 1) {
          alert("not found");
        }
        return dispatch({
          type: "NEWSDATA",
          payload: data.articles?.slice(0, 10), //is setting the array length to be 10 but even by default it's 10 but being explicit is good
          id: 1,
        });
      } catch (err) {
        console.log(err); //you know what this does
      }
    };
    // fetchNews();

    // for headlines https://gnews.io/api/v4/top-headlines?token={your api key}&lang=en

    //to search https://gnews.io/api/v4/search?q=russia&token={your api key}&lang=en
    ////////////////////////////////////

    // fetching weather data

    // got the api from rapidApi.com that's why the it has this options thing
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "your api key",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    const fetchWeatherData = async () => {
      // the weatherCity.weatherCity  by default is Edmonton, Canada since I'm not requesting for the user's location dynamically and that's because the free trial doesn't include getting lats and longs but it's request limit free.
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
        alert("connection timeout, please refresh!"); //yeah incase of an error you can reload
      }
    };

    // fetchWeatherData();
    //this will update the apis coz when news or weather is searched we need to to refresh the requests with the user's input.
  }, [defaultNews.defaultNews, weatherCity.weatherCity]);

  //fetch the data for both news and weather
  //done
  //set the pagination
  //done

  //pagination for news starts here
  const newsPerPage = 6; //this is explicit enough but just incase, I needed the page to display not more than 6 containers
  const pagesVisited = pageNumber.pageNumber * newsPerPage;

  // this is conditionally rendering
  const displayNews = newsData.newsData
    ? newsData.newsData
        .slice(pagesVisited, pagesVisited + newsPerPage)
        .map((article) => {
          return (
            // the substr() is a string method that sets limit to the characters, like not more that 50 letters or maybe 150
            <div
              className="newsArticle"
              key={Math.floor(
                Math.random() * new Date().getUTCMilliseconds().toString()
              )}
            >
              <h3 className="title">{article.title.substr(0, 50)}...</h3>
              <img src={article.image} alt="" />
              <h2 className="description">
                {article.description.substr(0, 100)}...
              </h2>
              <h3 className="content">
                {article.content.substr(0, 250)}...
                <a href={article.source.url} target="_blank" className="link">
                  Read more
                </a>
                <p className="source">{article.source.name}</p>
              </h3>
            </div>
          );
        })
    : alert("Please refresh, if it presits, try again in a few minutes");

  const pageCount = Math.ceil(newsData?.newsData?.length / newsPerPage);
  const changePage = ({ selected }) => {
    // this sets the selected page you want to go to and sets it to that, like from 1 to 2
    dispatch({ type: "PAGENUMBER", payload: selected, id: 6 });
  };

  ///pagination stops here

  //////////////

  //display the data for the news
  // fetchData();
  //handling search inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Developers...ya'll know how this goes but just incase you don't let me tell you, I'm using one input for two values under the object labeled searchInput, it has newsSearch which is for searching the news and it has weatherSearch which would be you guessed it, for the news.
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

    //the search input also has a varailbe called inputName, it can only have one of the two values, either newsSearch or weatherSearch
    if (searchInput.inputName === "weatherSearch") {
      // you know how the rest goes
      dispatch({
        type: "WEATHERCITY",
        payload: searchInput.searchInput.weatherSearch,
        id: 3,
      });
    }
    if (searchInput.inputName === "newsSearch") {
      // for the newsSearch, it's like this because I didn't want to use a third api, else the apis I fetch would be, 1: for the news headlines, 2: for the user's input, 3: for the weather api. Note, the variable defaultNews by default is headlines so that the api fetches for it on first load.
      dispatch({
        type: "DEFAULTNEWS",
        payload: `search?q=${searchInput.searchInput.newsSearch}&`,
        id: 4,
      });
    }
    dispatch({
      type: "SEARCHINPUT",
      payload: {
        newsSearch: "",
        weatherSearch: "",
      },
      inputName: "weatherSearch",
      id: 8,
    });
  };
  const handleHeaderLinkClick = (e) => {
    const name = e.target.className;
    //this sets the input's name depending on which link was clicked, remeber I'm using one input for two
    if (name.includes("newsLink")) {
      //if the clicked link is for the news then the input's name at the header will be set to newsSearch, same goes for the weatherSearch
      document.querySelector(".input").setAttribute("name", "newsSearch");
    }
    if (name.includes("weatherLink")) {
      document.querySelector(".input").setAttribute("name", "weatherSearch");
    }
  };
  let inputValue;
  if (searchInput.inputName === "weatherSearch") {
    inputValue = searchInput.searchInput.weatherSearch;
  } else if (searchInput.inputName === "newsSearch") {
    inputValue = searchInput.searchInput.newsSearch;
  } else {
    inputValue = searchInput.searchInput.newsSearch;
    alert("check the input value");
  }
  return (
    <div className="App">
      {/* I'll make sure to use the useContext hook next time, on this project I wanted to practice more on the useReducer hook since I recently learnt it */}
      <Header
        handleHeaderLinkClick={handleHeaderLinkClick}
        inputName={inputName.inputName}
        searchInput={searchInput}
        inputValue={inputValue}
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

//started about 12/20/2022
// took me time because I had to switch about 8 useState() hooks to useReducer which brought new bugs and had to work on them
// completed on 12/24/2022
