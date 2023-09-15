import { useEffect } from 'react';

// React Router DOM 
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import './index.css';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

// for just transparent nav

// const StyledRoot = styled(AppBar)(({ theme }) => ({
//   ...bgBlur({ color: theme.palette.background.default }),
//   boxShadow: 'none',
//   [theme.breakpoints.up('lg')]: {
//     width: `calc(100% - ${NAV_WIDTH + 1}px)`,
//   },
// }));


// for nav with shadow below

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: '0px 4px 6px rgba(128, 128, 128, 0.2)', // Add a yellow/gray shadow
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));


// for yellow dotted nav

// const StyledRoot = styled(AppBar)(({ theme }) => ({
//   ...bgBlur({ color: theme.palette.background.default }),
//   boxShadow: 'none',
//   backgroundImage: 'radial-gradient(circle, transparent 10%, #ffff0042 10%), radial-gradient(circle, transparent 10%, #ffff0042 10%), radial-gradient(circle, transparent 10%, #ffff0042 10%)',
//   backgroundSize: '80px 80px',
//   backgroundPosition: '0 0, 40px 40px, 20px 20px',
//   backgroundColor: '#ff0c008f',
//   [theme.breakpoints.up('lg')]: {
//     width: `calc(100% - ${NAV_WIDTH + 1}px)`,
//   },
// }));



const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {

  const user = JSON.parse(localStorage.getItem('user'));
  const nav = useNavigate();
  useEffect(() => {
    if(user === null){
      nav('/login');
    }
  }, [])
  
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <NotificationsPopover />
          <AccountPopover user={user}/>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
