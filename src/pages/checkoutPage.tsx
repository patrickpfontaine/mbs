import React, { useEffect, useState } from "react";
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
  backgroundColor: "blue",
  //borderRadius: "10px",
  width: "100%",

  display: "flex",
  flexDirection: "row",

  margin: "0px",

  alignSelf: "flex-start",
});

const MoviePosterContainer = styled("div")({
  //padding: "0",
  backgroundColor: "lightgray",
  borderRadius: "10px",
  width: "100%",
  maxWidth: "30%",
  display: "flex",
  flexDirection: "column",
  //gap: "10px",
  margin: "0px",
  //marginBottom: "20px",
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

const HomeButton = styled("button")({
  background: "none",
  border: `none`,
  cursor: "pointer",
  //padding: `10px`,
});

const MovieInfoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start",
  //alignItems: "center",
  gap: "20px",
  width: "100%",
  maxWidth: "600px",
});

const MovieInfo = styled("p")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "18px",
  flexDirection: "row",
  //textAlign: "center",
});

const Label = styled("span")({
  fontWeight: "bold",
  marginRight: "10px",
  //flexDirection: "column",
  //alignSelf: "flex-start",
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
  height: '80px',
  //resize: none,
});

const ReviewList = styled("div")({
  display: `grid`,
  gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
  gap: `40px`,
  width: `100%`,
  resize: 'none',
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
  reviews: Review[]
}

interface Review {
  id:       string;
  username: string;
  date:     string;
  comment:  string;
}

function CheckoutPage(): JSX.Element {
  const switchPage = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  const { reviewId } = useParams<{ reviewId: string }>();
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
            <Label>Year: {movie.year}</Label>
          </MoviePosterContainer>
          <MovieInfoContainer>
            <MovieInfo>
              <Label>Year:</Label> {movie.year}
              <Label>Location:</Label> {movie.location}
              <Label>Time:</Label> {movie.time}
              <Label>Price:</Label> ${movie.price}
              <Label>Cast:</Label> {movie.cast}
              <Label>Movie Length:</Label> {movie.movieLength} hours
              <Label>Status:</Label> {movie.status}
            </MovieInfo>
          </MovieInfoContainer>
        </ContentContainer>
        <ReviewTitle>Reviews</ReviewTitle>
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
        </ReviewList>
      </WhiteCanvas>
    </Background>
  );
}

export default CheckoutPage;
