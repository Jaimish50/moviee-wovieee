import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import Movie from "../components/moviepagecomp/Movie";
import Movie2 from "../components/moviepagecomp/Movie2";
import Navbar from "../components/Navbar";
import RecommendationBar from "../components/moviepagecomp/RecommendationBar";

export default function MoviePage() {
    const { media_type,id } = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [genres, setGenres] = useState([]);
    const [casts, setCasts] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [writers, setWriters] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [videos, setVideos] = useState([]);
    const [story,setStory] = useState("");
    const [similar,setSimilar] = useState([]);
    const [rec,setRec] = useState([]);
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchMovieInfo = async () => {
            try {
                const response = await axios.get(`${backendURL}/search/${media_type}/${id}`);
                setMovieInfo(response.data);
                console.log(response.data);
                setGenres(response.data.genres);
                setCasts(response.data.cast);
                setDirectors(response.data.directors);
                setWriters(response.data.writers);
                setReviews(response.data.reviews);
                setVideos(response.data.media);
                setStory(response.data.story);
                setSimilar(response.data.similar_movies);
                setRec(response.data.recommendations_movies);
            } catch (error) {
                console.error("failed to fetch info", error);
                setMovieInfo({});
            }
        };
        fetchMovieInfo();
    }, [id]);

    const [isOn, setIsOn] = useState(false);

    return (
        <Container>
            <Navbar curr2="home" isOn={isOn}/>
            <div className="group">
            <Movie id={id} media_type={media_type} movieInfo={movieInfo} genres={genres} casts={casts} directors={directors} writers={writers} reviews={reviews} videos={videos} story={story} isOn={isOn} setIsOn={setIsOn}/>
            <RecommendationBar similar={similar} rec={rec} media_type={movieInfo.media_type} isAnime={movieInfo.isAnime}/>
            </div>
            
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    // background-color: #1b1b1b; /* Keeping this as is, as it contrasts well with black */
    // background-color: #13111C; /* Dark background */
    background: linear-gradient(to bottom, #13111C, #0C0A12);
    .group{
        display: flex;
        flex-direction: row;
    }
`;

