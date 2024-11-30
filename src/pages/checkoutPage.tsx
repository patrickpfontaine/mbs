import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { ref, get, push } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import ReactStars from "react-stars";

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
});

const MovieTitle = styled("h1")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "36px",
  fontWeight: "bold",
  marginBottom: "20px",
});

const MovieInfo = styled("p")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "18px",
  textAlign: "center",
  marginBottom: "20px",
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
  width: "45%",
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

const Button = styled("button")({
  padding: "10px 20px",
  fontSize: "16px",
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

function CheckoutPage(): JSX.Element {
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const [userReview, setUserReview] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieRef = ref(database, `movies/${movieId}`);
      const movieSnapshot = await get(movieRef);
      setMovie(movieSnapshot.val());
    };

    const fetchReviews = async () => {
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
    navigate(`/payment`);
  };

  const handleAddReview = async () => {
    if (!userReview || rating === 0) {
      alert("Please add a review and select a star rating.");
      return;
    }
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
          Year: {movie.year} | Location: {movie.location} | Time: {movie.time} |
          Price: ${movie.price} | Cast: {movie.cast}
        </MovieInfo>

        <ActionContainer>
          {/* Left Section: Add Review */}
          <ReviewSection>
            <ReviewInput
              placeholder="Write your review..."
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
            />
            <ReactStars
              count={5}
              value={rating}
              onChange={(newRating: number) => setRating(newRating)}
              size={24}
              color2={"#ffd700"}
            />
            <Button onClick={handleAddReview}>Add Review</Button>
          </ReviewSection>

          {/* Right Section: Purchase Ticket */}
          <ReviewSection>
            <Button onClick={handlePurchase}>Purchase Ticket</Button>
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
