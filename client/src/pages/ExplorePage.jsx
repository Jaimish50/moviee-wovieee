import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Explore from "../components/explorepagecomp/Explore";
import Filter from "../components/explorepagecomp/Filter";

export default function ExplorePage(){
    const [ac, setAc] = useState(0); // Default is Movies
    const [active, setActive] = useState("tv"); // Default is "movie"
    const [sort, setSort] = useState("popularity.desc");
    const [genres, setGenres] = useState([]);
    const [isOn, setIsOn] = useState(true);
    const [isModalActivate, setIsModalActivate] = useState(true);
    const [length, setLength] = useState(null);
    const [rating, setRating] = useState(null);

    console.log("explorepage "+ length);
    
    return (
        <Container>
            <Navbar curr2 = "explore" isOn={isOn}/>
            <Explore rating={rating} length={length} sort={sort} genres={genres} ac={ac} setAc={setAc} active={active} setActive={setActive} isOn={isOn} setIsOn={setIsOn}/>
            <Filter rating={rating} setRating={setRating} length={length} setLength={setLength} isModalActivate={isModalActivate} sort={sort} setSort={setSort} genres={genres} setGenres={setGenres} media_type={active}/>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    background-color: #13111C;
`;