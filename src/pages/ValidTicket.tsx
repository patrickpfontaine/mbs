import React from "react";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import HomeImage from "../images/HomeIcon.png";

const Background = styled("div")({
  background: `linear-gradient(180deg, rgb(74, 50, 209) 0%, rgb(0, 0, 0) 100%)`,
  display: `flex`,
  flexDirection: `column`,
  width: `100%`,
  minHeight: `100vh`,
  justifyContent: `center`,
  alignItems: `center`,
  boxSizing: `border-box`,
  overflow: `hidden`,
});

const WhiteCanvas = styled("main")({
  backgroundColor: `rgba(255, 255, 255, 1)`,
  borderRadius: `20px`,
  padding: `40px`,
  width: `100%`,
  maxWidth: `600px`,
  boxSizing: `border-box`,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
});

const Header = styled("header")({
  width: `100%`,
  display: `flex`,
  justifyContent: `flex-end`,
  alignItems: `center`,
  marginBottom: `20px`,
});

const HomeButton = styled("button")({
  background: "none",
  border: `none`,
  cursor: "pointer",
});

const Title = styled("h1")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "20px",
  textAlign: "center",
});

const Details = styled("p")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "18px",
  marginBottom: "10px",
  textAlign: "left",
  width: "100%",
});

const Label = styled("span")({
  fontWeight: "bold",
});

const Button = styled("button")({
  marginTop: "20px",
  padding: "10px 20px",
  fontSize: "16px",
  color: "#fff",
  backgroundColor: "rgba(74, 50, 209, 1)",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(74, 50, 209, 0.8)",
  },
});

const ValidTicketPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const movieTitle = queryParams.get("movieTitle");
  const theaterLocation = queryParams.get("theaterLocation");
  const showTime = queryParams.get("showTime");

  if (!name || !movieTitle || !theaterLocation || !showTime) {
    return (
      <Background>
        <WhiteCanvas>
          <Title>Invalid Ticket</Title>
          <Details>
            Missing ticket details. Please scan a valid QR code.
          </Details>
        </WhiteCanvas>
      </Background>
    );
  }

  return (
    <Background>
      <WhiteCanvas>
        <Header>
          <HomeButton onClick={() => (window.location.href = "/homePage")}>
            <img src={HomeImage} alt="Home Page" />
          </HomeButton>
        </Header>
        <Title>Valid Ticket</Title>
        <Details>
          <Label>Name:</Label> {name}
        </Details>
        <Details>
          <Label>Movie:</Label> {movieTitle}
        </Details>
        <Details>
          <Label>Theater:</Label> {theaterLocation}
        </Details>
        <Details>
          <Label>Showtime:</Label> {showTime}
        </Details>
        <Button onClick={() => (window.location.href = "/homePage")}>
          Go to Home
        </Button>
      </WhiteCanvas>
    </Background>
  );
};

export default ValidTicketPage;
