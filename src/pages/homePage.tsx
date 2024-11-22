import {} from '@mui/material';

import React from 'react';

import VectorImage from 'src/assets/images/HomePage_Vector.png';

import Vector1Image from 'src/assets/images/HomePage_Vector.png';

import Vector2Image from 'src/assets/images/HomePage_Vector.png';

import {
    styled
} from '@mui/material/styles';

const HomePage1: any = styled("div")({
    background: `linear-gradient(180deg, rgba(74, 50, 209, 1) -3.0616171314629196e-15%, rgba(0, 0, 0, 1) 99.99999999999999%)`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    width: `1440px`,
    height: `1024px`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    overflow: `hidden`,
});

const Mbs: any = styled("div")({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(255, 255, 255, 1)`,
    fontStyle: `normal`,
    fontFamily: `Montserrat`,
    fontWeight: `700`,
    fontSize: `96px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    textShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
    width: `250px`,
    height: `139px`,
    position: `absolute`,
    left: `80px`,
    top: `75px`,
});

const ExperienceMoviesBett: any = styled("div")({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(205, 182, 255, 1)`,
    fontStyle: `normal`,
    fontFamily: `Montserrat`,
    fontWeight: `400`,
    fontSize: `20px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    width: `278px`,
    height: `26px`,
    position: `absolute`,
    left: `321px`,
    top: `147px`,
});

const IconPersonCircle: any = styled("div")({
    boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `70.03px`,
    height: `70.03px`,
    left: `1318px`,
    top: `90px`,
});

const Vector: any = styled("img")({
    height: `21.88px`,
    width: `47.86px`,
    position: `absolute`,
    left: `11px`,
    top: `44px`,
});

const Vector1: any = styled("img")({
    height: `26.26px`,
    width: `26.26px`,
    position: `absolute`,
    left: `22px`,
    top: `13px`,
});

const Vector2: any = styled("img")({
    height: `70.03px`,
    width: `70.03px`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
});

const Rectangle70: any = styled("div")({
    backgroundColor: `rgba(97, 150, 228, 1)`,
    borderRadius: `15px`,
    width: `292px`,
    height: `119px`,
    position: `absolute`,
    left: `352px`,
    top: `496px`,
});

const Rectangle71: any = styled("div")({
    backgroundColor: `rgba(97, 150, 228, 1)`,
    borderRadius: `15px`,
    width: `292px`,
    height: `119px`,
    position: `absolute`,
    left: `798px`,
    top: `496px`,
});

const NowPlaying: any = styled("div")({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(255, 255, 255, 1)`,
    fontStyle: `normal`,
    fontFamily: `Montserrat`,
    fontWeight: `700`,
    fontSize: `36px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    position: `absolute`,
    left: `379px`,
    top: `535px`,
});

const Upcoming: any = styled("div")({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(255, 255, 255, 1)`,
    fontStyle: `normal`,
    fontFamily: `Montserrat`,
    fontWeight: `700`,
    fontSize: `36px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    position: `absolute`,
    left: `845px`,
    top: `533px`,
});

const ViewMoviesAndBuyTick: any = styled("div")({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    color: `rgba(255, 255, 255, 1)`,
    fontStyle: `normal`,
    fontFamily: `Montserrat`,
    fontWeight: `700`,
    fontSize: `36px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    position: `absolute`,
    left: `442px`,
    top: `312px`,
});

function HomePage(): JSX.Element {
    return (
        <HomePage1>
            <Mbs>
                {`MBS`}
            </Mbs>
            <ExperienceMoviesBett>
                {`Experience Movies Better`}
            </ExperienceMoviesBett>
            <IconPersonCircle>
                <Vector src={VectorImage} loading='lazy' alt={"Vector"}/>
                <Vector1 src={Vector1Image} loading='lazy' alt={"Vector"}/>
                <Vector2 src={Vector2Image} loading='lazy' alt={"Vector"}/>
            </IconPersonCircle>
            <Rectangle70>
            </Rectangle70>
            <Rectangle71>
            </Rectangle71>
            <NowPlaying>
                {`Now playing`}
            </NowPlaying>
            <Upcoming>
                {`Upcoming`}
            </Upcoming>
            <ViewMoviesAndBuyTick>
                {`View Movies and Buy Tickets!`}
            </ViewMoviesAndBuyTick>
        </HomePage1>);
    }

export default HomePage;
    