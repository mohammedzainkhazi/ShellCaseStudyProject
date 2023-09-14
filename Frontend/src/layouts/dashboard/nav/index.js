import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock

// hooks
import useResponsive from '../../../hooks/useResponsive';
// components

import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {

  const user = JSON.parse(localStorage.getItem('user'));
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        {/* <Logo /> */}
        <img src='https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Shell_logo.svg/1200px-Shell_logo.svg.png' alt="logo" height={100} width={100}/>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src="data:image/jpeg;base64,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" alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user.user_name}
              </Typography>

              {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography> */}
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
