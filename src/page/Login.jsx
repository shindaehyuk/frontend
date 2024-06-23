import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './login.module.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function SignIn() {
  const navigate = useNavigate();

  //로그인 하는 함수
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(event);

    try {
      const res = await axios.post('http://localhost:8080/login', {
        loginId: event.target[0].value,
        password: event.target[1].value
      });
      localStorage.setItem('teamId', res.data.data.teamId); // 로컬스토리지에 팀아이디 저장
      navigate('/timetable'); //메인으로 이동
    } catch (error) {
      window.alert('아이디 혹은 비밀번호가 틀립니다.');
    }
  };

  return (
    <>
      <div className={styles.logo}>
        <CalendarMonthIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: '#8a2be2' }} />
        Common Clock
      </div>
      <div className={styles.loginContainer}>
        <h2>Welcome</h2>
        <form id="loginForm" onSubmit={onSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="Team_Id">Team Id</label>
            <input type="text" id="id" name="Team_Id" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className={styles.inUp}>
            <button className={styles.loginForm} type="submit">
              Log in
            </button>
            <button
              className={styles.loginForm}
              type="submit"
              onClick={() => {
                navigate('/signup');
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p id="message"></p>
      </div>

      <div className={styles.summary}>
        <p>
          Common Clock is a collaboration tool that automatically finds and displays common available times by inputting
          team members' schedules.
        </p>
      </div>
    </>
  );
}
