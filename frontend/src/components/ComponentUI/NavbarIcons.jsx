import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './NavbarIcons.module.css';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import './ConfirmAlert.css';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// React Icon
import { GiBirdHouse } from 'react-icons/gi';
import { CgSelectR, CgProfile } from 'react-icons/cg';
import { RiLogoutBoxRLine, RiNurseFill } from 'react-icons/ri';

const useStyle = makeStyles(() => ({
  icon: {
    fontSize: 30,
    color: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    width: 40,
    height: 40,
    padding: 5,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    cursor: 'pointer',
  },
}));

function NavbarIcons({ handleIsFocus, isFocus, history }) {
  const classes = useStyle();
  const [isAlarmData, setIsAlarmData] = useState(false);
  const [isProfileData, setIsProfileData] = useState(false);
  const [alarm, setAlarm] = useState([]);
  const [alarmNum, setAlarmNum] = useState(null);

  const getAlarmNum = () => {
    const temp = localStorage.getItem('alarmNum');
    if (temp === 0) {
      setAlarmNum(null);
    } else if (temp > 0) {
      setAlarmNum(temp);
    }
  };

  useEffect(() => {
    getAlarmNum();
  });

  const getAlarmData = () => {
    setIsAlarmData(!isAlarmData);
    setIsProfileData(false);
    handleIsFocus(false);
    const profileId = localStorage.getItem('profileId');

    axios
      .get(`/api/main/alarmclick/${profileId}`)
      .then((res) => {
        setAlarm(res.data);
        localStorage.removeItem('alarmNum');
        setAlarmNum(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProfileData = () => {
    setIsProfileData(!isProfileData);
    setIsAlarmData(false);
    handleIsFocus(false);
  };

  const onfocusHandler = (e) => {
    setIsAlarmData(true);
  };
  const onblurHandler = (e) => {
    setIsAlarmData(false);
  };
  const myProfileHandler = (e) => {
    setIsAlarmData(false);
    setIsProfileData(false);
    handleIsFocus(false);
    const profileId = localStorage.getItem('profileId');
    history.push(`/profile/${profileId}`);
  };
  const profileSelectHandler = (e) => {
    setIsAlarmData(false);
    setIsProfileData(false);
    handleIsFocus(false);
    window.location.href = '/select';
  };

  const memberHandler = (e) => {
    setIsAlarmData(false);
    setIsProfileData(false);
    handleIsFocus(false);
    history.push('/userdetail');
  };
  const logoutHandler = (e) => {
    localStorage.clear();
    window.location.replace('/login');
  };
  const logoutalert = () => {
    confirmAlert({
      title: '로그아웃?',
      message: '정말 로그아웃하시겠습니까?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => logoutHandler(),
        },
        {
          label: 'No',
        },
      ],
    });
  };
  const scrollHandler = (e) => {
    setIsAlarmData(false);
    setIsProfileData(false);
    handleIsFocus(false);
  };

  const goToAlarmBoard = (boardId) => {
    axios.get(`/api/board/findOne/${boardId}`).then((res) => {
      const feedItem = res.data.data;
      history.push(`/detail/${boardId}`, feedItem);
    });
  };

  window.addEventListener('scroll', scrollHandler);
  return (
    <>
      <div className={styles.frame}>
        {/* 알림 */}
        {alarmNum !== null && (
          <div className={styles.alarmNumContainer}>
            <div className={styles.alramNum}>{alarmNum}</div>
          </div>
        )}
        <NotificationsIcon
          className={classes.icon}
          onClick={getAlarmData}
          onFocus={onfocusHandler}
          onBlur={onblurHandler}
        />
        {isAlarmData && !isFocus && (
          <ul className={styles.wrapper}>
            {alarm.length === 0 ? (
              <li className={styles.item}>알람이 없습니다.</li>
            ) : (
              alarm.map(({ boardTitle, profileNickname, boardId }, idx) => (
                <li
                  onClick={() => goToAlarmBoard(boardId)}
                  className={styles.item}
                  key={idx * 564637}
                >
                  <span className={styles.alarmspan}>{profileNickname}</span>{' '}
                  님이 <span className={styles.alarmspan}>{boardTitle}</span> 에
                  좋아요를 눌렀습니다.
                </li>
              ))
            )}
          </ul>
        )}

        {/* 프로필 */}
        <AccountCircleIcon
          className={classes.icon}
          onClick={getProfileData}
        ></AccountCircleIcon>
        {isProfileData && !isFocus && (
          <ul className={styles.wrapper2}>
            <li className={styles.item2} onClick={myProfileHandler}>
              <GiBirdHouse className={styles.icon} />
              <span className={styles.span}>마이 프로필</span>
            </li>
            <li className={styles.item2} onClick={profileSelectHandler}>
              <CgSelectR className={styles.icon} />
              <span className={styles.span}>프로필 선택</span>
            </li>
            <li className={styles.item2} onClick={memberHandler}>
              <CgProfile className={styles.icon} />
              <span className={styles.span}>회원정보</span>
            </li>
            <li className={styles.item3} onClick={logoutalert}>
              <RiLogoutBoxRLine className={styles.icon2} />
              <span className={styles.span}>로그아웃</span>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default withRouter(NavbarIcons);
