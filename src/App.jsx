import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@mui/material';
import Router from './router/Router';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Container
          maxWidth="100%"
          sx={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            height: '100vh'
          }}
        >
          <Router></Router>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
