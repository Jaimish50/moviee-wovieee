import React from "react";
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Search from "../components/searchpagecomp/Search";

export default function SearchPage(){
    return (
        <Container>
            <Navbar curr2 = "search" />
            <Search/>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    background-color: #13111C;
`;