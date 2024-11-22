import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

const SignIn1 = styled("div")({
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
  height: `413px`,
  position: `absolute`,
  left: `50%`,
  top: `50%`,
  transform: `translate(-50%, -50%)`,
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
  top: `41px`,
  transform: `translateX(-50%)`,
  marginBottom: `10px`,
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
  top: `161px`,
  transform: `translateX(-50%)`,
  marginBottom: `30px`,
});

const SignIn2 = styled("h2")({
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

const SignInButton = styled("button")({
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

const DontHaveAnAccountSig = styled("div")({
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
 // bottom: `%`,
  transform: `translateX(-50%)`,
  marginTop: `45px`,
});

function SignIn(): JSX.Element {
  const switchPage = useNavigate();

  const handleSignUp = () => {
    switchPage('/signup'); //user doesnt have an account
  };

  const handleSignIn = () => {
    switchPage('/homePage')  //user signs into account
  };
  
  return (
    <SignIn1>
      <Mbs>{`MBS`}</Mbs>
      <Slogan>{`Experience Movies Better`}</Slogan>
      <WhiteBorder>
        <SignIn2>{`Sign In`}</SignIn2>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" type="email" />       
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input id="password" type="password" />      
        <SignInButton onClick={handleSignIn}>Sign in</SignInButton>
        <DontHaveAnAccountSig> 
        <HoverStyle onClick={handleSignUp}>
          Don't have an account? Sign up
        </HoverStyle>
      </DontHaveAnAccountSig>
      </WhiteBorder>
    </SignIn1>
  );
}

export default SignIn;

