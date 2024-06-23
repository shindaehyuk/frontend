import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import styles from './signup.module.css';

export default function SignIn() {
  const navigate = useNavigate();

  // Function to handle sign up
  const onSubmit = async (event) => {
    event.preventDefault();

    const data = {
      loginId: event.target.Team_Id.value,
      password: event.target.password.value
    };

    try {
      const res = await axios.post('http://localhost:8080/signup', {
        loginId: data.loginId,
        password: data.password
      });
      navigate('/');
      window.alert('회원가입에 성공했습니다. 로그인페이지로 이동합니다.');
    } catch (error) {
      window.alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className={styles.logo}>
        <CalendarMonthIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: '#8a2be2' }} />
        Common Clock
      </div>
      <div className={styles.signupContainer}>
        <h2>회원가입</h2>
        <form id="signForm" onSubmit={onSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="Team_Id">Team Id</label>
            <input type="text" id="Team_Id" name="Team_Id" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className={styles.inUp}>
            <button className={styles.signForm} type="submit">
              Sign Up
            </button>
          </div>
        </form>
        <p id="message"></p>
      </div>

      <div className={styles.summary}>
        <p>Common Clock can be used by all team members if just one person from the team signs up.</p>
      </div>
    </>
  );
}
