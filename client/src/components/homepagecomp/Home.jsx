import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import MovieComp from './MovieComp';
import axios from 'axios';

export default function Home({isOn, setIsOn}){
    const [active,setActive] = useState("movie");
    const [activateCode, setActivateCode] = useState(0);
    const [trendyMovies, setTrendyMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [trendyShows, setTrendyShows] = useState([]);
    const [topShows, setTopShows] = useState([]);
    const [trendyAnime, setTrendyAnime] = useState([]);
    const [topAnime, setTopAnime] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    const [newShows, setNewShows] = useState([]);
    const [newAnime, setNewAnime] = useState([]);


    useEffect(() => {
        const fetchContent = async () => {
            try {
                const tdMovies = await axios.get("http://localhost:5000/movie/trending");
                setTrendyMovies(tdMovies.data);

                const nMovies = tdMovies.data.sort((a, b) => (new Date(b.release_date) - new Date(a.release_date)) || (b.rating - a.rating));
                const slicedMovies = nMovies.slice(0, 6);
                setNewMovies(slicedMovies);

                const tpMovies = await axios.get("http://localhost:5000/movie/top_rated");
                setTopMovies(tpMovies.data);

                const tdShows = await axios.get("http://localhost:5000/tv/trending");
                setTrendyShows(tdShows.data);

                const nShows = tdShows.data.sort((a,b) => b.first_air_date - a.first_air_date && b.rating - a.rating);
                setNewShows(nShows.slice(0,6));

                const tpShows = await axios.get("http://localhost:5000/tv/top_rated");
                setTopShows(tpShows.data);

                const tdAnime = tdShows.data.filter(show =>
                    show.language === 'ja' && show.genre_id.includes(16)
                );
                setTrendyAnime(tdAnime);

                const nAnime = tdAnime.sort((a, b) => (new Date(b.first_air_date) - new Date(a.first_air_date)) || (b.rating - a.rating));
                setNewAnime(nAnime.slice(0, 6));

                const tpAnime = tpShows.data.filter(show =>
                    show.language === 'ja' && show.genre_id.includes(16)
                );
                setTopAnime(tpAnime);
            } catch (error) {
                console.error("Content fetching failed:", error);
                setTrendyMovies([]);
                setTopMovies([]);
                setTrendyShows([]);
                setTopShows([]);
                setTopAnime([]);
                setTrendyAnime([]);
                setNewAnime([]);
                setNewMovies([]);
                setNewMovies([]);
            }
        };
        fetchContent();
    }, []);

    useEffect(() => {
      let startX;
  
      const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
      };
  
      const handleTouchMove = (e) => {
        const currentX = e.touches[0].clientX;
        if (startX - currentX < -50) { // Adjust the threshold
          setIsOn(true);
        }
      };
  
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
  
      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
      };
    }, []);


    const handleOnClick = (event) => {
        setActive(event.target.id);
        if(event.target.id == "movie"){
            setActivateCode(0);
        }else if(event.target.id == "show"){
            setActivateCode(1);
        }else if(event.target.id == "anime"){
            setActivateCode(2);
        }
    }

    const handleToggleButton = () => {
        setIsOn((prev) => !prev);
    }

    return (
        <Container>
            <div className="navbar">
                <div className={`${active == "movie" ? "click navlink" : "navlink"}`} id="movie" onClick={handleOnClick} >
                  Movie
                  
                </div>
                <div className={`${active == "show" ? "click navlink" : "navlink"}`} id="show" onClick={handleOnClick}>
                  Show
                </div>
                <div className={`${active == "anime" ? "click navlink" : "navlink"}`} id="anime" onClick={handleOnClick}>
                  Anime
                </div>
                <div className="toggle-button navlink" onClick={handleToggleButton}>
                  {isOn ?  "➡️" : "⬅️"}
                </div>
            </div>
            {activateCode == 0 && (
                <MovieComp trendyMovies={trendyMovies} topMovies={topMovies} newMovies={newMovies} ac={activateCode} />
            )}
            {activateCode == 1 && (
                <MovieComp trendyMovies={trendyShows} topMovies={topShows} newMovies={newShows} ac={activateCode}/>
            )}
            {activateCode == 2 && (
                <MovieComp trendyMovies={trendyAnime} topMovies={topAnime} newMovies={newAnime} ac={activateCode}/>
            )}
        </Container>
    )
}

const Container = styled.div`
  overflow-y: auto;
  overflow-x: hidden; 
  height: 100vh;
  width: 88vw;
  color: white;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
      width: 100vw;
      font-size: 0.9rem; 
    }

  @media (max-width: 480px) {
      width: 100vw;
      font-size: 0.8rem; 
    }

  /* Hide scrollbar on WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }

  .navbar {
    position: sticky;
    top: 0;
    z-index: 10;
    height: 7vh;
    width: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid grey;
    font-size: 1.3rem;
    color: #5D9CEC;
    background-color: #13111C;
    font-weight: 500;
    font-family:'Trebuchet MS, sans-serif';

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

    .navlink {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 33.33%;
      border-radius: 0.375rem;
      transition: box-shadow 0.3s ease;

      /* Add spacing adjustments on mobile */
      @media (max-width: 768px) {
        padding: 0.5rem;
      }
    }

    .navlink:hover {
      cursor: pointer;
      box-shadow: inset 0 0 12px rgba(139, 92, 246, 0.2);
      opacity: 1;
      font-weight: 550;
    }
    
    
    /* Active link styling */
    .click {
      background-color: #1b1b1b;
      color: #5D9CEC;
      font-weight: 600;
      border-bottom: 2px solid #5D9CEC;
    }

    .toggle-button{
      display: none;
      @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 33.33%;
        border-radius: 0.375rem;
        transition: box-shadow 0.3s ease;
        font-size: 0.9rem;
      }
    }
  }

  /* Responsive layout for main container */
  @media (max-width: 768px) {
    width: 100%; /* Full width for tablets */
    margin-left: 0;
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width for mobile */
    margin-left: 0;
  }
`;