import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import profileImage from "../images/profileImage.jpg";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

const Background = styled("div")({
  background: `linear-gradient(180deg, DarkSlateBlue 0%, CadetBlue 100%)`,
  display: `flex`,
  flexDirection: `column`,
  width: `100%`,
  minHeight: `100vh`,
  alignItems: `center`,
});

const WhiteCanvas = styled("div")({
  backgroundColor: `White`,
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

const Slogan = styled("p")({
  fontFamily: `Montserrat, sans-serif`,
  fontStyle: "italic",
  fontWeight: `700`,
  fontSize: `25px`,
  margin: "0",
});

const Title = styled("h2")({
  color: `rgba(0, 0, 0, 1)`,
  fontFamily: `Inter`,
  fontWeight: `550`,
  fontSize: `30px`,
  textAlign: `center`,
  marginBottom: `25px`,
});

const SearchBar = styled("div")({
  display: `flex`,
  width: `100%`,
  maxWidth: `500px`,
  marginBottom: `35px`,
});

const SearchInput = styled("input")({
  width: `100%`,
  padding: `12px 20px`,
  fontSize: `16px`,
  border: `2px solid rgba(0, 0, 0, 0.1)`,
  borderRadius: `24px`,

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
  border: `none`,
  fontFamily: `Inter`,
  fontSize: `20px`,
  backgroundColor: `white`,
  cursor: `pointer`,
  "&:hover, &:focus": {
    color: `rgb(74, 50, 209)`,
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
  borderRadius: `10px`,
  overflow: `hidden`,
  boxShadow: `0px 5px 5px rgba(0, 0, 0, 1)`,
});

//Dud movie poster for simplicity
const MoviePoster = styled("div")({
  position: `relative`,
  width: `100%`,
  paddingTop: `140%`, // 2:3 aspect ratio
  background: `linear-gradient(45deg, DarkSlateBlue 0%, CadetBlue 100%)`,
});

const MovieTitle = styled("h3")({
  fontFamily: `Inter`,
  fontSize: `24px`,
  //textAlign: `center`,
  margin: `16px 0`,
});

const ButtonWrapper = styled("button")({
  background: "none",
  border: `none`,
  cursor: "pointer",
  //padding: `0px`,
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
  posterURL: string;
}

function HomePage(): JSX.Element {
  const switchPage = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<string>("Now Playing");

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const moviesRef = ref(database, "movies");
    const allmovieData = await get(moviesRef);
    const movieData = allmovieData.val();
    const moviesArray = Object.entries(movieData).map(
      ([id, data]: [string, any]) => ({
        id,
        ...data,
      })
    );
    setMovies(moviesArray);
  };

  const profilePage = () => {
    switchPage("/profilePage");
  };

  const checkoutPage = (movieId: string) => {
    switchPage(`/checkoutPage/${movieId}`);
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      (search !== "" &&
        movie.title.toLowerCase().includes(search.toLowerCase())) ||
      (search === "" && movie.status === filter)
    );
  });

  return (
    <Background>
      <WhiteCanvas>
        <Header>
          <div>
            <MBS>MBS</MBS>
            <Slogan>Experience Movies Better</Slogan>
          </div>
          <ButtonWrapper onClick={profilePage}>
            <img src={profileImage} alt="Profile Page" />
          </ButtonWrapper>
        </Header>

        <Title>View Movies and Buy Tickets!</Title>

        <SearchBar>
          <SearchInput
            type="search"
            value={search}
            placeholder="Search movies..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBar>

        <MovieFilters>
          <FilterButton
            onClick={() => [setFilter("Now Playing"), setSearch("")]}
          >
            Now Playing
          </FilterButton>
          <FilterButton
            onClick={() => [setFilter("Coming Soon"), setSearch("")]}
          >
            Coming Soon
          </FilterButton>
        </MovieFilters>

        <MovieCardDeck>
          {filteredMovies.map((movie) => (
            <ButtonWrapper
              onClick={() => checkoutPage(movie.id)}
              key={movie.id}
            >
              <MovieCard key={movie.id}>
                <MoviePoster>
                  <img
                    src={movie.posterURL}
                    alt=""
                    style={{
                      display: "block",
                      position: "absolute",
                      bottom: "0",
                      width: "100%",
                      paddingTop: "0%",
                    }}
                  />
                </MoviePoster>
                <MovieTitle>{movie.title}</MovieTitle>
              </MovieCard>
            </ButtonWrapper>
          ))}
        </MovieCardDeck>
      </WhiteCanvas>
    </Background>
  );
}

export default HomePage;
