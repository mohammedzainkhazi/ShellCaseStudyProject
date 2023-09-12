import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import axios from "axios";

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    console.log('---------------');
    const res = await axios.post('http://localhost:5204/addUser',{
        // "user_id": "nextval('user_user_id_seq')",
        "user_name": username,
        "user_email": email,
        "user_pass": password,
      },{withCredentials:false}).catch(e=>console.log(e));

    console.log(res);
    //  navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField onChange={e=>setUsername(e.target.value)} label="Username" />

        <TextField onChange={e=>setEmail(e.target.value)} name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          onChange={e=>setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
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
      </Stack>
          <br/>
      <LoadingButton fullWidth size="large" type="submit" className='!bg-green-500' variant="contained" onClick={handleClick}>
        Sign Up
      </LoadingButton>
    </>
  );
}
