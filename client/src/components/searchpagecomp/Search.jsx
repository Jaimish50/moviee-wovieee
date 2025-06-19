import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Search(){
    const location = useLocation();
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState([]);
    const [val, setVal] = useState("");
    const [head, setHead] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        // Create a URLSearchParams object to parse the query parameters
        const queryParams = new URLSearchParams(location.search);

        // Extract the 'query' parameter from the URL
        const query = queryParams.get('query') || '';
        const page = queryParams.get('page') || 1;
        setCurrentPage(page);

        if(query !== ''){
            setHead(false);
            fetchMovie(query,page);
            setVal(query);
        }
    },[head]);

    const handleOnChange = (event) => {
        setVal(event.target.value);
    }

    const handleOnClick = (event) => {
        const str = event.currentTarget.id;
        const arr = str.split(" ");
        navigate(`/${arr[0]}/${arr[1]}`);
    }

    const handleOnKeyDown = (event) => {
        if(event.key === "Enter"){
            setHead(false);
            navigate(`/search?query=${val}`,{state: { curr: "search"}});
            fetchMovie(val,currentPage);
        }
    }

    const backendURL = process.env.REACT_APP_BACKEND_URL;

    const fetchMovie = async (val,page) => {
        try{
        const response = await axios.get(`${backendURL}/keyword/${val}/${page}`); 
        setMovieData(response.data.data);
        setTotalPages(response.data.total_pages);
        }catch{
            setMovieData([]);
            setTotalPages(0);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        navigate(`/search?query=${val}&page=${page}`, {state: { curr: "search"}});
        fetchMovie(val, page);
        // Call your search function here to fetch the results for this page
     };

     // Calculate range to display
   const visibleButtons = 5;
   const startPage = Math.max(1, currentPage - Math.floor(visibleButtons / 2));
   const endPage = Math.min(totalPages, startPage + visibleButtons - 1);

   const pages = [];
   for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
   }
    return(
        <Container>
            
            <div className="searchbar">
                {head}
                <input type="text" placeholder="Search..." value={val} onChange={handleOnChange} onKeyDown={handleOnKeyDown} />
                <button>Search</button>
            </div>
            {!head && (
                <div className="output">
                    <h2>{`Search Results ( ${totalPages} results found)`} </h2>
                    {movieData && 
                        <div className="content">
                            
                            {movieData.map((movie,index) => (
                                <div className="movie-card" key={index} id={`${movie.media_type} ${movie.id}`} onClick={handleOnClick}>
                                    <div className="image">
                                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                                    </div>
                                    <div className="details">
                                        <div className="meta-data">
                                            <div className="rating">
                                                {(Math.floor((movie.rating)*10)) / 10 || 'N/A'} {/* Default to 'N/A' if no rating */}
                                            </div>
                                            <div className="year">
                                                {`(${movie.date})` || '(N/A)'} {/* Default to 'N/A' if no date */}
                                            </div>
                                        </div>
                                        <div className="title" >
                                        {movie.title}
                                        </div>
                                    </div>
                        
                                </div>
                            ))}
                            <div className="gap"></div>
                            <div className="pagination">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>
                                {pages.map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={currentPage === pageNumber ? 'active' : ''}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    }
                </div>
            )}
        </Container>
    )
}

const Container = styled.div`
    overflow-y: auto;
    border-radius: 5px;
    background-color: #0C0A12;
    color: #5D9CEC;
    width: 88vw;
    height: 100vh;
    scrollbar-width: none;
    
    .searchbar{
        position: relative;
        padding-left: 12px;
        width: 80%;
        margin: 20px;
        height: 10vh;
        border: 1px solid #777;
        border-radius: 22px;
        display: flex;
        flex-direction: row;
        align-items: center;
        
            input{
                height: 70%;
                width: 85%;
                padding: 12px;
                border: 1px solid grey;
                border-radius: 16px 0 0 16px;
                background-color: #13111C;
                color: #A4D7E1;
                font-size: 1.2rem;
            }
            button{
                position: absolute;
                right: 12px;
                width: 12.5%;
                height: 70%;
                background-color: #13111C;
                border-radius: 0 16px 16px 0;
                border: 1px solid grey;
                font-size: 1.2rem;
                font-weight: 450;
                color: white;
            }
        
    }
    .output{
        margin-top: 20px;
        padding-left: 25px;
        display: flex;
        flex-direction: column;
        
        .content{
        position: relative;
            overflow-y: auto;
            scrollbar-width: none;
            height: 100%;
            width: 86vw;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            // border: 1px solid pink;
            overflow: hidden;
            
            

            
            .movie-card{
                
                width: 11vw;
                height: 40vh;
                margin-right: 18px;
                margin-bottom: 10px;
                .image {
                    width: 100%;
                    height: 70%;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 8px;
                    }
                }
                .details{
                height: 30%;
                width: 100%;
                color: #A4D7E1;
                display: flex;
                flex-direction: column;
                padding: 5px;
                .title{
                    height: 60%;
                    width: 100%;  
                    // border: 1px solid pink;  
                    overflow: hidden;
                    flex-shrink: 0;
                    font-size: 1rem;
                    font-weight: 600;
                }
                .meta-data{
                    font-size: 1rem;
                    font-weight: 650;
                    height: 40%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    // border: 2px solid grey;
                }
                }
            }
            .gap{
                position: sticky;
                bottom: 0;
                left: 37%;
                height: 7vh;
                width: 86vw;
                // border: 1px solid yellow;
            }
            .pagination {
                position: absolute;
                left: 37%;
                bottom: 0;
                // left:40%;
                display: flex;
                gap: 8px;
                justify-content: center;
                width: 20rem;
                height: 7vh;
                //border: 2px solid red;
            }

            .pagination button {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #1B1B1B;
            color: white;
            border: none;
            outline: none;
            cursor: pointer;
            transition: all 0.3s;
            }

            .pagination button:hover {
            background-color: #5D9CEC; /* Highlight color */
            color: white;
            }

            .pagination button.active {
            background-color: #5D9CEC;
            color: white;
            }
        }
        
    }
    }
}                        
`;