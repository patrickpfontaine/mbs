import React from "react";
import { QRCodeCanvas } from "qrcode.react"; // Use QRCodeCanvas for rendering the QR code
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

const TicketContainer = styled("div")({
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "40px",
  width: "100%",
  maxWidth: "500px",
  margin: "20px auto",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
});

const QRCodeContainer = styled("div")({
  marginTop: "20px",
  display: "flex",
  justifyContent: "flex-end",
});

const TicketPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, movieTitle, theaterLocation, showTime } = location.state || {};

  if (!name || !movieTitle || !theaterLocation || !showTime) {
    return (
      <TicketContainer>
        <h2>Invalid Ticket</h2>
        <p>Missing ticket details. Please go back and try again.</p>
        <button onClick={() => navigate("/PaymentPage")}>Go Back</button>
      </TicketContainer>
    );
  }

  return (
    <TicketContainer>
      <h2>Movie Ticket</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Movie:</strong> {movieTitle}
      </p>
      <p>
        <strong>Theater:</strong> {theaterLocation}
      </p>
      <p>
        <strong>Showtime:</strong> {showTime}
      </p>
      <QRCodeContainer>
        <QRCodeCanvas
          value={`${window.location.origin}/valid-ticket`}
          size={100}
        />
      </QRCodeContainer>
    </TicketContainer>
  );
};

export default TicketPage;
