import React, { useState, useEffect, ChangeEvent } from "react";
import { ref, get, push, remove } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import { styled } from "@mui/material/styles";
import profileImage from "../images/profileImage.jpg";
import { useNavigate } from "react-router-dom";

const Background = styled("div")({
  background: `linear-gradient(180deg, Maroon 0%, black 100%)`,
  display: `flex`,
  flexDirection: `column`,
  width: `100%`,
  minHeight: `100vh`,
  alignItems: `center`,
});

const WhiteCanvas = styled("div")({
  backgroundColor: `rgb(255, 255, 255)`,
  padding: `40px`,
  width: `100%`,
  maxWidth: `85%`,
  boxSizing: `border-box`,
  display: `flex-start`,
  flexDirection: `column`,
  alignItems: `center`,
  borderRadius: `20px`,
});

const Header = styled("header")({
  width: `100%`,
  display: `flex`,
  justifyContent: `space-between`,
  alignItems: `center`,
  marginBottom: `10px`,
});

const MBS = styled("h1")({
  color: `rgb(74, 50, 209)`,
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
  marginBottom: "0",
});

const Title = styled("h1")({
  color: "Maroon",
  fontFamily: "Inter",
  fontSize: "36px",
  marginBottom: "20px",
});

const AdminDisplay = styled("div")({
  padding: "10px",
  borderRadius: "10px",
  border: "1  black",
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  marginBottom: "20px",
  alignSelf: "flex",
  //justifyContent: "space-between",
  //alignItems: "center",
});

const Input = styled("input")({
  padding: "10px",
  borderRadius: "5px",
  border: "1  black",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "20px",
  alignSelf: "flex-start",
  //justifyContent: "space-between",
  //alignItems: "center",
});

const Button = styled("button")({
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "DarkRed",
  color: "white",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "OrangeRed",
  },
});

const MovieList = styled("ul")({
  //listStyle: "none",
  //padding: 0,
  width: "100%",
  alignSelf: "flex",
  //alignItems: "center",
});

const MovieItem = styled("li")({
  backgroundColor: "#LightCoral",
  padding: "10px",
  borderRadius: "5px",
  marginBottom: "10px",
  display: "flex",
  alignSelf: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Select = styled("select")({
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid black",
  marginBottom: "20px",
  alignSelf: "flex",
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

function AdminPage() {
  const switchPage = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    year: "",
    location: "",
    time: "",
    price: "",
    cast: "",
    movieLength: "",
    status: "Now Playing",
  });

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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const moviesRef = ref(database, "movies");
    await push(moviesRef, newMovie);
    setNewMovie({
      title: "",
      year: "",
      location: "",
      time: "",
      price: "",
      cast: "",
      movieLength: "",
      status: "Now Playing",
    });
    getMovies();
  };

  const handleDelete = async (id: string) => {
    const movieRef = ref(database, `movies/${id}`);
    await remove(movieRef);
    getMovies();
  };

  const profilePage = () => {
    switchPage("/profilePage");
  };

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
        <Title>Admin: Movie Database</Title>
        <AdminDisplay>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="title"
              value={newMovie.title}
              onChange={handleInputChange}
              placeholder="Movie Title"
              required
            />
            <Input
              type="text"
              name="year"
              value={newMovie.year}
              onChange={handleInputChange}
              placeholder="Year Created"
              required
            />
            <Input
              type="text"
              name="location"
              value={newMovie.location}
              onChange={handleInputChange}
              placeholder="Location"
              required
            />
            <Input
              type="text"
              name="time"
              value={newMovie.time}
              onChange={handleInputChange}
              placeholder="Starting Time"
              required
            />
            <Input
              type="text"
              name="price"
              value={newMovie.price}
              onChange={handleInputChange}
              placeholder="Price"
              required
            />
            <Input
              type="text"
              name="cast"
              value={newMovie.cast}
              onChange={handleInputChange}
              placeholder="Cast"
              required
            />
            <Input
              type="text"
              name="movieLength"
              value={newMovie.movieLength}
              onChange={handleInputChange}
              placeholder="Movie Length"
              required
            />
            <Select
              name="status"
              value={newMovie.status}
              onChange={handleInputChange}
              required
            >
              <option value="Now Playing">Now Playing</option>
              <option value="Coming Soon">Coming Soon</option>
            </Select>
            <Button type="submit">Add Movie</Button>
          </form>
          <MovieList>
            {movies.map((movie) => (
              <MovieItem key={movie.id}>
                <span>
                  {movie.title} - {movie.year} - {movie.location} - {movie.time}{" "}
                  - ${movie.price} - {movie.movieLength} hr - {movie.cast} -{" "}
                  {movie.status}
                </span>
                <Button onClick={() => handleDelete(movie.id)}>Delete</Button>
              </MovieItem>
            ))}
          </MovieList>
        </AdminDisplay>
      </WhiteCanvas>
    </Background>
  );
}

export default AdminPage;
