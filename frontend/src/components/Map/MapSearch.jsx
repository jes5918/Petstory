import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import './MapSearch.scss';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '6px 13px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function MapSearch({ onSearchInput, onSearchNum }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchNum, setSearchNum] = useState('');

  const onInputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onNumChangeHandler = (e) => {
    setSearchNum(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSearchInput(searchInput);
    onSearchNum(searchNum);
  };

  return (
    <>
      <form className="mapsearch__form" onSubmit={onSubmitHandler}>
        <div className="form__group2 field2">
          <input
            className="form__field2"
            onChange={onInputChangeHandler}
            placeholder="name"
            id="name"
            type="input"
            autoComplete="off"
            required
          />
          <label htmlFor="name" className="form__label2 title2">
            동물병원의 위치
          </label>
        </div>
        <button className="mapsearch__btn" type="submit">
          <FontAwesomeIcon
            icon={faSearch}
            size="3x"
            className="mapsearch__icon"
          />
        </button>
      </form>
    </>
  );
}
export default withRouter(MapSearch);
