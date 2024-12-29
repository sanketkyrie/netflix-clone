import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Nav.css"
import axios from 'axios';
import requests from './Requests';
import { SearchContext } from '../App';


function Nav() {
    const [show, handleShow] = useState(false);
    const [searchText, setSearchText] = useState("");
    const cancelTokenRef = useRef(null);
    const [searchedData, setSearchedData] = useContext(SearchContext)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", () => {
                if (window.scrollY > 100) {
                    handleShow(true);
                } else handleShow(false);
            });
        };
    }, []);

    const searchMovies = async (query) => {
        if (cancelTokenRef.current) {
            cancelTokenRef.current.cancel("Canceled previous request");
        }
        cancelTokenRef.current = axios.CancelToken.source();

        try {
            const res = await axios.get(`${requests.searchMovies}&query=${query}`, {
                cancelToken: cancelTokenRef.current.token,
            });
            setSearchedData(prevList => [...res.data.results]);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled:", error.message);
            } else {
                console.error("API error:", error);
            }
        }
    };

    const handleSearch = (event) => {
        console.log(event ,event.target.value)
        const query = event.target.value;
        setSearchText(query);
        if (query) {
            setTimeout(() => searchMovies(query), 2000); // Adding debounce
        }
        if(!query){
            setSearchedData(prevList => [...prevList.splice(0, prevList.length)]);
        }
    };

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img
                className="nav_logo"
                src={require(`./logo.png`)}
                alt="Netflix Logo"
            />
            <div className='nav_search'>
                <input className='search_bar' type='text' value={searchText} onChange={handleSearch} placeholder='search your movie' />
                <img
                    src={require(`./avatar.png`)}
                    alt="Netflix Avatar"
                />
            </div>
        </div>
    )
}

export default Nav
