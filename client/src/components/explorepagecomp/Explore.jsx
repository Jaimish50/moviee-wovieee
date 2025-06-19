import React,{ useState,useEffect, useCallback } from "react";
import styled from "styled-components";
import Content from "./Content";
import axios from 'axios';
import _, { set } from "lodash";

export default function Explore({rating, length, sort, genres, ac, setAc, active, setActive, isOn, setIsOn }) {
    const [movieData, setMovieData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    
    const fetchMovieData = async () => {
      const backendURL = process.env.REACT_APP_BACKEND_URL;
        setLoading(true);
        try {
            const response = await axios.get(`${backendURL}/explore`, {
                params: {
                    sort,
                    genres: genres.join(","),
                    media_type: active,
                    isAnime: ac === 2,
                    page,
                    length,
                    rating
                }
            });
            const data = response.data;
            
            console.log("length "+length);

            setTotalPages(data.totalPages);
            
            setMovieData(data.data
            
          );
            
        }catch (error) {
            console.error("Error fetching movie data:", error);
            setError("Failed to load data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    console.log("explore" + length);

    useEffect(() => {
        fetchMovieData();
        
    }, [sort, genres, active, ac, page, length, rating]);

    useEffect(() => {
      console.log(movieData);
    },[movieData]);

    useEffect(() => {
        setMovieData([]);
        setPage(1);
    }, [sort, genres, active, ac]);

    const handleNavClick = (mediaType, acValue) => {
        setActive(mediaType);
        setAc(acValue);
    };

    const navItems = [
        { label: "Shows", mediaType: "tv", acValue: 0 },
        { label: "Movies", mediaType: "movie", acValue: 1 },
        { label: "Anime", mediaType: "tv", acValue: 2 }
    ];

    const handleToggleButton = () => {
       setIsOn((prev) => !prev);
    }

    return (
        <Container>
            <div className="navbar">
                {navItems.map(({ label, mediaType, acValue }) => (
                    <div
                        key={acValue}
                        id={acValue}
                        className={`nav-item ${ac === acValue ? "clicked" : ""}`}
                        onClick={() => handleNavClick(mediaType, acValue)}
                    >
                        {label}
                    </div>
                ))}
                <div className="toggle-button" onClick={handleToggleButton}>
                    {isOn ?  "➡️" : "⬅️"}
                </div>
            </div>
            <div className="content">
              
                <Content data={movieData} totalPages={totalPages} media_type={active} loading={loading} currentPage={page} setCurrentPage={setPage}/>
                
            </div>
            
        </Container>
    );
}

const Container = styled.div`
  border-radius: 5px;
  background-color: #0C0A12;
  color: #5D9CEC;
  width: 59vw;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;

  /* Mobile Styles */
  @media (max-width: 768px) {
    width: 100vw;
    font-size: 0.9rem;
    margin-left: 0rem;
  }

  .navbar {
    position: sticky;
    top: 0;
    height: 7vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid grey;
    font-size: 1.3rem;
    font-weight: 500;
    font-family:'Trebuchet MS, sans-serif';
    color: #5D9CEC;
    z-index: 10;
    background-color: #13111C;

    @media (max-width: 768px) {
      height: 3rem; /* Increased height for better touch area on mobile */
      font-size: 1rem;
      padding: 0 0.5rem; /* Padding for mobile layout */
      width: 100vw;
    }

    /* Responsive layout for navbar */
    @media (max-width: 768px) {
      font-size: 1.1rem; 
      height: 2.5rem;
      width: 100vw;
      
    }

    @media (max-width: 480px) {
      font-size: 1rem; 
      width: 100vw;
      height: 2.5rem;
      
    }

    .nav-item {
      width: 33.333%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 0.375rem;

      @media (max-width: 768px) {
        font-size: 0.9rem; /* Adjust font size for mobile */
        font-weight: 500;
      }
    }

    .nav-item:hover {
      box-shadow: inset 0 0 12px rgba(139, 92, 246, 0.2);
      opacity: 1;
      font-weight: 550;
    }

    .clicked {
      background-color: #1b1b1b;
      color: #5D9CEC;
      font-weight: 600;
      border-bottom: 2px solid #5D9CEC;
    }

    /* Toggle button appears only on mobile */
    .toggle-button {
      display: none;

      @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 33.33%;
        border-radius: 0.375rem;
        font-size: 0.9rem;
        padding: 0.5rem; /* Better touch area */
        background-color: #13111C;
        color: #5D9CEC;
        cursor: pointer;
        transition: box-shadow 0.3s ease;

        &:hover {
          box-shadow: inset 0 0 12px rgba(139, 92, 246, 0.2);
        }
      }
    }
  }
`;