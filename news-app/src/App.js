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
      if (api) {
        return setNewsData([parse]);
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
  //fetch the data for both news and weather
  //done
  //set the pagination
  let articles;

  const [news, setNews] = useState(articles);
  useEffect(() => {
    if (newsData.length !== 0) {
      console.log(newsData);
      articles = newsData[0].articles;
      console.log(articles);
    }
  }, [newsData]);

  //display the data for the news
  // fetchData();
  console.log(newsData);

  return (
    <div className="App">
      <Header />
      {/* <News newsData={newsData} /> */}
    </div>
  );
}

export default App;
