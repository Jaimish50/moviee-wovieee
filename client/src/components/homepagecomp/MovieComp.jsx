import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import GestureControl from "./GestureControl";

// import socket from "./Socket";

export default function MovieComp({ trendyMovies, topMovies, newMovies, ac }) {
  const navigate = useNavigate();
  const movieSliderRef = useRef(null);
  const topMovieSliderRef = useRef(null);
  const [curr, setCurr] = useState("movie");
  const [disable1, setDisable1] = useState(true);
  const [disable2, setDisable2] = useState(true);
  debugger

  // const [disableCamera, setDisableCamera] = useState(true);
 
  useEffect(() => {
    if (ac === 0) {
      setCurr("movie");
    } else if (ac == 1) {
      setCurr("tv");
    } else if (ac == 2) {
      setCurr("tv");
    }
  }, [ac]);
  const scrollMovie = (direction) => {
    if (movieSliderRef.current) {
      movieSliderRef.current.scrollBy({
        left: direction === "left" ? -1900 : 1900, // Adjust scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollTopMovie = (direction) => {
    if (topMovieSliderRef.current) {
      topMovieSliderRef.current.scrollBy({
        left: direction === "left" ? -1900 : 1900, // Adjust scroll distance
        behavior: "smooth",
      });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  const handleOnClickMovieCard = (event) => {
    const id = event.currentTarget.id;
    navigate(`/${curr}/${id}`);
  };

  // useEffect(() => {
  //   if (!socket.connected) {
  //     socket.connect();
  //   }
  //   console.log("message disable in movie comp ", disableCamera);
  //   if(socket.connected){
  //     socket.emit("disable", { msg: disableCamera });
  //   }else{
  //     socket.once("connect", () => {
  //       console.log("Sending disable in movie comp : ", disableCamera);
  //       socket.emit("disable", { msg: disableCamera });
  //   });
  //   } 
  // },[disableCamera]);

  // const handleDisableCamera = () => {
  //   setDisableCamera((prev) => !prev);
    
  // };

  // // Image Loader
  // const [loadingMap, setLoadingMap] = useState({}); // Track loading state for each image
  // // Update loading status for a specific movie by ID
  // const handleImageLoad = (movieId) => {
  //     setLoadingMap(prev => ({ ...prev, [movieId]: false }));
  // };

  return (
    <Container>
      <>
        {/*  Banner     */}
        <CarouselContainer>
          {newMovies.length > 0 ? (
            <Slider {...settings}>
              {newMovies.map((movie) => (
                <Slide
                  key={movie.id}
                  id={movie.id}
                  onClick={handleOnClickMovieCard}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                  <SlideInfo>
                    <h2>{movie.title}</h2>
                  </SlideInfo>
                </Slide>
              ))}
            </Slider>
          ) : (
            <LoadingContainer>
              <div className="lolading-empty">
                <div className="loading-spinner" />
              </div>
            </LoadingContainer>
          )}
        </CarouselContainer>
        {/*  Banner     */}

        {/* <div className="disable-camera" onClick={handleDisableCamera}>
          Disable Camera
        </div> */}
        

        <div className="category">
          {ac === 0 && <h2>Trending Movie</h2>}
          {ac === 1 && <h2>Trending Shows</h2>}
          {ac === 2 && <h2>Trending Anime</h2>}
          <div
            className={`disable-button ${!disable1 ? "gesture-activated" : ""}`}
            onClick={() => setDisable1((prev) => !prev)}
          >
            Gesture
          </div>
        </div>

        <SliderContainer>
          <GestureControl
            key={`${disable2} ${disable1}`}
            onSwipe={(direction) => {
              
              if (!disable1) scrollMovie(direction);
              
            }}
          />
          <Button onClick={() => scrollMovie("left", -300)}>
            <>
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/hieroglyphs/32/FFFFFF/back.png"
                alt="back"
              />
            </>
          </Button>
          {trendyMovies.length === 0 ? (
            <LoadingContainer>
              <div className="lolading-empty">
                <div className="loading-spinner" />
              </div>
            </LoadingContainer>
          ) : (
            <MovieSlider ref={movieSliderRef}>
              {trendyMovies.map((movie, index) => {
                // const isLoading = loadingMap[movie.id] !== false;

                return (
                  <MovieCard
                    key={index}
                    className="movie-card"
                    id={movie.id}
                    onClick={handleOnClickMovieCard}
                  >
                    {/* {isLoading && 
                                                <LoadingContainer>
                                                    <div className="lolading-empty">
                                                        <div className="loading-spinner" />
                                                    </div>
                                                </LoadingContainer>
                                            } */}
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      // style={{ display: isLoading ? 'none' : 'block' }}
                      // onLoad={() => handleImageLoad(movie.id)}
                    />
                    <p>{movie.title}</p>
                  </MovieCard>
                );
              })}
            </MovieSlider>
          )}
          <Button onClick={() => scrollMovie("right", 300)}>
            <>
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/hieroglyphs/64/FFFFFF/forward.png"
                alt="forward"
              />
            </>
          </Button>
        </SliderContainer>

        <div className="category">
          {ac === 0 && <h2>Top Movie</h2>}
          {ac === 1 && <h2>Top Shows</h2>}
          {ac === 2 && <h2>Top Anime</h2>}
          <div
            className={`disable-button ${!disable2 ? "gesture-activated" : ""}`}
            onClick={() => setDisable2((prev) => !prev)}
          >
            Gesture
          </div>
        </div>
        <SliderContainer>
          <GestureControl
            key={`${disable2} ${disable1}`}
            onSwipe={(direction) => {
              
              if (!disable2) scrollTopMovie(direction);
              
            }}
          />
          <Button onClick={() => scrollTopMovie("left")}>
            <>
              <img
                width="32"kya 
                height="32"
                src="https://img.icons8.com/hieroglyphs/32/FFFFFF/back.png"
                alt="back"
              />
            </>
          </Button>
          {topMovies.length === 0 ? (
            <LoadingContainer>
              <div className="lolading-empty">
                <div className="loading-spinner" />
              </div>
            </LoadingContainer>
          ) : (
            <MovieSlider ref={topMovieSliderRef}>
              {topMovies.map((movie, index) => {
                // const isLoading = loadingMap[movie.id] !== false;
                return (
                  <MovieCard
                    key={index}
                    className="movie-card"
                    id={movie.id}
                    onClick={handleOnClickMovieCard}
                  >
                    {/* {isLoading && 
                                                <LoadingContainer>
                                                    <div className="lolading-empty">
                                                        <div className="loading-spinner" />
                                                    </div>
                                                </LoadingContainer>} */}
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      // style={{ display: isLoading ? 'none' : 'block' }}
                      // onLoad={() => handleImageLoad(movie.id)}
                    />
                    <p>{movie.title}</p>
                  </MovieCard>
                );
              })}
            </MovieSlider>
          )}
          <Button onClick={() => scrollTopMovie("right")}>
            <>
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/hieroglyphs/64/FFFFFF/forward.png"
                alt="forward"
              />
            </>
          </Button>
        </SliderContainer>
      </>
    </Container>
  );
}

const Container = styled.div`
  width: 88vw;
  height: 200vh;
  // border: 2px solid red;
  .disable-camera{
    width: 11vw;
    height: 6vh;
    padding-left: 20px;
    padding-top: 10px;
    border: 1px solid white;
    border-radius: 16px;

    &:hover{
      background-color: rgb(244, 246, 139);
      color: blue;
    }
  }
  .category {
    color: #5d9cec;
    padding: 10px;
    margin: 0 auto;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: "Trebuchet MS, sans-serif";
    // width: 13vw;
    background-color: #0c0a12;
    border-radius: 16px;
    margin-left: 1rem;
    display: flex;
    judtify-content: flex-start;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    .disable-button {
      border: 1px solid yellow;
      border-radius: 16px;
      margin-left: 20px;
      font-size: 1.3rem;
      padding: 3px;
      cursor: pointer;
      &:hover {
        background-color: rgb(253, 229, 15);
        color: black;
      }
    }

    .gesture-activated {
      background-color: rgb(253, 229, 15);
      color: black;
    }
  }
`;

// Banner
const CarouselContainer = styled.div`
  width: 88vw;
  height: 500px;
  overflow: hidden;

  // border:1px solid pink;

  @media (max-width: 768px) {
    width: 90%;
    height: 300px;
  }

  @media (max-width: 480px) {
    width: 97%;
    height: 250px;
  }
`;

const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-empty {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #2b2b2b;
  }

  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #5d9cec;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Slide = styled.div`
  height: 500px;
  width: 88vw;
  // border: 3px solid yellow;
  padding-left: 2vw;
  padding-top: 3vh;
  img {
    width: 98%;
    height: 95%;

    object-fit: cover;
    // border: 3px solid green;
    border-radius: 0.5rem;

    @media (max-width: 768px) {
      height: 300px;
    }

    @media (max-width: 480px) {
      height: 250px;
    }
  }
`;

const SlideInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #e0e0e0;
  background-color: black;
  padding: 0px 15px;
  border-radius: 8px;
  border: 1px solid grey;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 5px 10px;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 5px;
  }
`;
// Banner

const SliderContainer = styled.div`
  margin-left: 1vw;
  display: flex;
  align-items: center;
  position: relative;
  height: 320px;
  width: 86vw;
  // border: 3px solid red;

  @media (max-width: 768px) {
    height: 220px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const MovieSlider = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  // border: 2px solid green;

  scrollbar-width: none; /* Hide scrollbar in Firefox */

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar in Chrome */
  }
`;

const MovieCard = styled.div`
  width: 10vw;
  height: 300px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  // border: 1px solid yellow;

  @media (max-width: 768px) {
    width: 120px;
  }

  @media (max-width: 480px) {
    width: 110px;
  }

  img {
    position: relative;
    top: 0px;
    // border: 2px solid red;
    width: 100%;
    height: 250px;
    border-radius: 8px;
    object-fit: cover;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
      
      border-radius: 8px;
    }

    @media (max-width: 768px) {
      height: 200px;
      width: 120px;
    }

    @media (max-width: 480px) {
      height: 180px;
      width: 110px;
    }
  }

  p {
    height: 50px;
    width: 10vw;
    color: white;
    font-size: auto;
    font-weight: 600;
    text-align: center;
    margin-top: 5px;
    // border: 3px solid pink;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 768px) {
      font-size: auto;
    }

    @media (max-width: 480px) {
      font-size: auto;
    }
  }

  .loader {
    display: inline-flex;
    gap: 10px;
  }

  .loader:before,
  .loader:after {
    content: "";
    height: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: linear-gradient(#222 0 0) top/100% 40% no-repeat,
      radial-gradient(farthest-side, #000 95%, #0000) 50%/8px 8px no-repeat #fff;
    animation: l7 1.5s infinite alternate ease-in;
  }

  @keyframes l7 {
    0%,
    70% {
      background-size: 100% 40%, 8px 8px;
    }
    85% {
      background-size: 100% 120%, 8px 8px;
    }
    100% {
      background-size: 100% 40%, 8px 8px;
    }
  }
`;

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  padding: 10px;
  position: absolute;
  z-index: 1;
  height: 100%;
  // border: 4px solid pink;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &:first-of-type {
    left: 0;
  }

  &:last-of-type {
    right: 0;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 6px;
  }
`;
