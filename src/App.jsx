import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
// const axios = require('axios').default;

function App() {
  const [data, setdata] = useState([]);
  const [query, setquery] = useState("");
  const [isLoading, setisLoading] = useState(false);

  
  useEffect(()=>{
    function getTrendingNews(){
      const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news/',
        params: {textFormat: 'Raw', safeSearch: 'Off'},
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': 'e207f6fbf8msh5ffbfaef8d8725cp1881a9jsn2bbf38331eb2',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
        setdata(response.data.value)
      }).catch(function (error) {
        console.error(error);
      }, []);

    }
    getTrendingNews();
  })


  const getNews=(e) => {
    e.preventDefault();
    // const axios = require("axios");

    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: { q: query, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': 'e207f6fbf8msh5ffbfaef8d8725cp1881a9jsn2bbf38331eb2',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };
    setisLoading(true)
    axios.request(options).then(function (response) {
      setisLoading(false)
      console.log(response.data.value);
      setdata(response.data.value)
    }).catch(function (error) {
      setisLoading(false)
      console.error(error);
    });
  }

  return (
    <>
      <form onSubmit={getNews}>
        <input type="text" placeholder='Search News' onChange={(e)=>{setquery(e.target.value)}}></input>
        <button type='submit'>Search</button>
      </form>
      <div>{
        (isLoading) ? "Loading..." : ""}
        {data.map(eachPost => (<div className='post' key={eachPost.name}>
          <h1>
            {eachPost?.name}  
          </h1>
          <span>{moment(eachPost?.datePublished).format('Do MMMM YYYY, h:mm:ss a')}</span>
          <h3>
            {eachPost?.description}
          </h3>
          <a href={eachPost?.url} target="_blank">See More</a>
          <img src={eachPost?.image?.thumbnail?.contentUrl.replace("&pid=News", "").replace("pid=News&", "").replace("pid=News", "")} alt="" />
        </div>))
      }</div>


    </>
  );
}

export default App;
