import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DrawCircle from "./DrawCircle";

export default function Streams({
  title,
  date,
  rating,
  genres,
  overview,
  imdb_id,
  media_type,
}) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [ac, setAc] = useState(null);


  // const [drawing, setDrawing] = useState(false);


  const id = location.pathname.split("/").pop();

  const server1Key = process.env.REACT_APP_SERVER1_KEY;
  const server2Key = process.env.REACT_APP_SERVER2_KEY;
  const server3Key = process.env.REACT_APP_SERVER3_KEY;
  const server4Key = process.env.REACT_APP_SERVER4_KEY;
  const server5Key = process.env.REACT_APP_SERVER5_KEY;
  const server6Key = process.env.REACT_APP_SERVER6_KEY;

  const toggleStory = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleOnClick = (event) => {
    const curr = event.currentTarget.id;
    setAc(curr);
  };

  const handleStartDrawing = useRef(undefined);
 
  const handleStopDrawing = useRef(undefined);


  return (
    <Container>
      {/* <div className="buttons">
        <button onClick={() => handleStartDrawing.current?.()}>Start Drawing</button>
        <button onClick={() => handleStopDrawing.current?.()}>Stop Drawing</button>
      </div>
      <DrawCircle
        handleStartDrawing={handleStartDrawing}
        handleStopDrawing={handleStopDrawing}
        drawing={drawing}
        setDrawing={setDrawing}
      /> */}
      <div className="streaming-provider">
        <div className="navbar-provider">
          <div
            className={`${ac === "0" ? "navbar-item clicked" : "navbar-item"}`}
            id={0}
            onClick={handleOnClick}
          >
            Server 1
          </div>

          <div
            className={`${ac === "1" ? "navbar-item clicked" : "navbar-item"}`}
            id={1}
            onClick={handleOnClick}
          >
            Server 2
          </div>

          <div
            className={`${ac === "2" ? "navbar-item clicked" : "navbar-item"}`}
            id={2}
            onClick={handleOnClick}
          >
            Server 3
          </div>

          <div
            className={`${ac === "3" ? "navbar-item clicked" : "navbar-item"}`}
            id={3}
            onClick={handleOnClick}
          >
            Server 4
          </div>

          <div
            className={`${ac === "4" ? "navbar-item clicked" : "navbar-item"}`}
            id={4}
            onClick={handleOnClick}
          >
            Server 5
          </div>

          <div
            className={`${ac === "5" ? "navbar-item clicked" : "navbar-item"}`}
            id={5}
            onClick={handleOnClick}
          >
            Server 6
          </div>
        </div>
        <div className="streaming">
          {ac === "0" && (
            <iframe
              src={`${server1Key}/${media_type}/${imdb_id}${
                media_type === "movie" ? "" : "/1/1?server=2"
              }`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          )}

          {ac === "1" && (
            <iframe
              src={`${server2Key}=${id}${
                media_type === "movie" ? "" : "&tmdb=1&s=1&e=1"
              }`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          )}

          {ac === "2" && (
            <iframe
              src={`${server3Key}/${
                media_type === "movie" ? "embed" : "embedtv"
              }/${id}${media_type === "movie" ? "" : "&s=1&e=1"}`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          )}

          {ac === "3" && (
            <iframe
              src={`${server4Key}/${media_type}/${id}${
                media_type === "movie" ? "" : "/1/1"
              }`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          )}
          {ac === "4" && (
            <iframe
              src={`${server5Key}/${media_type}/${id}${
                media_type === "movie" ? "" : "?season=1&episode=1"
              }`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          )}
          {ac === "5" && (
            <iframe
              src={`${server6Key}/${media_type}/${id}${
                media_type === "movie" ? "" : "/1/1"
              }?server=hindi`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          )}
        </div>
      </div>
      <div className="info">
        <div className="title">{title}</div>
        <br />
        <div className="rating">{(rating + "").slice(0, 3)}</div>
        <div className="date">{date.slice(0, 4)}</div>
        <div className="genres">
          {genres.map((genre, index) => (
            <div key={index} className="genre">
              {genre.name}
            </div>
          ))}
        </div>
        <div className="overview-block">
          <h2>Overview</h2>
          <div className="overview">
            <p>
              {/* {Overview} */}
              {isExpanded ? overview : `${overview.slice(0, 100)}...`}
              <button onClick={toggleStory}>
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className="comments">Comments will come soon..</div>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: #13111c;
  margin-left: 1rem;
  color: #5d9cec;
  width: 86vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  .buttons{
    display: none;
  }

  .streaming-provider {
    margin-top: 10px;
    width: 100%;
    border-radius: 0px 0px 16px 16px;

    .navbar-provider {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: #0c0a12;
      padding: 10px;
      border-radius: 16px 16px 0px 0px;
      gap: 4rem;
      margin-bottom: 10px;

      .navbar-item {
        font-size: 1.2rem;
        color: #777;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        border-radius: 22px;
        transition: background 0.3s;
        background-color: #13111c;
        height: 2rem;

        &:hover {
          background-color: #5d9cec;
          color: #13111c;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }
      }

      .clicked {
        background-color: #5d9cec;
        color: #13111c;
        font-weight: 700;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
      }
    }

    .streaming {
      width: 100%;
      height: 500px;
      overflow: hidden;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
      animation: fadeIn 1s ease forwards;
      border-radius: 0px 0px 16px 16px;

      iframe {
        width: 100%;
        height: 500px;
        border: none;
        object-fit: cover;
        filter: brightness(0.7);
        transition: filter 0.3s ease;
      }
    }
  }

  .info {
    background-color: #0c0a12;
    margin-top: 20px;
    color: #5d9cec; /* Updated heading color */
    font-size: 1.5rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    animation: scrollTitle 1.5s ease forwards;
    padding: 10px;

    .title {
      display: inline-block;
      background-color: #13111c;
      padding: 10px 10px 10px 10px;
      border-radius: 12px;
      font-size: 1.5rem;
    }

    .rating {
      display: inline-block;
      color: #5d9cec;
      font-size: 1rem;
      margin: 10px;
      background-color: #13111c;
      padding: 10px 10px 10px 10px;
      border-radius: 12px;
    }

    .date {
      display: inline-block;
      color: #5d9cec;
      font-size: 1rem;
      margin: 10px;
      background-color: #13111c;
      padding: 10px 10px 10px 10px;
      border-radius: 12px;
    }

    .genres {
      display: flex;
      gap: 0.5rem;
      margin-top: 10px;
      background-color: #13111c;
      padding: 10px 10px 10px 10px;
      display: inline-block;
      border-radius: 12px;
      .genre {
        background-color: rgba(255, 255, 255, 0.2);
        padding: 8px 15px;
        border-radius: 10px;
        font-size: 1rem;
        color: #a4d7e1; /* Content color */
        margin-right: 5px;
        margin-bottom: 5px;
        display: inline-block;
      }
    }

    .overview-block {
      margin-top: 10px;
      padding: 10px 10px 10px 10px;
      h2 {
        color: #5d9cec;
        font-size: 18px;
      }

      .overview {
        background-color: #13111c;
        padding: 10px;
        border-radius: 12px;
        p {
          color: white;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
        }

        button {
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 12px;
          margin-top: 10px;
          cursor: pointer;
          height: 1rem;

          font-size: 0.7rem;
        }
      }
    }
  }

  .comments {
    margin-top: 20px;
    color: #777;
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

export { fadeIn };
