import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from "axios";

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  // Show Err 
  const [error, setError] = useState(false);

  const handleClick = async () => {
    const res = await axios.post('http://localhost:5204/loginUser', {
      'email': email,
      'pass': pass,
    }, {
      withCredentials: false
    },
    ).catch(e => console.log(e));

    if(res.data !== null){
      setError(false);
      localStorage.setItem('token',(res.data.token));
      localStorage.setItem('user',JSON.stringify(res.data.user));
      console.log(res.data.token);
      navigate('/dashboard', { replace: true });
    }
    else{
      setError(true);
    }
  };


  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" onChange={e => setEmail(e.target.value)} label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={e => setPass(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && <Alert severity="error">Invalid Credentials! Please try again!</Alert>}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <p className='text-blue-500'>
          Forgot password?
        </p>
        <p className='text-red-500'>
          Reset
        </p>
      </Stack>


      <LoadingButton fullWidth size="large" type="submit" className='!bg-blue-500' variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
