import React, { useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// Constants
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/original";
const SECTIONS = {
  OVERALL: "overall",
  CAST: "cast",
  CREW: "crew",
  REVIEWS: "reviews",
};

// Reusable Components
const DetailItem = memo(({ label, value }) => (
  <div className="flex-1 m-2 p-4 bg-slate-800 rounded-lg shadow">
    <strong className="block text-lg mb-1 text-blue-400">{label}</strong>
    <p className="text-white">{String(value)}</p>
  </div>
));

const MovieBanner = memo(({ movieInfo, genres, onWatch }) => (
  <div
    onClick={onWatch}
    className="relative w-full h-[40vh] rounded-xl overflow-hidden cursor-pointer group"
  >
    <img
      src={`${TMDB_IMAGE_URL}${movieInfo.backdrop_path}`}
      alt={movieInfo.title}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute bottom-8 left-6 text-white">
      <h1 className="text-3xl font-bold md:text-4xl">{movieInfo.title}</h1>
      <div className="flex flex-wrap gap-2 mt-4">
        {genres.map((genre) => (
          <span key={genre.id} className="px-3 py-1 bg-blue-500 rounded-md text-sm">
            {genre.name}
          </span>
        ))}
      </div>
    </div>
    <button
      className="absolute top-8 left-6 px-6 py-2 bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-600 transition-colors"
      onClick={onWatch}
    >
      Watch
    </button>
  </div>
));

const NavigationTabs = memo(({ currentSection, onSectionChange }) => (
  <nav className="flex justify-center gap-4 mt-6">
    {Object.entries(SECTIONS).map(([key, value]) => (
      <button
        key={value}
        onClick={() => onSectionChange(value)}
        className={`px-4 py-2 rounded-lg transition-colors ${
          currentSection === value
            ? "bg-blue-500 text-white"
            : "bg-slate-800 text-blue-400 hover:bg-slate-700"
        }`}
      >
        {key}
      </button>
    ))}
  </nav>
));

const Movie = ({
  id,
  mediaType,
  movieInfo,
  genres,
  casts,
  directors,
  writers,
  reviews,
  videos,
  story,
  isOn,
  setIsOn,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSection, setCurrentSection] = useState("OVERALL");
  const navigate = useNavigate();

  const handleWatch = useCallback(() => {
    navigate(`/watch/${mediaType}/${id}`);
  }, [navigate, mediaType, id]);

  const toggleSidebar = useCallback(() => {
    setIsOn((prev) => !prev);
  }, [setIsOn]);

  const renderOverallSection = () => (
    <div className="space-y-6">
      <div className="text-center bg-slate-800 p-4 rounded-lg">
        <h2 className="text-2xl font-bold text-blue-400">{movieInfo.tagline}</h2>
      </div>
      <div className="text-white">
        <h3 className="text-xl font-semibold text-blue-400 border-b border-blue-400 pb-2 mb-4">
          Story
        </h3>
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
          <p className="leading-relaxed">
            {isExpanded ? story : `${story.slice(0, 100)}...`}
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="ml-2 text-blue-400 hover:text-blue-300 underline"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DetailItem label="Status" value={movieInfo.status} />
        <DetailItem label="Release Date" value={movieInfo.release_date} />
        <DetailItem label="Language" value={movieInfo.language} />
        <DetailItem label="Adult Content" value={movieInfo.adult ? "Yes" : "No"} />
      </div>
    </div>
  );

  const renderCastSection = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {casts.map((cast) => (
        <div key={cast.id} className="bg-slate-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
          <img
            src={`${TMDB_IMAGE_URL}${cast.profile_path}`}
            alt={cast.name}
            loading="lazy"
            className="w-full aspect-[2/3] object-cover"
          />
          <div className="p-2 text-center">
            <h3 className="text-white font-medium">{cast.name}</h3>
            <p className="text-sm text-gray-400">as {cast.character}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCrewSection = () => (
    <div className="space-y-8">
      {[
        { title: "Directors", members: directors },
        { title: "Writers", members: writers },
      ].map(({ title, members }) => (
        <div key={title} className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-400">{title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {members.map((person) => (
              <div key={person.id} className="bg-slate-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
                <img
                  src={`${TMDB_IMAGE_URL}${person.profile_path}`}
                  alt={person.name}
                  loading="lazy"
                  className="w-full aspect-[2/3] object-cover"
                />
                <div className="p-2 text-center">
                  <h3 className="text-white font-medium">{person.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderReviewsSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-400">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-slate-800 rounded-lg p-4 transition-transform hover:scale-[1.02]"
          >
            <div className="flex items-center mb-4">
              <img
                src={`${TMDB_IMAGE_URL}${review.author_details.avatar_path}`}
                alt={review.author_details.name}
                className="w-12 h-12 rounded-full mr-4"
                loading="lazy"
              />
              <h3 className="text-white font-medium">{review.author_details.name}</h3>
            </div>
            <p className="text-gray-300">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMediaSection = () => (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Media</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative group cursor-pointer"
            onClick={() => window.open(`https://www.youtube.com/watch?v=${video.key}`, "_blank")}
          >
            <img
              src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
              alt={video.name}
              loading="lazy"
              className="w-full rounded-lg transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900 min-h-screen">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
      >
        {isOn ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
      </button>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <MovieBanner movieInfo={movieInfo} genres={genres} onWatch={handleWatch} />

        <div className="bg-slate-900 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl text-white">
              <span className="text-blue-400">Rating:</span> {movieInfo.rating}
            </div>
            <div className="text-2xl text-white">
              <span className="text-blue-400">Runtime:</span> {movieInfo.runtime}m
            </div>
          </div>

          <NavigationTabs
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />

          <div className="mt-6">
            {currentSection === "OVERALL" && renderOverallSection()}
            {currentSection === "CAST" && renderCastSection()}
            {currentSection === "CREW" && renderCrewSection()}
            {currentSection === "REVIEWS" && renderReviewsSection()}
          </div>

          {renderMediaSection()}
        </div>
      </div>
    </div>
  );
};

export default memo(Movie);