import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

const SignUp1 = styled("div")({
  background: `linear-gradient(180deg, rgba(74, 50, 209, 1) -3.0616171314629196e-15%, rgba(0, 0, 0, 1) 99.99999999999999%)`,
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  width: `100%`,
  height: `100vh`,
  justifyContent: `flex-start`,
  alignItems: `center`,
  padding: `0px`,
  paddingTop: `10vh`,
  boxSizing: `border-box`,
  overflow: `hidden`,
});

const WhiteBorder = styled("div")({
  backgroundColor: `rgba(255, 255, 255, 1)`,
  borderRadius: `10px`,
  width: `528px`,
  height: `579px`,
  position: `absolute`,
  left: `50%`,
  top: `50%`,
  transform: `translate(-50%, -35%)`,
  padding: `30px`,
  boxSizing: `border-box`,
});

const Mbs = styled("div")({
  textAlign: `center`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(255, 255, 255, 1)`,
  fontStyle: `normal`,
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: `700`,
  fontSize: `96px`,
  letterSpacing: `2px`,
  textDecoration: `none`,
  textTransform: `none`,
  position: `absolute`,
  left: `50%`,
  top: `40px`,
  transform: `translateX(-50%)`,
  marginBottom: `0px`,
});

const Slogan = styled("div")({
  textAlign: `center`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(205, 182, 255, 1)`,
  fontStyle: `normal`,
  fontFamily: `Robotto, sans-serif`,
  fontWeight: `100`,
  fontSize: `20px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  position: `absolute`,
  left: `50%`,
  top: `160px`,
  transform: `translateX(-50%)`,
  marginBottom: `30px`,
});

const SignUp2 = styled("h2")({
  textAlign: `center`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(0, 0, 0, 1)`,
  fontStyle: `normal`,
  fontFamily: `Inter`,
  fontWeight: `700`,
  fontSize: `40px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  margin: `0 0 15px 0`,
});

const InputLabel = styled("label")({
  display: `block`,
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(0, 0, 0, 1)`,
  fontStyle: `normal`,
  fontFamily: `Inter`,
  fontWeight: `500`,
  fontSize: `14px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  marginBottom: `5px`,
});

const Input = styled("input")({
  backgroundColor: `rgba(255, 255, 255, 1)`,
  border: `1px solid rgba(180, 178, 178, 1)`,
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
  color: `rgba(255, 255, 255, 1)`,
  fontStyle: `normal`,
  fontFamily: `Inter`,
  fontWeight: `600`,
  fontSize: `14px`,
  border: `none`,
  cursor: `pointer`,
  marginTop: `15px`,
});

const HoverStyle = styled(Link)({
  textDecoration: 'none',
  cursor: 'pointer',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const AlreadyHaveAnAccount = styled("div")({
  textAlign: `center`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(97, 150, 228, 1)`,
  fontStyle: `normal`,
  fontFamily: `Inter`,
  fontWeight: `700`,
  fontSize: `14px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  position: `absolute`,
  left: `50%`,
  bottom: `0%`,
  transform: `translateX(-50%)`,
  marginBottom: `10px`,
});

function SignUp(): JSX.Element {
  const switchPage = useNavigate();
    
  const handleSignIn = () => {
    switchPage('/signin');//user already has account
  };

  const handleSignUp = () => {
                            //create account for user
  };
  
  return (
    <SignUp1>
      <Mbs>{`MBS`}</Mbs>
      <Slogan>{`Experience Movies Better`}</Slogan>
      <WhiteBorder>
        <SignUp2>{`Sign Up`}</SignUp2>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" type="email" />
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input id="password" type="password" />
        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
        <Input id="confirmPassword" type="password" />
        <InputLabel htmlFor="homeAddress">Home Address</InputLabel>
        <Input id="homeAddress" type="text" />
        <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
        <Input id="phoneNumber" type="tel" />
        <SignUpButton onClick = {handleSignUp}>
            Sign up
        </SignUpButton>
        <AlreadyHaveAnAccount>
        <HoverStyle onClick={handleSignIn}>
          Already have an account? Sign in
        </HoverStyle>
        </AlreadyHaveAnAccount>
      </WhiteBorder>
    </SignUp1>
  );
}

export default SignUp;

