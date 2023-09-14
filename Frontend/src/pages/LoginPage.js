import { Helmet } from 'react-helmet-async';

// React Hooks
import { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider } from '@mui/material';

import SignUp from '../sections/auth/signup/SignUp';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
// sections
import { LoginForm } from '../sections/auth/login';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const [signUpPage, setsignUpPage] = useState(false);

  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        <img
          src="/assets/shell-gas-logo.png" // Provide the new image source
          alt="Logo" // Provide alternative text
          style={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
            width: 60, // Set the width
            height: 60, // Set the height
            margin: 25,
          }}
        />
        {/* <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        /> */}

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>

            {signUpPage ? (
              <Typography variant="body2" sx={{ mb: 5 }}>
                Already have an account? {''}
                <button
                  onClick={() => setsignUpPage(!signUpPage)}
                  className="bg-blue-500 hover:bg-yellow-400 px-4 py-2  text-white rounded-lg ml-5"
                >
                  Login
                </button>
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ mb: 5 }}>
                Don’t have an account? {''}
                <button
                  onClick={() => setsignUpPage(!signUpPage)}
                  className="bg-green-500 hover:bg-yellow-400 px-4 py-2 text-white rounded-lg ml-5"
                >
                  Sign Up
                </button>
              </Typography>
            )}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
            {signUpPage ? <SignUp /> : <LoginForm />}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
