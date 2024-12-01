/*import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import HomeImage from "../images/HomeIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

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
  color: `rgb(0, 0, 0)`,
  fontFamily: `Montserrat, sans-serif`,
  fontStyle: "italic",
  fontWeight: `700`,
  fontSize: `25px`,
  alignItems: `center`,
  margin: `0`,
  padding: "0",
});

const ContentContainer = styled("div")({
  //padding: "0",
  backgroundColor: "lightgray",
  borderRadius: "10px",
  width: "100%",

  display: "flex",
  flexDirection: "row",

  margin: "0px",

  alignSelf: "flex-start",
});

const MoviePosterContainer = styled("div")({
  //padding: "0",
  backgroundColor: "lightgray",
  //borderRadius: "10px",
  width: "100%",
  maxWidth: "33%",
  display: "flex",
  flexDirection: "column",
  //gap: "10px",
  margin: "0px",
  //marginBottom: "20px",
  overflow: "hidden",
  alignItems: "center",
});

const MoviePoster = styled("div")({
  width: `60%`,
  paddingTop: `80%`,
  background: `linear-gradient(180deg, DarkSlateBlue 0%, CadetBlue 100%)`,
  display: `flex`,
  flexDirection: `column`,
  borderRadius: `10px`,
});

const MovieTitle = styled("h2")({
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: `550`,
  fontSize: `36px`,
  marginBottom: `20px`,
});

const MovieInfoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "15px",
  width: "100%",
  maxWidth: "33%",
});

const MovieInfo = styled("p")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "18px",
  display: "flex",
  flexDirection: "column",
});

const Label = styled("span")({
  fontWeight: "bold",
});

const HomeButton = styled("button")({
  background: "none",
  border: `none`,
  cursor: "pointer",
});

const Loading = styled("p")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "36px",
  textAlign: "center",
});

const ReviewTitle = styled("div")({
  color: `rgb(0, 0, 0)`,
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: `700`,
  fontSize: `27px`,
  alignItems: `center`,
  margin: `0`,
  padding: "0",
  marginTop: `15px`,
});

const ReviewInput = styled("textarea")({
  backgroundColor: `rgb(255, 255, 255)`,
  border: `1px solid rgb(180, 178, 178)`,
  boxSizing: `border-box`,
  borderRadius: `5px`,
  width: `80%`,
  height: "80px",
  //resize: none,
});

const ReviewList = styled("div")({
  display: `grid`,
  gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
  gap: `40px`,
  width: `100%`,
  resize: "none",
});

const ReviewCard = styled("div")({
  display: `flex`,
  flexDirection: `column`,
  borderRadius: `10px`,
  overflow: `hidden`,
  boxShadow: `0px 5px 5px rgba(0, 0, 0, 1)`,
});

const SubmitButton = styled("button")({
  border: `none`,
  fontFamily: `Inter`,
  fontSize: `20px`,
  textDecoration: "underline",
  cursor: `pointer`,
  "&:hover, &:focus": {
    color: `rgb(74, 50, 209)`,
  },
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
  //reviews: Review[]
}

/*
interface Review {
  id:       string;
  username: string;
  date:     string;
  comment:  string;
}*/
/*
function CheckoutPage(): JSX.Element {
  const switchPage = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  //const { reviewId } = useParams<{ reviewId: string }>();
  /*
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userreview, setUserReview] = useState<string>('');

  useEffect(() => {
    const getMovie = async () => {
      const movieRef = ref(database, `movies/${movieId}`);
      const allmovieData = await get(movieRef);
      const movieData = allmovieData.val();
      setMovie({ id: movieId, ...movieData });
    };
    getMovie();
  }, [movieId]);

  /*
  const getReviews = async () => {
    const reviewsRef = ref(database, "movies");
    const allreviewsData = await get(reviewsRef);
    const reviewData = allreviewsData.val();
    const reviewsArray = Object.entries(reviewData).map(
      ([id, data]: [string, any]) => ({
        id,
        ...data,
      })
    );
    setReviews(reviewsArray);
  };
  

  const homePage = () => {
    switchPage("/homePage");
  };

  if (!movie) {
    return (
      <Background>
        <WhiteCanvas>
          <Loading>{"Loading..."}</Loading>
        </WhiteCanvas>
      </Background>
    );
  }

  return (
    <Background>
      <WhiteCanvas>
        <Header>
          <div>
            <MBS>MBS</MBS>
            <Slogan>Experience Movies Better</Slogan>
          </div>
          <HomeButton onClick={homePage}>
            <img src={HomeImage} alt="Home Page" />
          </HomeButton>
        </Header>
        <ContentContainer>
          <MoviePosterContainer>
            <MovieTitle>{movie.title}</MovieTitle>
            <MoviePoster />
          </MoviePosterContainer>
          <MovieInfoContainer>
            <MovieInfo>
              <Label>Year:</Label> {movie.year}
            </MovieInfo>
            <MovieInfo>
              <Label>Location:</Label> {movie.location}
            </MovieInfo>
            <MovieInfo>
              <Label>Time:</Label> {movie.time}
            </MovieInfo>
            <MovieInfo>
              <Label>Price:</Label> ${movie.price}
            </MovieInfo>
            <MovieInfo>
              <Label>Movie Length:</Label> {movie.movieLength} hours
            </MovieInfo>
            <MovieInfo>
              <Label>Cast:</Label> {movie.cast}
            </MovieInfo>
            <MovieInfo>
              <Label>Status:</Label> {movie.status}
            </MovieInfo>
          </MovieInfoContainer>
        </ContentContainer>
        <ReviewTitle>Reviews</ReviewTitle>
      </WhiteCanvas>
    </Background>
  );
}

export default CheckoutPage; 


 <ReviewInput  
        placeholder="Write a review..." 
        value={userreview}
        onChange={(e) => setUserReview(e.target.value)}
        /> 
        <ReviewList>
          {reviews.map((review) => (
            <ReviewCard key={review.id}>
              <MoviePoster />
              <MovieTitle>{review.username}</MovieTitle>
            </ReviewCard>
          ))}
        </ReviewList> */

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { ref, get, push } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import ReactStars from "react-stars";
import {
  Select,
  SelectChangeEvent,
  MenuItem,
  Button as MuiButton,
} from "@mui/material";

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
  padding: `40px`,
  width: `100%`,
  maxWidth: `85%`,
  boxSizing: `border-box`,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
});

const MoviePoster = styled("img")({
  borderRadius: "10px",
  width: "100%",
  maxWidth: "300px",
  marginBottom: "20px",
});

const MovieTitle = styled("h1")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "36px",
  fontWeight: "bold",
  marginBottom: "20px",
  textAlign: "center",
});

const MovieInfo = styled("p")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "18px",
  textAlign: "center",
  marginBottom: "20px",
});

const ActionContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "800px",
  marginTop: "40px",
});

const ReviewSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  width: "100%",
  marginBottom: "40px",
});

const ReviewInput = styled("textarea")({
  width: "100%",
  height: "80px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  padding: "10px",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "16px",
});

const Button = styled(MuiButton)({
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
});

const LocationSelect = styled(Select<string>)({
  width: "100%",
  maxWidth: "300px",
  marginBottom: "20px",
});

const TimeButtonsContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "10px",
  marginBottom: "20px",
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
}

function CheckoutPage(): JSX.Element {
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [userReview, setUserReview] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

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
      if (!movieId) return;
      const reviewsRef = ref(database, `movies/${movieId}/reviews`);
      const reviewsSnapshot = await get(reviewsRef);
      const reviewsData = reviewsSnapshot.val();
      if (reviewsData) {
        const reviewsArray = Object.entries(reviewsData).map(
          ([key, value]) => ({
            id: key,
            ...(value as Record<string, any>),
          })
        );
        setReviews(reviewsArray);
      }
    };

    fetchMovie();
    fetchReviews();
  }, [movieId]);

  const handlePurchase = () => {
    if (!selectedTime) {
      alert("Please select a time before purchasing.");
      return;
    }
    navigate(`/PaymentPage/${movieId}`, {
      state: { selectedLocation, selectedTime },
    });
  };

  const handleAddReview = async () => {
    if (!userReview || rating === 0) {
      alert("Please add a review and select a star rating.");
      return;
    }
    if (!movieId) return;
    const reviewsRef = ref(database, `movies/${movieId}/reviews`);
    await push(reviewsRef, {
      rating,
      review: userReview,
      date: new Date().toISOString(),
    });
    alert("Review added successfully!");
    setUserReview("");
    setRating(0);

    // Refresh reviews after adding
    const reviewsSnapshot = await get(reviewsRef);
    const reviewsData = reviewsSnapshot.val();
    if (reviewsData) {
      const reviewsArray = Object.entries(reviewsData).map(([key, value]) => ({
        id: key,
        ...(value as Record<string, any>),
      }));
      setReviews(reviewsArray);
    }
  };

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);
    setSelectedTime("");
    if (movie) {
      const selectedShowing = movie.showings.find(
        (showing) => showing.location === newLocation
      );
      setAvailableTimes(selectedShowing ? selectedShowing.times : []);
    }
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  if (!movie) {
    return (
      <Background>
        <WhiteCanvas>
          <p>Loading...</p>
        </WhiteCanvas>
      </Background>
    );
  }

  return (
    <Background>
      <WhiteCanvas>
        <MovieTitle>{movie.title}</MovieTitle>
        <MoviePoster src={movie.poster} alt={`${movie.title} poster`} />
        <MovieInfo>
          Year: {movie.year} | Length: {movie.movieLength} | Price: $
          {movie.price} | Cast: {movie.cast}
        </MovieInfo>

        <LocationSelect
          value={selectedLocation}
          onChange={handleLocationChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a location
          </MenuItem>
          {movie.showings &&
            movie.showings.map((showing, index) => (
              <MenuItem key={index} value={showing.location}>
                {showing.location}
              </MenuItem>
            ))}
        </LocationSelect>

        <TimeButtonsContainer>
          {availableTimes.map((time, index) => (
            <Button
              key={index}
              onClick={() => handleTimeSelection(time)}
              variant={selectedTime === time ? "contained" : "outlined"}
              color="primary"
            >
              {time}
            </Button>
          ))}
        </TimeButtonsContainer>

        <Button
          onClick={handlePurchase}
          variant="contained"
          color="secondary"
          size="large"
        >
          Purchase Ticket
        </Button>

        <ActionContainer>
          <ReviewSection>
            <h2>Add a Review</h2>
            <ReactStars
              count={5}
              value={rating}
              onChange={(newRating: number) => setRating(newRating)}
              size={24}
              color2={"#ffd700"}
            />
            <ReviewInput
              placeholder="Write your review..."
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
            />
            <Button
              onClick={handleAddReview}
              variant="contained"
              color="primary"
            >
              Submit Review
            </Button>
          </ReviewSection>
        </ActionContainer>

        <ReviewsSection>
          <h2>Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.id}>
                <ReviewRating>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    edit={false}
                    size={20}
                    color2={"#ffd700"}
                  />
                </ReviewRating>
                <ReviewText>{review.review}</ReviewText>
              </ReviewCard>
            ))
          ) : (
            <p>No reviews yet. Be the first to add one!</p>
          )}
        </ReviewsSection>
      </WhiteCanvas>
    </Background>
  );
}

export default CheckoutPage;
