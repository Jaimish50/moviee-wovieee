import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Content({
  data,
  totalPages,
  media_type,
  loading,
  currentPage,
  setCurrentPage,
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [hovered, setHovered] = useState(null);

  let pagesToShow = [];

  const generatePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first 3 pages
    for (let i = 1; i <= 3; i++) {
      pages.push(i);
    }

    // Ellipsis after first 3 if needed
    if (currentPage > 5) pages.push("...");

    // Middle pages
    const start = Math.max(4, currentPage - 1);
    const end = Math.min(totalPages - 3, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    // Ellipsis before last 3 if needed
    if (currentPage < totalPages - 4) pages.push("...");

    // Always show last 3 pages
    for (let i = totalPages - 2; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  pagesToShow = generatePages();
 

  const handleOnClick = (id) => {
    navigate(`/${media_type}/${id}`);
  };

 


  return (
    <Container>
      <div className="content">
        {[...data].map(({ id, poster_path, title, rating, date }, index) =>
          
            (<div
              className="movie-card"
              key={index}
              onClick={() => handleOnClick(id)}
            >
              <div className="image">
                {/* Handling missing poster images */}
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/original${poster_path}`
                      : "/path/to/default-image.jpg"
                  }
                  alt={title}
                />
              </div>
              <div className="details">
                <div className="meta-data">
                  <div className="rating">
                    {Math.floor(rating * 10) / 10 || "N/A"}{" "}
                    {/* Default to 'N/A' if no rating */}
                  </div>
                  <div className="year">
                    {`(${date})` || "(N/A)"} {/* Default to 'N/A' if no date */}
                  </div>
                </div>
                <div className="title">{title}</div>
              </div>
            </div>)
        
        )}
        {loading && <div className="loading">Loading...</div>}
        <div className="pagination">
          <button
            className="navigators"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {pagesToShow.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              onMouseEnter={(e) => {
                setIsHovered(true);
                setHovered(index);
              }}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                padding: "8px 14px",
                borderRadius: "50%",
                background:
                  page === currentPage || (isHovered && hovered === index)
                    ? "#5D9CEC"
                    : "#1b1b1b",
                color: page === "..." ? "#aaa" : "#fff",
                cursor: page === "..." ? "default" : "pointer",
                border: "none",
                fontWeight: page === currentPage ? "bold" : "normal",
              }}
            >
              {page}
            </button>
          ))}

          <button
            className="navigators"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 59vw;
  height: 100vh;
  padding: 20px;
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    // border: 3px solid red;
    .movie-card {
      width: 12vw;
      height: 40vh;
      // border: 2px solid yellow;
      .image {
        width: 100%;
        height: 70%;
        // border: 5px solid pink;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1rem;
          // border: 4px solid green;
        }
      }
      .details {
        height: 30%;
        width: 100%;
        color: #a4d7e1;
        display: flex;
        flex-direction: column;
        padding: 5px;
        .title {
          height: 70%;
          width: 100%;
          // border: 1px solid pink;
          overflow: hidden;
          flex-shrink: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .meta-data {
          font-size: 1rem;
          font-weight: 650;
          height: 30%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          // border: 2px solid grey;
        }
      }
    }

    .loader {
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
    }

    .pagination {
      width: 100%;
      height: 7vh;
      display: flex;
      justify-content: center;

      button {
        height: 3rem;
        width: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }
      .navigators {
        border-radius: 50%;
        &:hover {
          background-color: white;
          color: black;
        }
      }
    }
  }
`;
