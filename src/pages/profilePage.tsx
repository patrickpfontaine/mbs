import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import HomeImage from "../images/HomeIcon.png";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
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

function ProfilePage(): JSX.Element {
  const switchPage = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const { user, logOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

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

    getUserData();
  }, [user]);

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
      </WhiteCanvas>
    </Background>
  );
}

export default ProfilePage;
