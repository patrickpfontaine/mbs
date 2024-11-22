import React from 'react';
import { 
  HomePage as StyledHomePage,
  Title,
  Subtitle,
  Button,
  ButtonContainer,
  MainContent
} from '../components/reusableComponents';
import ProfileIcon from '../images/profileicon.jpg';

const HomePage: React.FC = () => {
    return (
      <StyledHomePage>
        <img src={ProfileIcon} alt="Profile" style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          cursor: 'pointer',
        }} />
        <MainContent>
          <Title>MBS</Title>
          <Subtitle>Experience Movies Better</Subtitle>
          <div>View Movies and Buy Tickets!</div>
          <ButtonContainer>
            <Button>Now playing</Button>
            <Button>Upcoming</Button>
          </ButtonContainer>
        </MainContent>
      </StyledHomePage>
    );
  }
  

export default HomePage;

