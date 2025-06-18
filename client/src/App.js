import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from "./pages/ExplorePage";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage"; 
import StreamingPage from "./pages/StreamingPage";
export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/:media_type/:id" element={<MoviePage/>}/>
        <Route path="/explore" element={<ExplorePage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/watch/:media_type/:id" element={<StreamingPage/>} />
      </Routes>
    </Router>
    </>
  );
}
