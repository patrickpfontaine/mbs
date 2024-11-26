import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/userAuth';
import '../components/reusableComponents';

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
  width: `528px`,
  height: `413px`,
  position: `absolute`,
  top: `35%`,
  padding: `30px`,
  boxSizing: `border-box`,
});

const Mbs = styled("div")({
  textAlign: `center`,
  color: `rgba(255, 255, 255, 1)`,
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: `700`,
  fontSize: `96px`,
  position: `absolute`,
  top: `70px`,
});

const Slogan = styled("div")({
  color: `rgb(205, 182, 255)`,
  fontStyle:"italic",
  fontFamily: `Robotto, sans-serif`,
  fontWeight: `100`,
  fontSize: `20px`,
  position: `absolute`,
  top: `180px`,
});

const SignInHeader = styled("h2")({
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

const SignInButton = styled("button")({
  backgroundColor: `rgb(100, 150, 228)`,
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

const SignUpButton = styled('button')({
  border:'none',
  background:"none",
  cursor: 'pointer',
  width: `100%`,
  color: 'inherit',
  '&:hover': {
    textDecoration: 'underline',
  },
  fontFamily: `Inter`,
  fontWeight: `700`,
  fontSize: `14px`,
  marginTop: `45px`,
});


function SignIn(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const switchPage = useNavigate();
  const [error, setError] = useState('');

  
  //signs the user in through firebase
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      switchPage('/homePage');
    } catch (error) {
      setError('Failed to sign in');
    }
  };

  //brings user to SignUp page if user doesnt have an account
  const handleSignUp = () => {
    switchPage('/signup'); 
  };
  
  return (
    <Background>
      <Mbs>{`MBS`}</Mbs>
      <Slogan>{`Experience Movies Better`}</Slogan>
      <WhiteCanvas>
        <SignInHeader>{`Sign In`}</SignInHeader>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <form onSubmit={handleSignIn}>
          <InputBox htmlFor="email">Email</InputBox>
          <Input 
            //id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />       
          <InputBox htmlFor="password">Password</InputBox>
          <Input 
            //id="password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />   
          <SignInButton type="submit">Sign in</SignInButton>
        </form>
         
          <SignUpButton onClick={handleSignUp}>
            Don't have an account? Sign up
          </SignUpButton>
        
      </WhiteCanvas>
    </Background>
  );
}

export default SignIn;

