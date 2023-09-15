import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';

import '../../pages/DashboardAppPage.css'
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'auto',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      {/* <div style={{ padding: '0px', backgroundColor: '#fcf5b3', margin:0,width: '100%' }}> */}
      {/* <div style={{ padding: '0px', backgroundColor: 'moccasin', margin:0,width: '100%' }}> */}
      <div 
      data-aos="fade-left"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
      style={{ padding: '0px', backgroundColor: 'rgba(250, 233, 202, 0)', margin:0,width: '100%', backdropFilter: 'blur(20px)' }}>
      

      <Main>
      
        <Outlet />
        
      </Main>
      </div>
    </StyledRoot>
  );
}
