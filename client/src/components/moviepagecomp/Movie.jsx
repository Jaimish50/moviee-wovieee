import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Movie({
  id,
  media_type,
  movieInfo,
  genres,
  casts,
  directors,
  writers,
  reviews,
  videos,
  story,
  isOn,
  setIsOn
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [curr, setCurr] = useState(0);
  const navigate = useNavigate();
  const toggleStory = () => {
    setIsExpanded((prev) => !prev);
  };
  const DetailItem = ({ label, value }) => (
    <div className="detail-item">
      <strong>
        {label} <p>{`${value}`}</p>{" "}
      </strong>
    </div>
  );
  const handleOnClick = (event) => {
    const name = event.currentTarget.id;
    if (name === "overall") setCurr(0);
    else if (name === "cast") setCurr(1);
    else if (name === "crew") setCurr(2);
    else if (name === "reviews") setCurr(3);
  };

  const handleOnClickWatch = (event) => {
    navigate(`/watch/${media_type}/${id}`);
  };

  const handleToggleButton = (e)=>{
    setIsOn((c) => !c);
  }

  return (
    <Container>
        <div className="toggle-button navlink" onClick={handleToggleButton}>
            {isOn ?  "➡️" : "⬅️"}
        </div>
        {movieInfo.backdrop_path && movieInfo.poster_path 
          ? 
        <Banner className="banner" onClick={handleOnClickWatch}>
        <img
          src={`https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}`}
          alt={movieInfo.id}
        />
        <div className="title">
          {movieInfo.title}
          <div className="genres">
            {genres.map((genre, index) => (
              <div className="genre" key={index}>
                {genre.name}
              </div>
            ))}
          </div>
        </div>
        <div className="watch-link" onClick={handleOnClickWatch}>
          Watch
        </div>
        <Poster className="poster" onClick={handleOnClickWatch}>
          <img
            src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`}
            alt={movieInfo.id}
          />
        </Poster>
      </Banner> 
        : 
      <LoadingContainer>
        <div className="loading-empty">
          <div className="loading-spinner" />
        </div>
      </LoadingContainer>
      }
      <Lower className="lower">
        <MovieMetrics className="movie-metrics">
          <Rating className="rating">
            <h3>{Math.floor(movieInfo.rating*10)/10}</h3>
            <ProgressBar rating={movieInfo.rating} />
          </Rating>
          <Runtime className="runtime">
            <h3>{movieInfo.runtime} m</h3>
          </Runtime>
        </MovieMetrics>
        <NavSection className="nav-section">
          <Navbar className="navbar">
            <div
              className={`${
                curr === 0
                  ? "navbar-item overall clicked"
                  : "navbar-item overall"
              }`}
              id="overall"
              onClick={handleOnClick}
            >
              <h4>Overall</h4>
            </div>
            <div
              className={`${
                curr === 1 ? "navbar-item cast clicked" : "navbar-item cast"
              }`}
              id="cast"
              onClick={handleOnClick}
            >
              <h4>Cast</h4>
            </div>
            <div
              className={`${
                curr === 2 ? "navbar-item crew clicked" : "navbar-item crew"
              }`}
              id="crew"
              onClick={handleOnClick}
            >
              <h4>Crew</h4>
            </div>
            <div
              className={`${
                curr === 3
                  ? "navbar-item reviews clicked"
                  : "navbar-item reviews"
              }`}
              id="reviews"
              onClick={handleOnClick}
            >
              <h4>Reviews</h4>
            </div>
          </Navbar>
          <Info className="info">
            {curr === 0 && (
              <>
                <div className="tagline">
                  <h2>{movieInfo.tagline}</h2>
                </div>
                <div className="story">
                  <h3>Story</h3>
                  <div className="overview">
                    <p>
                      {isExpanded ? story : `${story.slice(0, 100)}...`}
                      <button onClick={toggleStory}>
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    </p>
                  </div>
                </div>
                <div className="details">
                  <DetailItem label="Status" value={movieInfo.status} />
                  <DetailItem
                    label="Release Date"
                    value={movieInfo.release_date}
                  />
                  <DetailItem
                    label="Spoken Language"
                    value={movieInfo.language}
                  />
                  <DetailItem label="Adult" value={movieInfo.adult} />
                </div>
              </>
            )}
            {curr === 1 && (
              <Casts className="casts">
                {casts.map((cast) => (
                  <CastCard className="cast-card" key={cast.id}>
                    <div className="image">
                      <img
                        src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                        alt={cast.name}
                      />

                      <h3>{cast.name}</h3>
                      <h4>As : {cast.character}</h4>
                    </div>
                  </CastCard>
                ))}
              </Casts>
            )}
            {curr === 2 && (
              <Crew className="crew">
                <div className="directors">
                  <h2>Directors</h2>
                  <div className="directors-info">
                    {directors.map((director) => (
                      <CrewCard className="crew-card" key={director.id}>
                        <div className="image">
                          <img
                            src={`https://image.tmdb.org/t/p/original${director.profile_path}`}
                            alt={director.name}
                          />
                          <h3>{director.name}</h3>
                        </div>
                      </CrewCard>
                    ))}
                  </div>
                </div>
                <div className="writers">
                  <h2>Writers</h2>
                  <div className="writers-info">
                    {writers.map((writer) => (
                      <CrewCard className="crew-card" key={writer.id}>
                        <div className="image">
                          <img
                            src={`https://image.tmdb.org/t/p/original${writer.profile_path}`}
                            alt={writer.name}
                          />
                          <h3>{writer.name}</h3>
                        </div>
                      </CrewCard>
                    ))}
                  </div>
                </div>
              </Crew>
            )}
            {curr === 3 && (
              <Reviews className="reviews">
                <h2>Reviews</h2>
                <div className="reviews-info">
                  {reviews.map((review) => (
                    <ReviewCard className="review-card" key={review.id}>
                      <div className="image">
                        <img
                          src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`}
                          alt={review.author_details.name}
                        />
                        <h3>{review.author_details.name}</h3>
                      </div>
                      <p>{review.content}</p>
                    </ReviewCard>
                  ))}
                </div>
              </Reviews>
            )}
          </Info>
        </NavSection>
        <Media className="media">
          <h2>MEDIA</h2>
          <Videos className="videos">
            {videos.map((video) => (
              <Video className="video" key={video.id}>
                <Thumbnail className="thumbnail">
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                    alt={video.name}
                    onClick={() =>
                      window.open(
                        `https://www.youtube.com/watch?v=${video.key}`,
                        "_blank"
                      )
                    }
                  />
                  <div className="play-icon">▶</div>
                </Thumbnail>
              </Video>
            ))}
          </Videos>
        </Media>
      </Lower>
    </Container>
  );
}

//Styled Components
const Container = styled.div`
  position: relative;
  background-color: #13111c; /* Dark background */
  color: #a4d7e1; /* Updated content color */
  width: 65vw;
  height: 100vh;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-y: auto;
  // border: 1px solid white;
  scrollbar-width: none;

  @media (max-width: 768px){
    width: 99vw;
    margin-left: 0;
    height: none;
    overflow: hidden;
  }
`;

const Banner = styled.div`
position: relative;
  width: 95%;
  height: 50vh;
  margin-bottom: 3vh;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  animation: fadeIn 1s ease forwards;
  padding: 1rem;
  // border: 1px solid white;

  @media (max-width: 768px){
    width: 99vw;
    height: 20vh;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7);
    transition: filter 0.3s ease;
    border-radius: 16px;
  }

  .title {
    position: absolute;
    width: 60%;
    height: 50%;
    top: 37vh;
    right: 0;
    transform: translateY(-50%);
    color: #5d9cec; /* Updated heading color */
    font-size: 2.5rem;
    font-weight: bold;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
    animation: scrollTitle 1.5s ease forwards;
    // border: 1px solid white;

    .genres {
      display: flex;
      gap: 0.5rem;
      margin-top: 10px;
      width: 100%;
      .genre {
        height: 5vh;
        background-color: rgba(255, 255, 255, 0.2);
        padding: 8px 15px;
        border-radius: 10px;
        font-size: 1rem;
        color: #a4d7e1; /* Content color */
      }
    }
  }

  .watch-link {
    position: absolute;
    top: 25vh;
    left: 25%;
    border-radius: 12px;
    background-color: #5d9cec;
    color: #0c0a12;
    font-size: 1.5rem;
    width: 6rem;
    height: 7vh;
    padding: 10px;
    font-weight: bold;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
    animation: scrollTitle 1.5s ease forwards;
    padding: 10px;
  }
`;

const Poster = styled.div`
  position: absolute;
  top: 7vh;
  left: -1vw;
  width: 25%;
  height: 90%;
  border: 5px solid black;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  transition: bottom 0.3s ease;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LoadingContainer = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #0c0a12;
  // border: 1px solid grey;
  flex-shrink: 0;

  // .loading-empty {
  //   height: 90%;
  //   width: 100%;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   // border: 3px solid #2b2b2b;
  // }

  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #5D9CEC;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;


const Lower = styled.div`
  width: 65vw;
  height: 100vh;
  // border: 1px solid  pink;

  @media (max-width: 768px){
    width: 99vw;
  }
  
  background-color: #0c0a12;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
`;

const MovieMetrics = styled.div`
  display: flex;
  padding-left: 5rem;
  padding-right: 1rem;
  height: 100px;
  width: 58vw;
  justify-content: space-between;
  // border: 1px solid blue;
  h3 {
    font-size: 2rem;
    color: #5d9cec; /* Heading color */
  }
`;

const Rating = styled.div`

  h3 {
    font-size: 2rem;
    color: #5d9cec;
  }
`;

const ProgressBar = styled.div`
  // border: 1px solid pink;
  width: 100%;
  background-color: #555;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;

  &::after {
    content: "";
    display: block;
    height: 8px;
    width: ${({ rating }) => rating * 10}%;
    background-color: #5d9cec; /* change */
    transition: width 0.4s ease;
  }
`;

const Runtime = styled.div`

  h3 {
    font-size: 2rem;
    color: #5d9cec; /* Heading color */
  }
`;

const NavSection = styled.div`
  margin-top: 0vh;
  // height: 50vh;
  // border: 1px solid red;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  cursor: pointer;
  margin-top: 2px;
  width: 62vw;
  height: 7vh;
  //border: 1px solid green;

  .navbar-item {
    height: 100%;
    width: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    
    border-radius: 8px;
    transition: background 0.3s;
    background-color: #13111c;
    font-size: 1.2rem;
    font-weight: 700;

    &:hover {
      background-color: #5d9cec;
    }
  }
  .clicked {
    background-color: #5d9cec;
    color: #13111c;
    font-weight: 700;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }
`;

const Info = styled.div`
  margin-top: 3vh;
  padding-left: 5vw;

  @media (max-width: 768px){
    padding-left:0;
  }
  .tagline {
    text-align: center;
    margin-bottom: 20px;
    background-color: #13111c;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #5d9cec; /* Heading color */
    }
  }

  /* Story Section Styles */
  .story {
    margin-bottom: 30px;
    color: white;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      border-bottom: 2px solid #a67c2d; /* Heading color */
      padding-bottom: 5px;
      color: #5d9cec; /* Heading color */
    }
  }

  /* Overview Styles */
  .overview {
    background-color: #13111c; /* Keeping this as is */
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);

    p {
      font-size: 1rem;
      line-height: 1.6;
    }
  }

  /* Button Styles */
  button {
    background-color: #13111c;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    text-decoration: underline;
    margin-top: 10px;
    border: 1px solid #5d9cec;
    border-radius: 22px;
    text-decoration: none;
    color: #5d9cec;
  }

  button:hover {
    color: #fff; /* Highlight on hover */
  }

  /* Details Section Styles */
  .details {
    display: flex;
    flex-wrap: wrap; /* Allow elements to wrap on smaller screens */
    justify-content: space-between;
  }

  .details div {
    flex: 1; /* Equal width for each detail section */
    margin: 10px; /* Space between details */
    padding: 10px;
    background-color: #13111c;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }

  .details strong {
    display: block; /* Make strong text stand out */
    font-size: 1.1rem;
    margin-bottom: 5px;
    p {
      font-weight: 500;
      color: white;
    }
  }
  
  // border: 3px solid white;
`;

const Casts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  h2 {
    color: #5d9cec; /* Heading color for casts section */
  }
`;

const CastCard = styled.div`
  background-color: #444;
  border-radius: 10px;
  overflow: hidden;
  width: 120px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  .image {
    img {
      width: 100%;
      height: auto;
    }

    h3 {
      text-align: center;
      color: #a4d7e1;
    }
    h4 {
      text-align: center;
    }
  }
`;

const Crew = styled.div`
  display: flex;
  flex-direction: column;

  .directors,
  .writers {
    margin-bottom: 20px;

    h2 {
      margin-bottom: 10px;
      color: #5d9cec; /* Heading color */
    }
  }

  .directors-info,
  .writers-info {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    color: #a4d7e1;
  }
`;

const CrewCard = styled.div`
  background-color: #444;
  border-radius: 10px;
  overflow: hidden;
  width: 120px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  .image {
    img {
      width: 100%;
      height: auto;
    }

    h3 {
      text-align: center;
      color: #a4d7e1;
    }
  }
`;

const Reviews = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 10px;
    color: #a67c2d; /* Heading color */
  }

  .reviews-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const ReviewCard = styled.div`
  background-color: #444;
  border-radius: 10px;
  padding: 10px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }

  .image {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }

    h3 {
      color: #a4d7e1;
    }
  }

  p {
    margin-top: 5px;
    color: #f0f0f0;
  }
`;

const Media = styled.div`
  margin-top: 20px;
  background-color: #13111c; /* Keeping this as is, as it contrasts well with black */
  padding-left: 100px;
  @media (max-width: 768px){
    padding-left:0;
  }
  h2 {
    margin-bottom: 10px;
    color: #5d9cec; /* Heading color */
  }
`;

const Videos = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const Video = styled.div`
  width: 150px;
  position: relative;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 80px;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;



  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    color: #ffffff;
    opacity: 0.8;
  }
`;

const fadeIn = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const scrollTitle = `
    @keyframes scrollTitle {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-10px);
        }
    }
`;

export { fadeIn, scrollTitle };
