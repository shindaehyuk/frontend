import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Main() {
  const [data, setData] = useState([]);
  const teamId = localStorage.getItem('teamId');
  const navigate = useNavigate();

  // 전체 조회 데이터 가져오기
  async function getData() {
    const res = await axios.get(`http://localhost:8080/personal/${teamId}`);
    setData(res.data.data.userNames);
    console.log(res);
  }

  // 인원 추가하기
  async function addUser() {
    console.log(data.length);
    if (data.length >= 16) {
      console.log('불가능');
    } else {
      const res = await axios.post(`http://localhost:8080/personal`, {
        teamPk: teamId
      });
      getData();
      console.log(res);
    }
  }

  function Logout() {
    localStorage.removeItem('teamId');
    navigate('/');
    window.alert('로그아웃되었습니다.');
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button variant="contained" sx={{ position: 'fixed', top: '20px', right: '20px' }} onClick={Logout}>
        로그아웃
      </Button>
      <Box
        sx={{
          display: 'flex',
          width: '80%',
          height: '80%',
          bgcolor: '#F5F5F5',
          borderRadius: '40px',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 10
        }}
      >
        <Box
          sx={{
            width: '40%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center'
          }}
        >
          <Box sx={{ width: '100%', height: '20%', display: 'flex', justifyContent: 'center' }}>
            <h1>
              <AccountBalanceIcon sx={{ fontSize: 'inherit', verticalAlign: 'middle', marginRight: 3 }} />
              Time Table
            </h1>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ height: '100px', width: '100px', borderRadius: '90px', marginLeft: '50px' }}
              onClick={() => {
                navigate('/timetable/team');
              }}
            >
              <b>팀 시간표 조회</b>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: '60%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ width: '100%', height: '80%' }}>
            <h1>
              <b>
                <AccountCircleIcon
                  sx={{ fontSize: 'inherit', verticalAlign: 'middle', marginRight: 3 }}
                ></AccountCircleIcon>
                현재 참여중인 인원
              </b>
            </h1>
            <Grid container spacing={4}>
              {data.map((name, index) => (
                <Grid item xs={3} key={index}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ height: '60px', width: '120px', borderRadius: '90px' }}
                    onClick={() => {
                      navigate(`/timetable/${name}`);
                    }}
                  >
                    {name}
                  </Button>
                </Grid>
              ))}{' '}
              {data.length < 16 && (
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled
                    sx={{ height: '60px', width: '120px', borderRadius: '90px' }}
                  >
                    new user
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '20%'
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ height: '50px', width: '200px', borderRadius: '90px', marginRight: '50px' }}
              onClick={addUser}
            >
              인원+
            </Button>
            <Button
              variant="contained"
              sx={{ height: '50px', width: '200px', borderRadius: '90px', marginLeft: '50px' }}
            >
              인원-
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;
