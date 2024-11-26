import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import profileImage from "../images/profileImage.jpg";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

//import { movies, Movie } from '../backend/2movieDatabase';

const Background = styled("div")({
  background: `linear-gradient(180deg, rgb(74, 50, 209) 0%, rgb(0, 0, 0) 100%)`,
  display: `flex`,
  flexDirection: `column`,
  width: `100%`,
  minHeight: `100vh`,
  justifyContent: `flex-start`,
  alignItems: `center`,
  //padding: `20px`,
  boxSizing: `border-box`,
  overflow: `hidden`,
});

const WhiteCanvas = styled("main")({
  backgroundColor: `rgba(255, 255, 255, 1)`,
  //border: `3px solid rgba(255, 255, 255, 1)`,
  borderRadius: `20px`,
  padding: `40px`,
  width: `100%`,
  maxWidth: `85%`,
  boxSizing: `border-box`,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
});

const Header = styled("header")({
  width: `100%`,
  display: `flex`,
  justifyContent: `space-between`,
  alignItems: `center`,
  marginBottom: `20px`,
});

const MBS = styled("h1")({
  color: `rgba(74, 50, 209, 1)`,
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: `700`,
  fontSize: `96px`,
  margin: `0`,
  padding: "0",
  textShadow: `4px 4px rgba(0, 0, 0, 0.25)`,
});

const SloganTxt = styled("p")({
  color: `rgb(0, 0, 0)`,
  fontFamily: `Montserrat, sans-serif`,
  fontStyle: "italic",
  fontWeight: `700`,
  fontSize: `25px`,
  alignItems: `center`,
  //alignContent: 'center',
  marginBottom: "0",
  //padding: '0',
});

const Title = styled("h2")({
  color: `rgba(0, 0, 0, 1)`,
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: `550`,
  fontSize: `36px`,
  textAlign: `center`,
  marginBottom: `20px`,
});

const SearchBar = styled("div")({
  display: `flex`,
  width: `100%`,
  maxWidth: `500px`,
  marginBottom: `40px`,
});

const SearchInput = styled("input")({
  width: `100%`,
  padding: `12px 20px`,
  fontSize: `16px`,
  border: `2px solid rgba(0, 0, 0, 0.1)`,
  borderRadius: `24px`,
  //outline: `none`,
  "&:focus": {
    borderColor: `rgba(74, 50, 209, 0.5)`,
  },
});

const MovieFilters = styled("div")({
  display: `flex`,
  justifyContent: `center`,
  gap: `20px`,
  marginBottom: `40px`,
});

const FilterButton = styled("button")({
  background: `none`,
  border: `none`,
  color: `rgba(0, 0, 0, 0.7)`,
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: `400`,
  fontSize: `20px`,
  cursor: `pointer`,
  "&:hover, &:focus": {
    color: `rgba(74, 50, 209, 1)`,
    textDecoration: "underline",
  },
});

const MovieCardDeck = styled("div")({
  display: `grid`,
  gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
  gap: `40px`,
  width: `100%`,
});

const MovieCard = styled("div")({
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  backgroundColor: `white`,
  borderRadius: `10px`,
  overflow: `hidden`,
  boxShadow: `0px 5px 5px rgba(0, 0, 0, 1)`,
});

const MoviePoster = styled("div")({
  width: `100%`,
  //maxWidth: "25%",
  paddingTop: `140%`, // 2:3 aspect ratio
  backgroundColor: `rgba(0, 0, 0, .5)`,
  position: `relative`,
});

const MovieTitle = styled("h3")({
  fontFamily: `Inter, sans-serif`,
  fontSize: `24px`,
  textAlign: `center`,
  margin: `16px 0`,
  //padding: `10px`,
});

const ProfileButton = styled("button")({
  background: "none",
  border: `none`,
  cursor: "pointer",
  //padding: `10px`,
});

interface Movie {
  id: string;
  title: string;
  year: string;
  location: string;
  time: string;
  price: string;
  cast: string;
  movieLength: string;
  status: string;
}

function HomePage(): JSX.Element {
  const switchPage = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<string>("Now Playing");

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const moviesRef = ref(database, "movies");
    const moviesData = await get(moviesRef);
    if (moviesData.exists()) {
      const movieData = moviesData.val();
      const moviesArray = Object.entries(movieData).map(
        ([id, data]: [string, any]) => ({
          id,
          ...data,
        })
      );
      setMovies(moviesArray);
    }
  };

  const profilePage = () => {
    switchPage("/profilePage");
  };

  const filteredMovies = movies.filter((movie) => movie.status === filter);

  return (
    <Background>
      <WhiteCanvas>
        <Header>
          <div>
            <MBS>MBS</MBS>
            <SloganTxt>Experience Movies Better</SloganTxt>
          </div>
          <ProfileButton onClick={profilePage}>
            <img src={profileImage} alt="Profile Page" />
          </ProfileButton>
        </Header>
        <Title>View Movies and Buy Tickets!</Title>
        <SearchBar>
          <SearchInput type="text" placeholder="Search movies..." />
        </SearchBar>
        <MovieFilters>
          <FilterButton onClick={() => setFilter("Now Playing")}>
            Now Playing
          </FilterButton>
          <FilterButton onClick={() => setFilter("Coming Soon")}>
            Coming Soon
          </FilterButton>
        </MovieFilters>
        <MovieCardDeck>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id}>
              <MoviePoster />
              <MovieTitle>{movie.title}</MovieTitle>
            </MovieCard>
          ))}
        </MovieCardDeck>
      </WhiteCanvas>
    </Background>
  );
}

export default HomePage;
