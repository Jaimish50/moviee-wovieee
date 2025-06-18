import React, { useState, useRef, useCallback, useMemo } from "react";
import styled from "styled-components";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Star,
  Clock,
  Filter as FilterIcon,
} from "lucide-react";

export default function Filter({
  rating,
  setRating,
  length,
  setLength,
  isModalActivate,
  sort,
  setSort,
  genres,
  setGenres,
  media_type,
}) {
  const [expandedSection, setExpandedSection] = useState("sort");
  const [upDown, setUpDown] = useState(true);

  const toggleGenre = useCallback(
    (genre) => {
      setGenres((prev) =>
        prev.includes(genre)
          ? prev.filter((g) => g !== genre)
          : [...prev, genre]
      );
    },
    [setGenres]
  );

  const toggleSection = useCallback((section) => {
    setExpandedSection((prev) => (prev === section ? "" : section));
  }, []);

  const handleOnChange = (event) => {
    setSort(event.target.value);
  };

  const genreList = useMemo(
    () =>
      media_type === "movie"
        ? [
            { id: 28, name: "Action" },
            { id: 12, name: "Adventure" },
            { id: 16, name: "Animation" },
            { id: 35, name: "Comedy" },
            { id: 80, name: "Crime" },
            { id: 99, name: "Documentary" },
            { id: 18, name: "Drama" },
            { id: 10751, name: "Family" },
            { id: 14, name: "Fantasy" },
            { id: 36, name: "History" },
            { id: 27, name: "Horror" },
            { id: 10402, name: "Music" },
            { id: 9648, name: "Mystery" },
            { id: 10749, name: "Romance" },
            { id: 878, name: "Science Fiction" },
            { id: 10770, name: "TV Movie" },
            { id: 53, name: "Thriller" },
            { id: 10752, name: "War" },
            { id: 37, name: "Western" },
          ]
        : [
            { id: 10759, name: "Action & Adventure" },
            { id: 16, name: "Animation" },
            { id: 35, name: "Comedy" },
            { id: 80, name: "Crime" },
            { id: 99, name: "Documentary" },
            { id: 18, name: "Drama" },
            { id: 10751, name: "Family" },
            { id: 10762, name: "Kids" },
            { id: 9648, name: "Mystery" },
            { id: 10763, name: "News" },
            { id: 10764, name: "Reality" },
            { id: 10765, name: "Sci-Fi & Fantasy" },
            { id: 10766, name: "Soap" },
            { id: 10767, name: "Talk" },
            { id: 10768, name: "War & Politics" },
            { id: 37, name: "Western" },
          ],
    [media_type]
  );

  const modalUpDown = () => {
    setUpDown((c) => !c);
  };

  const [height, setHeight] = useState(30);
  const [isDragging, setIsDragging] = useState(false);

  const startY = useRef(0);
  const startHeight = useRef(0);

  const handleOnTouchStart = (e) => {
    setIsDragging(true);

    startY.current = e.touches[0].clientY; // start position of touch

    startHeight.current = height; // starting height of component
  };

  const handleOnTouchMove = (e) => {
    if (isDragging) {
      const diff = e.touches[0].clientY - startY.current; // negative- for dragging up and positive- for dragging down

      let newHeight = startHeight.current - diff;

      if (newHeight < 0) newHeight = 0;
      else if (newHeight > window.innerHeight * 0.8)
        newHeight = window.innerHeight * 0.8;

      setHeight(newHeight);
    }
  };

  const handleOnTouchEnd = (e) => {
    setIsDragging(false); // stop dragging
  };

  return (
    <Container
      isModalActivate={isModalActivate}
      upDown={upDown}
      height={height}
    >
      <div className="right-edge-glow" />
      <Open
        onClick={() => modalUpDown()}
        onTouchStart={(e) => handleOnTouchStart(e)}
        onTouchMove={(e) => handleOnTouchMove(e)}
        onTouchEnd={(e) => handleOnTouchEnd(e)}
      >
        {upDown ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
      </Open>
      <Header>
        <FilterIcon size={20} color="#5D9CEC" />
        <div className="header">Filters</div>
      </Header>

      <div className="group">
        <Section>
          <SectionHeader onClick={() => toggleSection("sort")}>
            <h3>Sort Results</h3>
            {expandedSection === "sort" ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </SectionHeader>

          <SectionContent $isVisible={expandedSection === "sort"}>
            <SelectWrapper>
              <select
                className="sort"
                name="sort"
                id="sort"
                value={sort}
                onChange={handleOnChange}
              >
                <option value="popularity.desc">Most Popular</option>
                <option value="vote_average.desc">Most Rated</option>
                <option value="primary_release_date.desc">Most Recent</option>
              </select>
            </SelectWrapper>
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader onClick={() => toggleSection("filter")}>
            <h3>Filter</h3>
            {expandedSection === "filter" ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </SectionHeader>

          <SectionContent $isVisible={expandedSection === "filter"}>
            <h3 className="genres">Genres</h3>
            <GenreGrid>
              {genreList.map((genre) => (
                <GenreTag
                  key={genre.id}
                  $isActive={genres.includes(genre.id)}
                  onClick={() => toggleGenre(genre.id)}
                >
                  {genre.name}
                </GenreTag>
              ))}
            </GenreGrid>
            <br />

            <FilterGroup icon={<Clock size={18} />} title="Runtime">
              <select
                name="runtime"
                id="runtime"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "short") setLength(1);
                  else if (value === "medium") setLength(2);
                  else if (value === "long") setLength(3);
                  else setLength(null);
                  console.log("hello i am length " + value);
                }}
              >
                <option value="all">All</option>
                <option value="short">Less than 90 min</option>
                <option value="medium">90-120 min</option>
                <option value="long">More than 120 min</option>
              </select>
            </FilterGroup>

            <FilterGroup icon={<Star size={18} />} title="Rating">
              <select
                name="rating"
                id="rating"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "high") setRating(1);
                  else if (value === "medium") setRating(2);
                  else if (value === "low") setRating(3);
                  else setRating(null);
                }}
              >
                <option value="all">All</option>
                <option value="high">8+ Rating</option>
                <option value="medium">6-8 Rating</option>
                <option value="low">Below 6</option>
              </select>
            </FilterGroup>
          </SectionContent>
        </Section>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  right: 0;
  background-color: #12141d;
  color: #f1f1f1;
  width: 29vw;
  height: 100vh;
  overflow-y: auto;
  border-left: 1px solid #2a2a36;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.6);
  border-radius: 0 8px 8px 0;

  .right-edge-glow {
    position: fixed;
    top: 0;
    right: 29vw;
    width: 1px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(139, 92, 246, 0.2),
      rgba(245, 100, 248, 0.2),
      rgba(139, 92, 246, 0.2),
      white
    );
    z-index: 50000;
  }

  @media (max-width: 768px) {
    ${(props) => (props.isModalActivate ? "bottom: -35vh" : "bottom: 0px")};
    ${(props) => (!props.upDown ? "bottom: 0px" : "bottom: -35vh")};
    height: 40vh;
    z-index: 1000;
    width: 100vw;
    overflow-y: scroll;
    transition: bottom 0.3s ease;
  }

  @media (max-width: 480px) {
  }

  &::-webkit-scrollbar {
    width: thin;
  }

  &::-webkit-scrollbar-track {
    background: #1c1c24;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #5d9cec, #2a2a36);
    border-radius: 6px;
    transition: background 0.3s, box-shadow 0.2s;
    &:hover {
      background: linear-gradient(135deg, #74a5f0, #3b3b48);
      box-shadow: 0 0 8px rgba(93, 156, 236, 0.3);
    }
  }

  .group {
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
  }

  select {
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    background-color: #2a2a36;
    border-radius: 16px;
    width: 10vw;
  }
`;

const FilterGroup = ({ icon, title, children }) => (
  <Header>
    {icon}
    <h3>{title}</h3>
    {children}
  </Header>
);

const Open = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    flex-direction: row;
    height: 2rem;
    width: 100vw;
    z-index: 500;
    background-color: black;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    border-radius: 1rem 1rem 0rem 0rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #2a2a36;
  margin-left: 1rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
    height: 3.5rem;
    justify-content: center;
    align-items: center;
    padding-bottom: 0rem;
    margin-bottom: 0rem;
    gap: 0.6rem;
  }

  .header {
    font-size: 1.6rem;
    color: #5d9cec;
    font-weight: 700;
    text-shadow: 0 3px 6px rgba(93, 156, 236, 0.3);
    letter-spacing: 1px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      text-shadow: 0 1.5px 3px rgba(93, 156, 236, 0.3);
      letter-spacing: 0.5px;
    }
  }

  svg {
    color: #5d9cec;
  }
`;
const Section = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  background-color: #2a2a36;
  transition: all 0.3s ease;
  width: 95%;
  margin-left: 1rem;
  @media (max-width: 768px) {
    padding: 0.8rem 0.8rem;
  }

  &:hover {
    background: #1c1c24;
    box-shadow: 0 6px 12px rgba(93, 156, 236, 0.3);
    transform: translateY(-4px);
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    color: #f1f1f1;

    @media (max-width: 768px) {
      font-size: 1.1rem;
      font-weight: 600;
    }
  }
`;

const SectionContent = styled.div`
  overflow: hidden;
  max-height: ${(props) => (props.$isVisible ? "500px" : "0")};
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};
  transition: all 0.3s ease-in-out;
  padding: ${(props) => (props.$isVisible ? "1rem 1rem" : "0")};
  gap: 0.75rem;

  .header-with-icon {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1.2rem;
  }

  .genres {
    margin-left: 1rem;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const SelectWrapper = styled.div`
  position: relative;

  .sort{
    margin-left: 1rem;
    
  }

  select {
    width: 90%;
    padding: 0.75rem;
    background-color: #2a2a36;
    color: #f1f1f1;
    border: 1px solid #5d5d66;
    border-radius: 8px;
    cursor: pointer;
    appearance: none;
    padding-right: 2.5rem;
    transition: background-color 0.3s ease, border-color 0.3s ease,
      box-shadow 0.2s ease;

    &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(93, 156, 236, 0.2);
    background-color: ${(props) => (props.$isActive ? "#74a5f0" : "#3b3b48")};
  }

    &:focus {
      outline: none;
      background-color: ;
      color: white;
      border-color: #f1f1f1;
      box-shadow: 0 0 0 2px rgba(93, 156, 236, 0.4);
    }
    }
  }

  // &::after {
  //   content: "";
  //   position: absolute;
  //   right: 1rem;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   width: 0;
  //   height: 0;
  //   border-left: 5px solid transparent;
  //   border-right: 5px solid transparent;
  //   border-top: 5px solid #5d9cec;
  //   pointer-events: none;
  //   transition: transform 0.2s;
  // }
`;

const GenreGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  max-height: 250px;
  overflow-y: auto;
  padding: 1rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: black;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #2a2a36;
    border-radius: 6px;

    // &:hover {
    //   background: #5d9cec;
    // }
  }

  @media (max-width: 768px) {
    display: flex;
    max-height: 15vh;
    flex-direction: row;
    justify-content: center;
    gap: 0.7rem;
  }
`;

const GenreTag = styled.div`
  padding: 0.75rem;
  background-color: ${(props) => (props.$isActive ? "#5d9cec" : "#2a2a36")};
  color: ${(props) => (props.$isActive ? "#12141d" : "#f1f1f1")};
  border: 1px solid ${(props) => (props.$isActive ? "#5d9cec" : "#2a2a36")};
  border-radius: 8px;
  cursor: pointer;

  font-size: 0.9rem;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s;
  user-select: none;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  l @media (max-width: 768px) {
    padding: 0.4rem;
    width: 27%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(93, 156, 236, 0.2);
    background-color: ${(props) => (props.$isActive ? "#74a5f0" : "#3b3b48")};
  }

  &:active {
    transform: translateY(1px);
  }
`;