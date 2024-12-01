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
  border: "10px  black",
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  marginBottom: "20px",
  alignSelf: "flex",
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

const MovieListBackground = styled("div")({
  backgroundColor: "LightCoral",
  borderRadius: "10px",
  justifyContent: "space-between",
  width: "100%",
  alignSelf: "flex",
});

const MovieListItem = styled("li")({
  //backgroundColor: "Black",
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
  marginBottom: "20px",
  alignSelf: "flex",
});

const ButtonWrapper = styled("button")({
  background: "none",
  border: `none`,
  cursor: "pointer",
});

interface MovieShowing {
  location: string;
  times: string[];
}

interface Movie {
  id: string;
  title: string;
  year: string;
  price: string;
  cast: string;
  movieLength: string;
  status: string;
  showings: MovieShowing[];
}

function AdminPage() {
  const switchPage = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState<Omit<Movie, "id">>({
    title: "",
    year: "",
    price: "",
    cast: "",
    movieLength: "",
    status: "Now Playing",
    showings: [{ location: "", times: [""] }],
  });

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const moviesRef = ref(database, "movies");
    const allmovieData = await get(moviesRef);
    const movieData = allmovieData.val();
    if (movieData) {
      const moviesArray = Object.entries(movieData).map(
        ([id, data]: [string, any]) => ({
          id,
          ...data,
        })
      );
      setMovies(moviesArray);
    } else {
      setMovies([]);
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

  const handleShowingChange = (
    showingIndex: number,
    field: "location" | "times",
    value: string,
    timeIndex?: number
  ) => {
    setNewMovie((prevMovie) => {
      const updatedShowings = [...prevMovie.showings];
      if (field === "location") {
        updatedShowings[showingIndex].location = value;
      } else if (timeIndex !== undefined) {
        updatedShowings[showingIndex].times[timeIndex] = value;
      }
      return { ...prevMovie, showings: updatedShowings };
    });
  };

  const addShowing = () => {
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      showings: [...prevMovie.showings, { location: "", times: [""] }],
    }));
  };

  const addTime = (showingIndex: number) => {
    setNewMovie((prevMovie) => {
      const updatedShowings = [...prevMovie.showings];
      // Only push a new empty string if the last time entry is not empty
      if (
        updatedShowings[showingIndex].times[
          updatedShowings[showingIndex].times.length - 1
        ] !== ""
      ) {
        updatedShowings[showingIndex].times.push("");
      }
      return { ...prevMovie, showings: updatedShowings };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const moviesRef = ref(database, "movies");
    await push(moviesRef, newMovie);
    setNewMovie({
      title: "",
      year: "",
      price: "",
      cast: "",
      movieLength: "",
      status: "Now Playing",
      showings: [{ location: "", times: [""] }],
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
          <ButtonWrapper onClick={profilePage}>
            <img src={profileImage} alt="Profile Page" />
          </ButtonWrapper>
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
            {newMovie.showings.map((showing, showingIndex) => (
              <div key={showingIndex}>
                <Input
                  type="text"
                  value={showing.location}
                  onChange={(e) =>
                    handleShowingChange(
                      showingIndex,
                      "location",
                      e.target.value
                    )
                  }
                  placeholder="Location"
                  required
                />
                {showing.times.map((time, timeIndex) => (
                  <div key={timeIndex}>
                    <Input
                      type="text"
                      value={time}
                      onChange={(e) =>
                        handleShowingChange(
                          showingIndex,
                          "times",
                          e.target.value,
                          timeIndex
                        )
                      }
                      placeholder="Time"
                      required
                    />
                  </div>
                ))}
                <Button type="button" onClick={() => addTime(showingIndex)}>
                  Add Time
                </Button>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button type="button" onClick={addShowing}>
                Add Showing
              </Button>
              <Button type="submit">Add Movie</Button>
            </div>
          </form>
          <MovieListBackground>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieListItem key={movie.id}>
                  <span>
                    {movie.title} - {movie.year} - ${movie.price} -{" "}
                    {movie.movieLength} hr - {movie.cast} - {movie.status}
                    <br />
                    Showings:{" "}
                    {movie.showings &&
                      movie.showings.map((showing, index) => (
                        <span key={index}>
                          {showing.location}: {showing.times.join(", ")}
                          {index < movie.showings.length - 1 ? " - " : ""}
                        </span>
                      ))}
                  </span>
                  <Button onClick={() => handleDelete(movie.id)}>Delete</Button>
                </MovieListItem>
              ))
            ) : (
              <p>No movies available.</p>
            )}
          </MovieListBackground>
        </AdminDisplay>
      </WhiteCanvas>
    </Background>
  );
}

export default AdminPage;
