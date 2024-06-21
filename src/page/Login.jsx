import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (event) => {
    console.log(event);
    const res = await axios.post('http://localhost:8080/login', {
      loginId: event.loginId,
      password: event.password
    });
    localStorage.setItem('teamId', res.data.teamId);
    console.log(res);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Snackbar
          open={open === 1 || open === 2}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => setOpen(0)} // Snackbar 닫기 이벤트 처리
        >
          <Alert severity={open === 1 ? 'success' : open === 2 ? 'error' : 'error'} sx={{ width: '100%' }}>
            {open === 1 && '로그인 성공! 메인페이지로 이동합니다.'}
            {open === 2 && '아이디가 존재하지 않거나 비밀번호가 틀립니다.'}
          </Alert>
        </Snackbar>

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className="animate__animated animate__fadeIn animate__delay-0.3s"
                required
                fullWidth
                label="이메일"
                autoFocus
                {...register('loginId', {
                  required: true
                })}
                color="success"
                error={!!errors.email}
                sx={{ backgroundColor: '#faedcd', borderRadius: '5px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="animate__animated animate__fadeIn animate__delay-0.6s"
                required
                fullWidth
                color="success"
                label="비밀번호"
                type="password"
                {...register('password', {
                  required: true
                })}
                error={!!errors.password}
                sx={{ backgroundColor: '#faedcd', borderRadius: '5px' }}
              />
            </Grid>
          </Grid>

          <Button
            className="animate__animated animate__fadeIn animate__delay-1.2s"
            disabled={isLoading}
            type="submit"
            fullWidth
            color="inherit"
            variant="contained"
            sx={{ mt: 4, mb: 4, backgroundColor: '#faedcd', color: 'black' }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Sign in'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
