import axios from 'axios';
let initialState = {
  list: [],
  selected: {},
}

const GET_EQUATIONS = 'GET_EQUATIONS';
const SET_EQUATION = 'SET_EQUATION';
const ADD_EQUATION = 'ADD_EQUATION';
const DELETE_EQUATION = 'DELETE_EQUATION';

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

export default function reducer (state = initialState, action)  {
  switch (action.type) {
    case GET_EQUATIONS:
    return Object.assign({}, state, {
      list: action.equations
    })
  case SET_EQUATION:
    return Object.assign({}, state, {
      selected: action.equation,
    })
  case ADD_EQUATION:
    return Object.assign({}, state, {
      list: [...state.list, action.equation]
    })
  case DELETE_EQUATION:
    return Object.assign({}, state, {
      list: state.list.filter(equ => equ.id !== action.id)
    })
  default:
    return state;
  }
}
