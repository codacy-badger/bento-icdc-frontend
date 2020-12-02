/* eslint-disable */
// The ideal image size of landingPageHero 1400x600px
// Tile1 Tile2 Tile3 images 293x349 px
// Tile4 image optimum size 600x 436 px
export const landingPageData = {
  callToActionTitle: 'Integrated Canine Data Commons',
  callToActionDescription: 'A public resource for exploring, analyzing, and understanding the biological relationships between human and canine cancers.',
  callToActionButtonText: 'EXPLORE',
  callToActionLink: '/cases',
  landingPageBg:{
    img: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/landing/LP-Background.1400x1600.jpg',
  },
  landingPageStatsBar: [],
  tile1: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/landing/LP_About.png',
    titleText: 'About the Integrated Canine Data Commons (ICDC)',
    descriptionText: 'NCI\'s Division of Cancer Treatment and Diagnosis (DCTD) charged the Frederick National Laboratory for Cancer Research (FNLCR) to build the Integrated Canine Data Commons (ICDC), a cloud-based repository of canine cancer data. ICDC was established to further research on human cancers by enabling comparative analysis with canine cancer. The data in the ICDC is sourced from multiple different programs and projects; all focused on canine subjects.',
    callToActionText: 'FULL ARTICLE',
    callToActionLink: '/purpose', // This links to the "About" static page.
  },
  tile2: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/tileProgam.png',
    titleText: 'Programs',
    descriptionText: 'Access data from the TAILORx clinical trial, on this data sharing platform, built on Bento.',
    callToActionText: 'View',
    callToActionLink: '/programs', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/tileAnalytics.png',
    titleText: 'Resources',
    descriptionText: 'Use Bento to build your own data sharing platform.',
    callToActionText: 'Read More',
    callToActionLink: '/resources', // Link to the "Resources" Static Page
  },
  tile4: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/tileCases.png',
    titleText: 'Cases',
    descriptionText: 'Analyze cases from the TAILORx clinical trial.',
    callToActionText: 'Explore',
    callToActionLink: '/cases', // This links to the cases dashboard.
  },
};

// --------------- GraphQL query - Retrieve Landing page data --------------
export const GET_LANDING_PAGE_DATA_QUERY = false;
