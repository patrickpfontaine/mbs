import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import HomeImage from "../images/HomeIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  ref,
  get,
  push,
  remove,
  update,
  serverTimestamp,
  orderByChild,
  query,
} from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import { useAuth } from "../firebase/userAuth";
import ReactStars from "react-stars";
import {
  Select,
  SelectChangeEvent,
  MenuItem,
  Button as MuiButton,
} from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';

const Background = styled("div")({
  background: `linear-gradient(180deg, rgb(74, 50, 209) 0%, rgb(0, 0, 0) 100%)`,
  display: `flex`,
  flexDirection: `column`,
  width: `100%`,
  minHeight: `100vh`,
  justifyContent: `flex-start`,
  alignItems: `center`,
  boxSizing: `border-box`,
  overflow: `hidden`,
});

const WhiteCanvas = styled("main")({
  backgroundColor: `rgba(255, 255, 255, 1)`,
  borderRadius: `20px`,
  padding: `60px`,
  width: `100%`,
  maxWidth: `85%`,
  boxSizing: `border-box`,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
});


const MovieTitle = styled("h1")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "36px",
  fontWeight: "bold",
  width: "650px",
  marginBottom: "0px",
});

const MovieInfo = styled("p")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "18px",
  backgroundColor: "white",
  textAlign: "left",
  width: "650px",
});

const Label = styled("span")({
  fontWeight: "bold",
  marginRight: "10px",
  //flexDirection: "column",
  //alignSelf: "flex-start",
});

const SmallLabel = styled("span")({
  marginRight: "10px",
  //flexDirection: "column",
  //alignSelf: "flex-start",
});

const HomeButton = styled("button")({
  background: "none",
  border: `none`,
  cursor: "pointer",
  textAlign: "right",
  alignItems: "right"
  //padding: `10px`,
});

const Header = styled("header")({
  width: `100%`,
  display: `flex`,
  justifyContent: `right`,
  alignItems: `center`,
  marginBottom: `20px`,
});

const ActionContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "800px",
  marginTop: "40px",
});

const ReviewSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px", // Adjust spacing between elements
  width: "100%",
});

const ReviewInput = styled("textarea")({
  backgroundColor: `rgb(255, 255, 255)`,
  border: `1px solid rgb(180, 178, 178)`,
  boxSizing: `border-box`,
  borderRadius: `5px`,
  width: `80%`,
  height: "80px",
  resize: "none",
  spellcheck: "true",
  wrap: "hard",
});

const Button = styled("button")({
  padding: "10px 20px",
  fontSize: "16px",
  variants: "",
  color: "#fff",
  backgroundColor: "rgba(74, 50, 209, 1)",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  alignSelf: "center", // Ensure button aligns properly
  "&:hover": {
    backgroundColor: "rgba(74, 50, 209, 0.8)",
  },
});

const Button2 = styled(MuiButton)({
  marginTop: "10px",
});

const ReviewsSection = styled("div")({
  width: "100%",
  marginTop: "30px",
});

const ReviewCard = styled("div")({
  backgroundColor: "#f9f9f9",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "10px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
});

const ReviewRating = styled("div")({
  display: "flex",
  alignItems: "center",
});

const ReviewText = styled("p")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "16px",
  margin: "10px 0",
  wrap: "hard",
  overflowWrap: "anywhere",
});
const ReviewList = styled("div")({
  display: `list`,
  gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
  gap: `40px`,
  width: `100%`,
  resize: "none",
});

const XButton = styled("button")({
  border: `none`,
  fontSize: `18px`,
  cursor: `pointer`,
  "&:hover, &:focus": {
    color: `rgb(74, 50, 209)`,
  },
});

const LocationSelect = styled(Select<string>)({
  width: "100%",
  maxWidth: "300px",
  marginBottom: "20px",
});

const TimeButtonsContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "left",
  gap: "10px",
  marginBottom: "20px",
});

const MoviePoster = styled("div")({
  position: `relative`,
  width: `100%`,
  paddingTop: `140%`, // 2:3 aspect ratio
  borderRadius: `10px`,
  overflow: `hidden`,
  background: `linear-gradient(45deg, DarkSlateBlue 0%, CadetBlue 100%)`,
});

interface Movie {
  id: string;
  title: string;
  year: string;
  price: string;
  cast: string;
  movieLength: string;
  status: string;
  poster: string;
  showings: Array<{
    location: string;
    times: string[];
  }>;
  synopsis: string;
}

interface Review {
  username: string;
  date: string;
  comment: string;
  createdAt: object;
  rating: number;
}

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <BaseNumberInput
      slotProps={{
        incrementButton: {
          children: '▴',
        },
        decrementButton: {
          children: '▾',
        },
      }}
      {...props}
      ref={ref}
    />
  );
});




function CheckoutPage(): JSX.Element {
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userreview, setUserReview] = useState<string>("");
  const [newReview, setNewReview] = useState({
    date: new Date().toLocaleDateString(),
    comment: userreview,
  });
  const [updateReviews, setupdateReviews] = useState(false);

  const [userData, setUserData] = useState<any>(null);
  const { user, logOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  const [numTickets, setNumTickets] = React.useState<number | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      const movieRef = ref(database, `movies/${movieId}`);
      const movieSnapshot = await get(movieRef);
      const movieData = movieSnapshot.val();
      if (movieData) {
        setMovie({ id: movieId, ...movieData });
        if (movieData.showings && movieData.showings.length > 0) {
          setSelectedLocation(movieData.showings[0].location);
          setAvailableTimes(movieData.showings[0].times);
        }
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsRef = ref(database, `movies/${movieId}/reviews`);
        const entriesQuery = query(reviewsRef, orderByChild("createdAt"));
        const snapshot = await get(entriesQuery);
        const entries: Review[] = [];
        snapshot.forEach((childSnapshot: any) => {
          entries.push({ username: childSnapshot.key, ...childSnapshot.val() });
        });

        const currentItems: Review[] = entries || [];
        const reviewArray = Object.entries(currentItems)
          .reverse()
          .map(([username, data]: [string, any]) => ({
            username,
            ...data,
          }));
        //console.log(Object.values(reviewArray));
        setReviews(Object.values(reviewArray));
      } catch (e) {
        console.error("Error updating entry: ", e);
      }
    };

    const getUserData = async () => {
      if (user) {
        const userRef = ref(database, "users/" + user.uid);
        const data = await get(userRef);
        setUserData(data.val());
        //checks if user is Admin
        const token = await user.getIdTokenResult();
        setIsAdmin(!!token.claims.admin);
      } else {
        console.log("No user found");
      }
    };

    fetchMovie();
    fetchReviews();
    getUserData();
    setupdateReviews(false);
  }, [movieId, user, updateReviews]);

  const handlePurchase = () => {
    if (!selectedTime) {
      alert("Please select a time before purchasing.");
      return;
    }
    navigate(`/PaymentPage`, {
      state: {
        movieTitle: movie.title, 
        theaterLocation: selectedLocation,
        showTime: selectedTime,
        ticketCount: numTickets,
        ticketPrice: movie.price
      },
    });
  };

  const handleAddReview = async () => {
    if (!userreview || rating === 0) {
      alert("Please add a review and select a star rating.");
      return;
    }
    if (!userData) {
      alert("Please sign in to add a review.");
      return;
    }
    const reviewsRef = ref(
      database,
      `movies/${movieId}/reviews/${userData.name}`
    );

    try {
      await update(
        ref(database, `movies/${movieId}/reviews/${userData.name}`),
        {
          comment: newReview.comment,
          date: newReview.date,
          createdAt: serverTimestamp(),
          rating: rating,
        }
      );
      console.log("Item appended to array successfully");
      //window.location.reload();
    } catch (e) {
      console.error("Error updating entry: ", e);
    }

    setUserReview("");
    setRating(0);
    setupdateReviews(true);
  };

  const handleDelete = async (username: string) => {
    const reviewsRef = ref(database, `movies/${movieId}/reviews/${username}`);
    try {
      await remove(reviewsRef);
      setupdateReviews(true);
      console.log("Item removed from array successfully");
      //window.location.reload();
    } catch (e) {
      console.error("Error updating entry: ", e);
    }
  };

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);
    setSelectedTime("");
    if (movie) {
      const selectedShowing = movie.showings.find(
        (showing: any) => showing.location === newLocation
      );
      setAvailableTimes(selectedShowing ? selectedShowing.times : []);
    }
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const homePage = () => {
    navigate("/homePage");
    navigate("/homePage");
  };

  if (!movie) {
    return (
      <Background>
        <WhiteCanvas>
          <p>Loading...</p>
          <p>Loading...</p>
        </WhiteCanvas>
      </Background>
    );
  }

  return (
    <Background>
      <WhiteCanvas>
        <Header>
          <HomeButton onClick={homePage}>
            <img src={HomeImage} alt="Home Page" />
          </HomeButton>
        </Header>
        <Box sx={{ flexGrow: 1, bgcolor: "#FFFFFF", width: "85%"}}>
          <Grid container spacing={2}>
            <Grid size={3}>
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
            </Grid>
            
            <Grid container spacing={1}>
              <Grid size={12} justifyContent={"left"} padding={"10px"}>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieInfo>
                  {movie.year}
                </MovieInfo>
                <MovieInfo>
                  {movie.cast}
                </MovieInfo>
                <MovieInfo>
                  {movie.synopsis}
                </MovieInfo>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        
        {movie.status === "Now Playing" &&    //only display purchase information if movie is now playing
          <Box justifyItems={"left"}>
            <text>Ticket price: ${movie.price}</text>
            <LocationSelect
              value={selectedLocation}
              onChange={handleLocationChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select a location
              </MenuItem>
              {movie.showings &&
                movie.showings.map((showing: any, index: any) => (
                  <MenuItem key={index} value={showing.location}>
                    {showing.location}
                  </MenuItem>
                ))}
            </LocationSelect>

            <NumberInput
              aria-label="Number of tickets"
              placeholder="Number of tickets"
              value={numTickets}
              onChange={(event, val) => setNumTickets(val)}
              min = {1}
              max = {10}
            />

            <TimeButtonsContainer>
              {availableTimes.map((time, index) => (
                <Button2
                  key={index}
                  onClick={() => handleTimeSelection(time)}
                  variant={selectedTime === time ? "contained" : "outlined"}
                  color="inherit"
                >
                  {time}
                </Button2>
              ))}
            </TimeButtonsContainer>
            
            <Button2
              onClick={handlePurchase}
              variant="contained"
              color="secondary"
              size="large"
            >
              Purchase Ticket
            </Button2>
          </Box>
        }

        <Box sx={{ flexGrow: 1, bgcolor: "#FFFFFF", width: "98%", marginTop: "70px"}}>
          <ReactStars
            count={5}
            value={rating}
            onChange={(newRating: number) => setRating(newRating)}
            size={24}
            color2={"#ffd700"}
          />
          <Grid container spacing={1}>
            <Grid size={12}>
              <ReviewInput
                placeholder="Write your review..."
                value={userreview}
                onChange={(e) => [
                  setUserReview(e.target.value.slice(0, 500)),
                  setNewReview({
                    date: new Date().toLocaleDateString(),
                    comment: e.target.value.slice(0, 500),
                  }),
                ]}
              />
            </Grid>
            <Grid size={2}>
              <Button onClick={handleAddReview}>Add Review</Button>
            </Grid>
          </Grid>
        </Box>

        <ReviewsSection>
          <h2>Reviews</h2>
          {reviews.length > 0 ? (
            <ReviewList>
              {Object.values(reviews).map((review, index) => (
                <ReviewCard key={index}>
                  <Label>
                    {review.username} • {review.date}{" "}
                  </Label>
                  {(isAdmin ||
                    (userData &&
                      review.username.toString() ===
                        userData.name.toString())) && (
                    <XButton onClick={() => handleDelete(review.username)}>
                      X
                    </XButton>
                  )}
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={24}
                    color2={"#ffd700"}
                    edit={false}
                  />
                  <ReviewText>{review.comment}</ReviewText>
                </ReviewCard>
              ))}
            </ReviewList>
          ) : (
            <p>No reviews yet. Be the first to add one!</p>
          )}
        </ReviewsSection>
      </WhiteCanvas>
    </Background>
  );
}

export default CheckoutPage;

