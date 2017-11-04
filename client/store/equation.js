import {firstStep} from './step.js';
import axios from 'axios';

let initialState = {
  list: [],
  selected: {}
}

//Action Types
const GET_EQUATIONS = 'GET_EQUATIONS';
const SET_EQUATION = 'SET_EQUATION';
const ADD_EQUATION = 'ADD_EQUATION';
const DELETE_EQUATION = 'DELETE_EQUATION';


//Action Creators
export function getEquations (equations)  {
  const action = {type: GET_EQUATIONS, equations};
  return action;
}
export function setEquation (equation) {
  const action = {type: SET_EQUATION, equation};
  return action;
}
export function addEquation (equation) {
  const action = {type: ADD_EQUATION, equation};
  return action;
}
export function delEquation (id) {
  const action = {type: DELETE_EQUATION, id};
  return action;
}

//Thunks
export function fetchEquations () {
  return function thunk(dispatch) {
    axios.get('/api/equations')
    .then(res => res.data)
    .then(equations => {
      dispatch(getEquations(equations))
    })
    .catch(err => err)
  }
}

export function fetchEquation(id) {
  return function thunk(dispatch) {
    axios.get(`/api/equations/${id}`)
    .then(res => res.data)
    .then(equation => {
      dispatch(setEquation(equation))
      dispatch(firstStep(equation))
    })
    .catch(err => err)
  }
}

export function postEquation (equation) {
  return function thunk(dispatch) {
    axios.put('/api/equations', equation)
    .then(res => res.data)
    .then(newEquation => {
      dispatch(addEquation(newEquation))
    })
    .catch(err => err)
  }
}

export function destroyEquation (id) {
  return function thunk(dispatch) {
    axios.delete(`/api/equation/${id}`)
    .then(res => res.data)
    .then(trash => {
      dispatch(delEquation(trash.id))
    })
    .catch(err => err)
  }
}


//Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_EQUATIONS:
      return Object.assign({}, state, {list: action.equations});
    case SET_EQUATION:
      return Object.assign({}, state, {selected: action.equation});
    case ADD_EQUATION:
      return Object.assign({}, state, {
          list: [...state.list, action.equation],
          selected: action.equation
        });
    case DELETE_EQUATION:
        return Object.assign({}, state, {
          list: state.list.filter(equation => equation.id !== action.id),
          selected: {}
        })
    default:
      return state
  }
}

