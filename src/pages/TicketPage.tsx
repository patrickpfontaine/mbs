import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
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
  textAlign: "right",
  alignItems: "right",
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

const QRCodeContainer = styled("div")({
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
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

const TicketPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure ticket details passed via location.state
  const { name, movieTitle, theaterLocation, showTime, ticketCount } =
    location.state || {};

  if (!name || !movieTitle || !theaterLocation || !showTime) {
    return (
      <Background>
        <WhiteCanvas>
          <Title>Invalid Ticket</Title>
          <Details>
            Missing ticket details. Please go back and try again.
          </Details>
          <Button onClick={() => navigate("/PaymentPage")}>Go Back</Button>
        </WhiteCanvas>
      </Background>
    );
  }

  return (
    <Background>
      <WhiteCanvas>
        <Header>
          <HomeButton onClick={() => navigate("/homePage")}>
            <img src={HomeImage} alt="Home Page" />
          </HomeButton>
        </Header>
        <Title>Movie Ticket</Title>
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
        <Details>
          <Label>Tickets:</Label> {ticketCount}
        </Details>
        <QRCodeContainer>
          <QRCodeCanvas
            value={`${
              window.location.origin
            }/valid-ticket?name=${encodeURIComponent(
              name
            )}&movieTitle=${encodeURIComponent(
              movieTitle
            )}&theaterLocation=${encodeURIComponent(
              theaterLocation
            )}&showTime=${encodeURIComponent(showTime)}`}
            size={150}
          />
        </QRCodeContainer>
        <Button onClick={() => navigate("/homePage")}>Go to Home</Button>
      </WhiteCanvas>
    </Background>
  );
};

export default TicketPage;