import { createContext, useState } from 'react';
import './App.css';
import Banner from './components/Banner';
import Nav from './components/Nav';
import requests from './components/Requests';
import Row from './components/Row';
import SearchedRow from './components/SearchedRow';
export const SearchContext = createContext([]);

function App() {

  const [searchedData, setSearchedData] = useState([]);

  return (
    <SearchContext.Provider value = {[searchedData, setSearchedData]}>
      <div className="app">
        <Nav />
        <Banner />
        {
          searchedData.length === 0 ?
            <>
              <Row
                title="NETFLIX ORIGINALS"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
              />
              <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
              <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
              <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
              <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
              <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
              <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
              <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
              <Row title="Documentary" fetchUrl={requests.fetchDocumentaries} />
            </>
            :
            <SearchedRow title="Search Results" searchedData={searchedData} isLargeRow/>
        }
      </div>
    </SearchContext.Provider>
  );
}

export default App;
