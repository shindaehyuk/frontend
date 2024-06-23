import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import buttonStyles from './button.module.css';
import calendarStyles from './calendar.module.css';
import inputStyles from './input.module.css';

const CalendarComponent = () => {
  const param = useParams();
  const teamId = localStorage.getItem('teamId');
  const calendarRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    start: '',
    end: '',
    title: '',
    backgroundColor: '',
    textColor: '',
    teamPk: teamId,
    personalName: param.user,
    allDay: false
  });

  const [data, setData] = useState([]);

  const handleEventAdd = async (info) => {
    console.log('Add:', info);
    try {
      const res = await axios.post('http://localhost:8080/personal/event', eventInfo);
      console.log(res);
      window.alert('일정이 생성되었습니다.');
    } catch (error) {}
  };

  const handleEventClick = (info) => {
    console.log('eClick:', info);
    info.el.style.borderColor = 'blue';
  };

  const handleDateClick = (info) => {
    console.log('dateClick:', info);
  };

  const handleSelect = (info) => {
    console.log('체크:', info);
    setEventInfo({
      ...eventInfo,
      start: info.startStr,
      end: info.endStr
    });
    setModalVisible(true);
  };

  const handleEventChange = (info) => console.log('Change:', info);
  const handleEventRemove = (info) => console.log('Remove:', info);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({
      ...eventInfo,
      [name]: value
    });
  };

  const addEvent = () => {
    if (!eventInfo.title) {
      alert('제목을 작성해주세요');
      return;
    }

    let bColor = eventInfo.backgroundColor;
    let fColor = eventInfo.textColor;
    if (fColor === bColor) {
      bColor = 'black';
      fColor = 'yellow';
    }

    const newEvent = {
      start: eventInfo.start,
      end: eventInfo.end,
      title: eventInfo.title,
      backgroundColor: bColor,
      textColor: fColor
    };

    const calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(newEvent);
    closeModal();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  async function getTimeTable() {
    const res = await axios.get(`http://localhost:8080/team/${teamId}`);
    setData(res.data.data.eventList);
  }

  useEffect(() => {
    getTimeTable();
  }, []);

  return (
    <>
      <Container sx={{ backgroundColor: 'white', padding: '20px' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarRef}
          height="90vh"
          expandRows
          locale={'ko'}
          slotMinTime="09:00"
          slotMaxTime="24:00"
          allDaySlot={false}
          dayHeaderFormat={{ weekday: 'short' }}
          headerToolbar={{
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="dayGridMonth"
          selectable
          selectMirror
          navLinks
          weekNumbers={false}
          editable
          dayMaxEventRows
          nowIndicator
          eventSources={['./commonEvents.json', './KYREvents.json', './SYREvents.json']}
          eventAdd={handleEventAdd}
          eventChange={handleEventChange}
          eventRemove={handleEventRemove}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          select={handleSelect}
          events={data}
        />
      </Container>
      <div
        className={calendarStyles.yrModal}
        style={{ display: modalVisible ? 'block' : 'none', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className={calendarStyles.cont}>
          <h1>일정 입력</h1>
          <div>
            <div>시작일</div>
            <input
              type="text"
              id="schStart"
              value={eventInfo.start}
              onChange={handleInputChange}
              readOnly={!modalVisible}
              className={inputStyles.input}
            />
          </div>
          <div>
            <div>종료일</div>
            <input
              type="text"
              id="schEnd"
              value={eventInfo.end}
              onChange={handleInputChange}
              readOnly={!modalVisible}
              className={inputStyles.input}
            />
          </div>
          <div>
            <div>제목</div>
            <input
              type="text"
              id="schTitle"
              name="title"
              placeholder="Title"
              value={eventInfo.title}
              onChange={handleInputChange}
              className={inputStyles.input}
            />
          </div>
          <div className={`${inputStyles.inputColor} ${inputStyles.input}`}>
            <div>배경색</div>
            <input
              type="color"
              id="schBColor"
              name="backgroundColor"
              value={eventInfo.backgroundColor}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${inputStyles.inputColor} ${inputStyles.input}`}>
            <div>글자색</div>
            <input
              type="color"
              id="schFColor"
              name="textColor"
              value={eventInfo.textColor}
              onChange={handleInputChange}
            />
          </div>
          {modalVisible && (
            <div>
              <button className={`${buttonStyles.customBtn} ${buttonStyles.append}`} onClick={addEvent}>
                추가
              </button>
              <button className={`${buttonStyles.customBtn} ${buttonStyles.cancel}`} onClick={closeModal}>
                취소
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarComponent;
