import { styled } from '@mui/material/styles';

export const HomePage = styled("div")({
  background: `linear-gradient(180deg, rgba(74, 50, 209, 1) 0%, rgba(0, 0, 0, 1) 100%)`,
  display: `flex`,
  flexDirection: `column`,
  minHeight: `100vh`,
  width: `100%`,
  padding: `2rem`,
  boxSizing: `border-box`,
  overflow: `hidden`,
});

export const Title = styled("h1")({
  color: `rgba(255, 255, 255, 1)`,
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: 700,
  fontSize: `clamp(3rem, 10vw, 6rem)`,
  textShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
  margin: `0 0 1rem 0`,
});

export const Subtitle = styled("div")({
  color: `rgba(205, 182, 255, 1)`,
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: 400,
  fontSize: `clamp(1rem, 3vw, 1.25rem)`,
  marginBottom: `2rem`,
});

export const Button = styled("button")({
  backgroundColor: `rgba(97, 150, 228, 1)`,
  borderRadius: `15px`,
  color: `rgba(255, 255, 255, 1)`,
  fontFamily: `Montserrat, sans-serif`,
  fontWeight: 700,
  fontSize: `clamp(1.25rem, 4vw, 2.25rem)`,
  padding: `1rem 2rem`,
  border: `none`,
  cursor: `pointer`,
  transition: `background-color 0.3s ease`,
  '&:hover': {
    backgroundColor: `rgba(77, 130, 208, 1)`,
  },
});

export const ButtonContainer = styled("div")({
  display: `flex`,
  justifyContent: `center`,
  gap: `2rem`,
  flexWrap: `wrap`,
  marginTop: `2rem`,
});

export const MainContent = styled("div")({
  textAlign: `center`,
  marginTop: `2rem`,
});

