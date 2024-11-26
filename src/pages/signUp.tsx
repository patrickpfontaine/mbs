import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/userAuth";

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

const WhiteCanvas = styled("div")({
  backgroundColor: `rgb(255, 255, 255)`,
  borderRadius: `10px`,
  width: `100%`,
  maxWidth: "528px",
  height: `579px`,
  position: `relative`,
  left: `0%`,
  marginTop: `15%`,
  //alignItems: `center`,
  padding: `30px`,
  boxSizing: `border-box`,
});

const Mbs = styled("div")({
  textAlign: `center`,
  color: `rgb(255, 255, 255)`,
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: `700`,
  fontSize: `96px`,
  position: `absolute`,
  top: `70px`,
});

const Slogan = styled("div")({
  color: `rgb(205, 182, 255)`,
  fontStyle: "italic",
  fontFamily: `Robotto, sans-serif`,
  fontWeight: `100`,
  fontSize: `20px`,
  position: `absolute`,
  top: `180px`,
});

const SignUpHeader = styled("h2")({
  textAlign: `center`,
  fontFamily: `Inter`,
  fontWeight: `700`,
  fontSize: `40px`,
  margin: `5px`,
});

const InputBox = styled("label")({
  display: `block`,
  textAlign: `left`,
  fontFamily: `Inter`,
  fontWeight: `500`,
  fontSize: `14px`,
  marginBottom: `5px`,
});

const Input = styled("input")({
  backgroundColor: `rgb(255, 255, 255)`,
  border: `1px solid rgb(180, 178, 178)`,
  boxSizing: `border-box`,
  borderRadius: `5px`,
  width: `100%`,
  height: `40px`,
  marginBottom: `15px`,
});

const SignUpButton = styled("button")({
  backgroundColor: `rgba(97, 150, 228, 1)`,
  borderRadius: `20px`,
  width: `100%`,
  height: `45px`,
  color: `rgb(255, 255, 255)`,
  fontFamily: `Inter`,
  fontWeight: `600`,
  fontSize: `14px`,
  border: `none`,
  cursor: `pointer`,
  marginTop: `15px`,
});

const SignInButton = styled("button")({
  border: "none",
  cursor: "pointer",
  background: "none",
  width: `100%`,
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
  },
  fontFamily: `Inter`,
  fontWeight: `700`,
  fontSize: `14px`,
  marginTop: `10px`,
});

function SignUp(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const switchPage = useNavigate();

  const SignIn = () => {
    switchPage("/signin"); //user already has account
  };

  const userSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signUp(name, email, password, homeAddress, phoneNum);
      switchPage("/signin");
      // EVENTUALLY SAVE ADDITIONAL USER INFO TO DATABASE (address and phone)
    } catch (error) {
      setError("Failed to create an account");
      console.error(error);
    }
  };

  return (
    <Background>
      <Mbs>{`MBS`}</Mbs>
      <Slogan>{`Experience Movies Better`}</Slogan>
      <WhiteCanvas>
        <SignUpHeader>{`Sign Up`}</SignUpHeader>
        {error && (
          <div style={{ color: "red", paddingTop: "30px" }}>{error}</div>
        )}
        <form onSubmit={userSignUp}>
          <InputBox htmlFor="name">Name</InputBox>
          <Input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <InputBox htmlFor="email">Email</InputBox>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputBox htmlFor="password">Password</InputBox>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <InputBox htmlFor="confirmPassword">Confirm Password</InputBox>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <InputBox htmlFor="homeAddress">Home Address</InputBox>
          <Input
            id="homeAddress"
            type="text"
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
          />
          <InputBox htmlFor="phoneNumber">Phone Number</InputBox>
          <Input
            id="phoneNumber"
            type="tel"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
          <SignUpButton onClick={userSignUp}>Sign up</SignUpButton>
        </form>

        <SignInButton onClick={SignIn}>
          Already have an account? Sign in
        </SignInButton>
      </WhiteCanvas>
    </Background>
  );
}

export default SignUp;
