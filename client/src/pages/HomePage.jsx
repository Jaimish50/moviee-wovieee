import React,{useState} from 'react';
import styled from "styled-components";
import Home from '../components/homepagecomp/Home';
import Navbar from '../components/Navbar';
export default function HomePage(){
    const [isOn, setIsOn] = useState(true);
    return(
        <>
            <Container>
                <Navbar isOn={isOn} onClick={(e) => e.stopPropagation()}/>
                <Home isOn={isOn} setIsOn={setIsOn} onClick={() => setIsOn(!isOn)} />
               
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: row;
    background-color: #13111C;
    color: white;
`;