import React, { useState } from 'react'
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function SearchedRow({title, searchedData,isLargeRow }) {

    const [trailerUrl, setTrailerUrl] = useState("");
    
    const opts = {
        height: "390",
        width : "100%",
        playerVars: {
            autoplay:1,
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        }
        else{
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error))
        }
    };

    return (
        <div className="row" style={{height:"50vh"}}>
            <h2>{title}</h2>

            <div className="row_posters">
                {/* Row Posters */}
                {searchedData.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {/* container -> posters */}
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}

        </div>
    )
}

export default SearchedRow