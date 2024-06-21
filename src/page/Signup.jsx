import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert, Snackbar } from '@mui/material';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(0);
  const [idCheck, setIdCheck] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await axios.post('http://localhost:8080/signup', {
      loginId: data.loginId,
      password: data.password
    });
    console.log(res);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className="animate__animated animate__fadeIn animate__delay-0.3s"
                  size="small"
                  required
                  fullWidth
                  label="이메일"
                  color="success"
                  autoFocus
                  {...register('loginId', {
                    required: true
                    // pattern: {
                    //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    //   message: '*이메일형식이 아닙니다.'
                    // }
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    sx: { backgroundColor: '#faedcd', borderRadius: '5px' }
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  className="animate__animated animate__fadeIn animate__delay-0.9s"
                  size="small"
                  label="비밀번호"
                  type="password"
                  color="success"
                  required
                  {...register('password', {
                    required: true
                    // pattern: {
                    //   value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,15}$/,
                    //   message: '*영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하'
                    // }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    sx: { backgroundColor: '#faedcd', borderRadius: '5px' }
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Button
                  className="animate__animated animate__fadeIn animate__delay-1.2s"
                  disabled={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="inherit"
                  sx={{ mt: 1, backgroundColor: '#faedcd', color: 'black' }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Sign up'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
