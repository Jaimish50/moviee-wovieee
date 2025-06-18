import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";

export default function RecommendationBar({
  similar,
  rec,
  media_type,
  isAnime,
}) {
  const navigate = useNavigate();
  const [val, setVal] = useState("");
  const handleOnClickMovieCard = (event) => {
    const id = event.currentTarget.id;
    navigate(`/${media_type}/${id}`);
  };

  const handleOnChange = (event) => {
    setVal(event.target.value);
  };

  const handleOnSubmit = (event) => {
    navigate(`/search?query=${val}`);
    setVal("");
  };

  return (
    <Container>
      <div className="right-edge-glow" />
      <h2>Recommendation Bar</h2>
      <div className="searchbar">
        <div className="search-input">
          <input
            type="text"
            value={val}
            onChange={handleOnChange}
            placeholder="Search for movies"
          />
          <button onClick={handleOnSubmit}>Search</button>
        </div>
      </div>
      <div className="movies">
        {isAnime ? (
          <h2>Similar Anime</h2>
        ) : media_type === "movie" ? (
          <h2>Similar Movies</h2>
        ) : (
          media_type === "tv" && <h2>Similar Shows</h2>
        )}
        <div className="similar-section">
          <div className="card-section">
            {similar.map((sm, index) => (
              <>
                <div
                  className="card"
                  key={index}
                  id={sm.id}
                  onClick={handleOnClickMovieCard}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${sm.poster_path}`}
                    alt={sm.title}
                  />
                  <h4>{sm.title}</h4>
                </div>
              </>
            ))}
          </div>
        </div>
        {isAnime ? (
          <h2>Recommend Anime</h2>
        ) : media_type === "movie" ? (
          <h2>Recommend Movies</h2>
        ) : (
          media_type === "tv" && <h2>Recommend Shows</h2>
        )}
        <div className="recommended-section">
          <div className="card-section">
            {rec.map((rc, index) => (
              <>
                <div
                  className="card"
                  key={index}
                  id={rc.id}
                  onClick={handleOnClickMovieCard}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${rc.poster_path}`}
                    alt={rc.title}
                  />
                  <h4>{rc.title}</h4>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
    color: #5D9CEC;
    background-color: #0C0A12;
    width: 23vw;
    border-radius: 0 12px 12px 0;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    // border: 3px solid white;

    @media (max-width: 768px){
        width: 99vw;
        height: 100vh; 
        border-radius: 0;
    }
.right-edge-glow {
  position: absolute;
  top: 0;
  right: 23vw;
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, rgba(139, 92, 246, 0.2), rgba(245, 100, 248, 0.2), rgba(139, 92, 246, 0.2), white);
}
    h2{
        margin-left: 15px;
        font-size: 1.2rem;
        font-weight: 700;
        color: #5d9cec;
        height: 5vh;
        width: 100%;
        // border: 1px solid yellow;
        display: flex;
        align-items: center;
        // font-family:'Trebuchet MS, sans-serif';
        
    }
    .searchbar{
        padding: 10px;
        width: 100%;
        // border: 1px solid yellow;
        
        .search-input{
            margin-right: 5px;
            display: flex;
            width:100%;
            // border: 2px solid pink;
            input{
                width: 80%;
                padding: 12px;
                border: none;
                border-radius: 16px 0 0 16px;
                background-color: #13111C;
                color: #A4D7E1;
                font-size: 1.2rem;
            }
                button{
                display: flex;
                justify-content: center;
                align-items: center;
                    padding: 12px;
                    width: 15%;
                    border: none;
                    border-radius:0 16px 16px 0;
                    background-color: #5D9CEC;
                    color: #0C0A12;
                    font-size: 0.7rem;
                    margin-left: 10px;
                    cursor: pointer;
                }
        }
    }

    .similar-section,
    .recommended-section{
        overflow-x: hidden;
        // margin-top: 10px;
        height: 41vh;
        width: 100%;
        scrollbar-width: none;
        
        // border: 3px solid green;
        // h2{
            margin-left: 10px;
        }
        .card-section{
            margin-left: 10px;
            height: 100%;
            width: 94%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: none;
            // border: 7px solid blue;
            .card{
                height: 60%;
                width: 42%;
                curser: pointer;
                transition: transform 0.3s;
                // border: 2px solid white;
                margin-bottom: 8px;
                color: white;
                &:hover {
                    transform: scale(1.05);
                }
                img{
                    width: 100%;
                    height: 87%;
                    object-fit: cover;
                    border-radius: 8px;
                }
                h4{
                    height: 13%;
                    width: 100%;
                    font-size: 1rem;
                    text-align: center;
                    font-weight: 450;
                    // border: 1px solid pink;
                    overflow: hidden;
                }
            }
        }
    }
`;
