import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import { Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import styles from './app.module.css';

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div className={styles.logo}>
          <CalendarMonthIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: '#8a2be2' }} />
          Common Clock
        </div>
        <div className={styles.box1}></div>
        <div className={styles.box2}></div>
        <div className={styles.box3}>
          <img src="dot.png" alt="dot" />
        </div>
        <Router></Router>
      </Box>
    </BrowserRouter>
  );
}

export default App;
