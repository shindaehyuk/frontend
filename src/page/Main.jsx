import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [data, setData] = useState([]);
  const teamId = localStorage.getItem('teamId');
  const navigate = useNavigate();

  async function getData() {
    const res = await axios.get(`http://localhost:8080/personal/${teamId}`);
    setData(res.data.data.userNames);
    console.log(res);
  }

  async function addUser() {
    console.log(data.length);
    if (data.length >= 12) {
      console.log('불가능');
    } else {
      const res = await axios.post(`http://localhost:8080/personal`, {
        teamPk: teamId
      });
      getData();
      console.log(res);
    }
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
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Time Table</h1>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ height: '100px', width: '100px', borderRadius: '90px', marginRight: '100px' }}
        >
          조회
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          height: '60%',
          bgcolor: '#CCD5AE',
          borderRadius: '40px',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 10
        }}
      >
        <Grid container spacing={5}>
          {data.map((name, index) => (
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ height: '81px', width: '235px', borderRadius: '90px' }}
                d
                onClick={() => {
                  navigate(`detail/${name}`);
                }}
              >
                {name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '80%',
          height: '20%',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{ height: '50%', width: '200px', borderRadius: '90px' }}
          onClick={addUser}
        >
          인원+
        </Button>
        <Button variant="contained" sx={{ height: '50%', width: '200px', borderRadius: '90px', margin: '100px' }}>
          인원-
        </Button>
      </Box>
    </Box>
  );
}

export default Main;
