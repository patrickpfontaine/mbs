import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import HomeImage from "../images/HomeIcon.png";
import { useNavigate } from "react-router-dom";
import { ref, get, remove } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import { useAuth } from "../firebase/userAuth";
//import { getAuth } from "firebase/auth";

//import { movies, Movie } from '../backend/2movieDatabase';

const Background = styled("div")({
  background: `linear-gradient(180deg, rgb(74, 50, 209) 0%, rgb(0, 0, 0) 100%)`,
  display: `flex`,
  flexDirection: `column`,
  width: `100%`,
  minHeight: `100vh`,
  justifyContent: `flex-start`,
  alignItems: `center`,
  //padding: `20px`,
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
  fontFamily: `Montserrat, sans-serif`,
  fontStyle: "italic",
  fontWeight: `700`,
  fontSize: `25px`,
  margin: "0",
});

const Title = styled("h2")({
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: `550`,
  fontSize: `36px`,
});

const ButtonWrapper = styled("button")({
  background: "none",
  border: `none`,
  cursor: "pointer",
});

const ProfileInfo = styled("div")({
  backgroundColor: `lightgray`,
  borderRadius: `10px`,
  display: "flex",
  width: "100%",
  maxWidth: "40%",
  padding: "20px",
});

const ProfileField = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 12px",
});

const SignoutButton = styled("button")({
  backgroundColor: `CornflowerBlue`,
  borderRadius: `20px`,
  width: `100%`,
  maxWidth: "30%",
  height: `45px`,
  color: `White`,
  fontFamily: `Inter`,
  fontWeight: `600`,
  border: `none`,
  cursor: `pointer`,
  marginTop: `20px`,
});

const AdminButton = styled("button")({
  backgroundColor: `LightCoral`,
  borderRadius: `20px`,
  width: `100%`,
  maxWidth: "30%",
  height: `45px`,
  color: `black`,
  fontFamily: `Inter`,
  fontWeight: `600`,
  border: `none`,
  cursor: `pointer`,
  marginTop: `20px`,
  //marginBottom: `15px`,
});

const TicketSection = styled("div")({
  width: "100%",
  marginTop: "30px",
});

const TicketCard = styled("div")({
  backgroundColor: "#f1f1f1",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "10px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
});

const TicketText = styled("p")({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "16px",
  margin: "10px 0",
  wrap: "hard",
  overflowWrap: "anywhere",
});
const TicketList = styled("div")({
  display: `grid`,
  gridTemplateColumns: `repeat(2, minmax(100px, 1fr))`,
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

const Label = styled("button")({
  fontWeight: "bold",
  border: `none`,
  fontSize: `18px`,
  cursor: `pointer`,
  "&:hover, &:focus": {
    color: `rgb(74, 50, 209)`,
  },
});

interface Ticket {
  id: string;
  billingInfo: string;
  movieTitle: string;
  showTime: string;
  theaterLocation: string;
  ticketCount: number;
}

function ProfilePage(): JSX.Element {
  const switchPage = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const { user, logOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [updateTickets, setupdateTickets] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const userRef = ref(database, "users/" + user.uid);
        const data = await get(userRef);
        setUserData(data.val());
        //checks if user is Admin
        const token = await user.getIdTokenResult();
        setIsAdmin(!!token.claims.admin);
      } else {
        console.log("Something went wrong");
      }
    };

    const fetchTickets = async () => {
      try {
        if (user) {
          const ticketsRef = ref(database, `users/${user.uid}/tickets`);
          const snapshot = await get(ticketsRef);
          const currentItems: Ticket[] = snapshot.val() || [];
          const ticketsArray = Object.entries(currentItems)
            .map(([id, data]: [string, any]) => ({
              id,
              ...data,
            }));
          //console.log(Object.values(reviewArray));
          setTickets(Object.values(ticketsArray));
        }
      } catch (e) {
        console.error("Error updating entry: ", e);
      }
      
    };

    getUserData();
    fetchTickets();
  }, [user, updateTickets]);

  const homePage = () => {
    switchPage("/homePage");
  };

  const signOut = async () => {
    try {
      await logOut();
      switchPage("/signIn");
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const adminPage = async () => {
    try {
      switchPage("/adminPage");
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (user) {
      const ticketsRef = ref(database, `users/${user.uid}/tickets/${id}`);
      try {
        await remove(ticketsRef);
        setupdateTickets(true);
        console.log("Item removed from array successfully");
        //window.location.reload();
      } catch (e) {
        console.error("Error updating entry: ", e);
      }
    }
  };

  const handleTicketButton = async (selected_ticket: Ticket) => {
    switchPage("/ticket", {
      state: {
        name: selected_ticket.billingInfo,
        movieTitle: selected_ticket.movieTitle,
        theaterLocation: selected_ticket.theaterLocation,
        showTime: selected_ticket.showTime,
        ticketCount: selected_ticket.ticketCount,
      },
    });
  };

  return (
    <Background>
      <WhiteCanvas>
        <Header>
          <div>
            <MBS>MBS</MBS>
            <Slogan>Experience Movies Better</Slogan>
          </div>
          <ButtonWrapper onClick={homePage}>
            <img src={HomeImage} alt="Home Page" />
          </ButtonWrapper>
        </Header>
        <Title>Your Profile</Title>
        <ProfileInfo>
          <ProfileField>
            {userData && (
              <>
                <ProfileField>
                  <p>Name: {userData.name}</p>
                </ProfileField>
                <ProfileField>
                  <p>Email: {userData.email}</p>
                </ProfileField>
                <ProfileField>
                  <p>Home Address: {userData.homeAddress}</p>
                </ProfileField>
                <ProfileField>
                  <p>Phone Number: {userData.phoneNum}</p>
                </ProfileField>
              </>
            )}
          </ProfileField>
        </ProfileInfo>
        {isAdmin && <AdminButton onClick={adminPage}>Edit Movies</AdminButton>}
        <SignoutButton onClick={signOut}> Sign Out </SignoutButton>
        <TicketSection>
          <h2>Tickets</h2>
          {tickets.length > 0 ? (
            <TicketList>
              {Object.values(tickets).map((ticket, index) => (
                <TicketCard key={index}>
                  <Label onClick={() => handleTicketButton(ticket)}>
                    {ticket.movieTitle} @ {ticket.theaterLocation}
                  </Label>
                  <XButton onClick={() => handleDelete(ticket.id)}>
                    X
                  </XButton>
                  <TicketText>{ticket.showTime}</TicketText>
                  <TicketText>Amount: {ticket.ticketCount}</TicketText>
                </TicketCard>
              ))}
            </TicketList>
          ) : (
            <p>No tickets have been purchased!</p>
          )}
        </TicketSection>
      </WhiteCanvas>
    </Background>
  );
}

export default ProfilePage;
