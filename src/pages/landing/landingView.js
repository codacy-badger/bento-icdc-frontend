/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import StatsView from './components/statsView';
import { Button } from '../../components/Wrappers/Wrappers';
import { landingPageData } from '../../bento/landingPageData';
import icon from '../../assets/landing/LP_ReadMore.svg';
import iconAbout from '../../assets/landing/LP_About_Fullarticle.Arrow.svg';
import starImg from '../../assets/LP_FLARE.2.png';
import dogImg from '../../assets/landing/dog-bubble.png';
import humanImg from '../../assets/landing/human-bubble.png';

const slideDown = keyframes`
  0% {
    top: 0;
    left:0;
  }
  50% {
    top: 350px;
    left: 30px;
  }

  100% {
    top: 0;
    left:0;
  }
`;

const slideUp = keyframes`
  0% {

    top: 0;
    left:0;
  }

  50% {
    top:-390px;
    left:0px;
  }

  
  100% {
    top: 0;
    left:0;
  }
`;

const star = keyframes`
  0% {
    opacity: 0;
  }

  8%{
    opacity: 0;
  }

  25%{
    opacity: 1;
  }

  32%{
    opacity: 0;
  }

  58%{
    opacity: 0;
  }

  65% {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

`;

const SlideDown = styled.div`
  animation: ${slideDown} 20s  0s 1;
`;

const SlideUp = styled.div`
  animation: ${slideUp} 20s  0s 1;
`;

const Star = styled.div`
  animation: ${star} 20s  0s 1;
`;

const LandingView = ({ classes, statsData }) => (
  <div className={classes.page}>
    <div className={classes.container}>
      <div className={classes.hero}>
        <Grid container spacing={16} direction="row">
          <div className={classes.heroImage} />
          <div className={classes.heroTextContainer}>
            <div className={classes.heroTextWrapper}>
            <Grid container spacing={16} direction="row">
             <Grid item lg={3} md={3} sm={12} xs={12}>
              <div className={classes.headerTitle}>
                { landingPageData.callToActionTitle }
              </div>
              <div className={classes.headerContent}>
                { landingPageData.callToActionDescription}
              </div>
              <div className={classes.headerButtonSection}>
                <Link to={landingPageData.callToActionLink} className={classes.headerLink}>
                  <Button className={classes.buttonText}>
                    {landingPageData.callToActionButtonText}
                  </Button>
                </Link>
              </div>
              </Grid>
              <Grid item lg={9} md={9} sm={12} xs={12}>
               <div>
                <div className={classes.animationContainer}>
                  <SlideDown className={classes.dog}>
                    <img className={classes.dogImg} src={dogImg} alt="Dog" />
                  </SlideDown>
                  <SlideUp className={classes.human}>
                    <img className={classes.humanImg} src={humanImg} alt="human" />
                  </SlideUp>
                  <Star className={classes.star}>
                    <img className={classes.starImg} src={starImg} alt="star" />
                  </Star>
                </div>
              </div>
              </Grid>
             </Grid>
            </div>
          </div>
        </Grid>
      </div>
    </div>
    {
      statsData ? <StatsView stats={landingPageData.landingPageStatsBar} statsData={statsData} /> : ''
    }
    <div className={classes.container}>
      <div className={classes.texture}>
        <Grid container spacing={16} direction="row" className={classes.landingContainer}>
          <div className={classes.contentLeft}>
            <div className={classes.about}>
              <div className={classes.aboutImageSection}>
                <img
                  src={landingPageData.tile1.img}
                  className={classes.aboutImage}
                  alt={landingPageData.tile1.alt}
                />
              </div>
              <div className={classes.DCWords}>
                {landingPageData.tile1.titleText}
              </div>
              <div className={classes.aboutContent}>
                {landingPageData.tile1.descriptionText}
              </div>
              <div className={classes.aboutButtonSection}>
                <div className={classes.aboutButtonLeft}>
                  <img src={iconAbout} className={classes.iconAbout} alt="CTDC about icon" />
                </div>
                <div className={classes.aboutButtonRight}>
                  <Link
                    to={landingPageData.tile1.callToActionLink}
                    className={classes.aboutButton}
                  >
                    {landingPageData.tile1.callToActionText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.contentRight}>
            <div className={classes.contentRightTop}>
              <div className={classes.program}>
                <div className={classes.programImg}>
                  <img
                    className={classes.image}
                    src={landingPageData.tile2.img}
                    alt={landingPageData.tile2.alt}
                  />
                </div>
                <div className={classes.content}>
                  <div className={classes.contentHeader}>
                    {landingPageData.tile2.titleText}
                  </div>
                  <div className={classes.contentContainer}>
                    {landingPageData.tile2.descriptionText}
                  </div>

                </div>
                <div className={classes.blueButton}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.icon} src={icon} alt="CTDC about " />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight}>
                    <Link
                      to={landingPageData.tile2.callToActionLink}
                      className={classes.blueButton}
                    >
                      {landingPageData.tile2.callToActionText}
                    </Link>
                  </div>
                </div>
              </div>
              <div className={classes.studies}>
                <div className={classes.programImg}>
                  <img
                    className={classes.image}
                    src={landingPageData.tile3.img}
                    alt={landingPageData.tile3.src}
                  />
                </div>
                <div className={classes.content}>
                  <div className={classes.contentHeader}>
                    {landingPageData.tile3.titleText}
                  </div>
                  <div className={classes.contentContainer}>
                    {landingPageData.tile3.descriptionText}
                  </div>

                </div>
                <div className={classes.blueButton}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.icon} src={icon} alt="CTDC about " />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight}>
                    <Link
                      to={landingPageData.tile3.callToActionLink}
                      className={classes.blueButton}
                    >
                      {landingPageData.tile3.callToActionText}
                    </Link>
                  </div>
                </div>
              </div>

            </div>
            <div className={classes.contentRightBottom}>
              <div className={classes.cases}>
                <div className={classes.mountainMeadowContentHeader}>
                  {landingPageData.tile4.titleText}
                </div>
                <div className={classes.mountainMeadowContent}>
                  {landingPageData.tile4.descriptionText}
                </div>
                <div className={classes.mountainMeadowButtonSection}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.mountainMeadowIcon} src={icon} alt="CTDC about " />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight}>
                    <Link
                      to={landingPageData.tile4.callToActionLink}
                      className={classes.mountainMeadowButton}
                    >
                      {landingPageData.tile4.callToActionText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>

    </div>
  </div>
);
const styles = () => ({
  page: {
    marginTop: '-47px',
    background: '#5E8CA5',
    backgroundImage: `url(${landingPageData.landingPageBg.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  },
  heroImage: {
    width: '100%',
    height: '420px',
  },
  texture: {
    padding: '120px 0 80px 0',
  },
  container: {
    fontFamily: 'Raleway, sans-serif',
    margin: '0 auto',

  },
  redButton: {
    height: '13px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '47px',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  headerTitle: {
    paddingTop: '180px',
    paddingBottom: '12px',
    width: '208px',
    color: '#FFFFFF',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '40px',
    fontWeight: 'bold',
    lineHeight: '40px',
  },
  paddingLeft50: {
    paddingLeft: '50px',
  },
  headerContent: {
    height: '98px',
    width: '194px',
    color: '#CB8311',
    fontFamily: 'Raleway',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '22px',
    marginBottom: '40px',
  },
  headerLink: {
     color: '#ffffff',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#CB8311',
      textDecoration: 'none',
    },
  },
  iconAbout: {
    height: '17px',
    width: '9px',
    marginTop: '15px',
    marginLeft: '20px',
  },
  icon: {
    width: '20px',
    marginTop: '13px',
    marginLeft: '23px',
  },

  aboutImage: {
    width: '300px',
    height: '240px',
  },
  aboutImageSection: {
    height: '240px',
  },
  DCWords: {
    height: '193px',
    background: 'rgb(57,192,240,0.3)',
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '27px',
    padding: '35px',
  },
  landingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLeft: {
    float: 'left',
    paddingRight: '10px',
  },
  about: {
    width: '300px',
  },
  image: {
    width: '293px',
    height: '249px',
  },
  aboutContent: {
    background: 'white',
    minHeight: '372px',
    width: '300px',
    padding: '30px 30px 32px 30px',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '22px',
  },
  aboutButtonSection: {
    background: 'white',
    height: '71px',
  },
  imgIconAbout: {
    width: '49px',
  },
  aboutButtonLeft: {
    float: 'left',
    background: '#443CBB',
    height: '45px',
    width: '48px',
  },
  aboutButtonRight: {
    background: '#7747FF',
    float: 'left',
    height: '45px',
    width: '132px',
  },
  aboutButton: {
    color: '#ffffff',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '45px',
    paddingLeft: '20px',
    boxShadow: 'none',
    letterSpacing: '1px',
  },

  content: {
    width: '100%',
    height: '155px',
    overflowY: 'auto',
    background: '#fff',
    paddingLeft: '30px',
    paddingTop: '5px',
    minHeight: '138px',
  },
  contentHeader: {
    color: '#033D6F',
    fontFamily: 'Lato',
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: '27px',
    padding: '10px 0',
  },
  contentContainer: {
    width: '215px',
    color: '#010101',
    fontFamily: 'Nunito',
    fontSize: '16px',
    lineHeight: '22px',
    paddingLeft: '2px',
    paddingBottom: '10px',
  },

  program: {
    float: 'left',
    padding: '0 10px 6.8px 0px',
  },
  programImg: {
    background: '#fff',
    height: '249px',
  },
  studies: {
    float: 'left',
  },

  contentRightBottom: {
    float: 'left',
    width: '597px',
    background: '#fff',
    backgroundImage: `url(${landingPageData.tile4.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cases: {
    height: '436px',
    paddingLeft: '340px',
    paddingTop: '70px',
  },
  mountainMeadowButtonSection: {
    height: '46px',
    width: '176px',
    backgroundColor: '#10A075',
    marginTop: '20px',

  },
  blueButton: {
    height: '45px',
    background: '#0077E3',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',
    textDecoration: 'none',
    letterSpacing: '1px',
  },
  blueButtonLeft: {
    float: 'left',
  },
  blueButtonRight: {
    float: 'left',
    lineHeight: '44px',
    marginLeft: '8px',
    fontFamily: 'Lato',
    fontSize: '14px',
    color: '#fff',
    textTransform: 'uppercase',
  },
  mountainMeadowContentHeader: {
    color: '#033D6F',
    fontFamily: 'Lato',
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: '32px',
    padding: '15px 0',
  },
  mountainMeadowContent: {
    height: '143px',
    width: '230px',
    color: '#010101',
    fontFamily: 'Nunito',
    fontSize: '15px',
    lineHeight: '22px',
  },
  mountainMeadowIcon: {
    width: '20px',
    marginTop: '12px',
    marginLeft: '28px',
  },
  mountainMeadowButton: {
    padding: '15px 5px 0 0',
    height: '9px',
    width: '71px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '19.31px',
    textDecoration: 'none',
    marginLeft: '8px',
    letterSpacing: '1px',
    '&:hover': {
      color: '#ffffff',
    },
  },
  paddingBottom50: {
    paddingBottom: '50px',
  },
  paddingTop30: {
    paddingTop: '30px',
  },
  animationContainer: {
    display: 'none',
    position: 'relative',
    left: '33%',
  },

  paddingLeft2: {
    paddingLeft: '2px',
  },
  heroTextContainer: {
    position: 'absolute',
    width: '400px',
    margin: 'auto',
    left: '12px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
  },
  heroTextWrapper: {
    width: '360px',
  },
  buttonText: {
    borderRadius: '10px',
    width: '178px',
    height: '37px',
    lineHeight: '18px',
    fontSize: '14px',
    fontWeight: 'bolder',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#CB8311',
    textDecoration: 'none',
    boxShadow: 'none !important',
    '&:hover': {
      backgroundColor: '#CB8311',
      color: '#ffffff',

    },

  animationContainer: {
    position: 'relative',
    height: '800px',
    maxHeight: '800px',
    overflow: 'hidden',
  },

dogImg: {
  },
  humanImg: {
    position: 'absolute',
    top: '-800px',
    left: '350px',
  },
  starImg: {
    width: '300px',
    position: 'absolute',
    top: '-2150px',
    left: '220px',
  },

  dog: {
    position: 'relative',
    height: '1200px',
  },
  human: {
    position: 'relative',
    height: '1200px',

  },
  star: {
    position: 'relative',
    height: '1200px',
    opacity: '0',
  },
  },
});
export default withStyles(styles, { withTheme: true })(LandingView);
