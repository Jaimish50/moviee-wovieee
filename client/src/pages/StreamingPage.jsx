import React,{useState,useEffect} from "react";
import Styled from "styled-components";
import ShrinkedNavbar from "../components/ShrinkedNavabar";
import Navbar from "../components/Navbar";
import Streams from "../components/streamingpagecomp/Streams";
import RecommendationBar from "../components/moviepagecomp/RecommendationBar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function StreamingPage(){
    const { media_type,id } = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [genres, setGenres] = useState([]);
    
    const [story,setStory] = useState("");
    
    const [rating,setRating] = useState(0);
    const [date, setDate] = useState("not set yet");
    const [imdb, setImdb] = useState("");

    const backendURL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchMovieInfo = async () => {
            try {
                const response = await axios.get(`${backendURL}/${media_type}/${id}`);
                setMovieInfo(response.data);
                setGenres(response.data.genres);
                
                
                setStory(response.data.story);
                
                setRating(response.data.rating);
                setDate(response.data.release_date);
                setImdb(response.data.imdb_id);
            } catch (error) {
                console.error("failed to fetch info", error);
                setMovieInfo({});
            }
        };
        fetchMovieInfo();
    }, [id]);

    return(
        <Container>
            <Navbar/>
            <Streams 
                id={movieInfo.id} 
                title={movieInfo.title} 
                date={date} 
                rating={rating} 
                genres={genres} 
                overview={story}
                imdb_id={imdb}
                media_type={media_type}
            />
        </Container>
    );
}

const Container = Styled.div`
    height: 100%;
    width: 100vw;
    background-color: #13111C;
    display: flex;
    overflow: hidden;
`;
