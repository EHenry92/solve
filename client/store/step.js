import store from './index';
import axios from 'axios';

let initialState = {
  list: [],
  lastStep: {}
}

const GET_STEPS = 'GET_STEPS';
const ADD_STEP = 'ADD_STEP';
const GET_LAST_STEP = 'GET_LAST_STEP';
const RESET_STEPS = 'RESET_STEPS';

export function getSteps (steps)  {
  const action = {type: GET_STEPS, steps};
  return action;
}
export function addStep (step)  {
  const action = {type: ADD_STEP, step};
  return action;
}
export function getStep (step)  {
  const action = {type: GET_LAST_STEP, step};
  return action;
}
export function resetSteps () {
  const action = {type: RESET_STEPS };
  return action;
}


export function createStep (id) {
  return function thunk (dispatch)  {
    axios.get(`/api/equations/${id}`)
    .then(res => res.data)
    .then(equation => {
      //Add the reduced equation as the first step
      let step = {};
      step.id = equation.id;
      step.var = equation.var;
      step.lCo = equation.lCo.reduce(function (acc, el) {
        return acc + el;
      }, 0);
      step.rCo = equation.rCo.reduce(function (acc, el) {
        return acc + el;
      }, 0);
      step.lConst = equation.lConst.reduce(function (acc, el) {
        return acc + el;
      }, 0);
      step.rConst = equation.rConst.reduce(function (acc, el) {
        return acc + el;
      }, 0);
      dispatch(addStep(step));
    })
    .catch(err => err)
  }
}

export function postStep (col, operation, num) {
  return function thunk (dispatch)  {
    let nextStep = Object.assign({}, store.getState().steps.lastStep);
    switch (operation)  {
      case 'add':
        nextStep[col] += 1;
        break;
      case 'sub':
        nextStep[col] -= 1;
        break;
      case 'mul':
        nextStep[col] *= (nextStep[col] / num);
        break;
      case 'div':
        nextStep[col] = (nextStep[col] / num);
        break;
      default:
        break;
    }
    dispatch(addStep(nextStep));
  }
}
export function fetchSteps () {
  return function thunk (dispatch)  {
    dispatch(getSteps(store.getState().steps));
  }
}
export function fetchStep () {
  return function thunk (dispatch)  {
    dispatch(getStep(store.getState().lastStep));
  }
}
export function destroySteps () {
  return function thunk (dispatch)  {
    dispatch(resetSteps())
  }
}

export default function reducer (state = initialState, action)  {
  switch (action.type) {
    case GET_STEPS:
      return action.steps
    case ADD_STEP:
      return Object.assign({}, state.steps, {
        list: [...state.list, action.step],
        lastStep: action.step
      })
    case GET_LAST_STEP:
      return action.step
    case RESET_STEPS:
      return Object.assign({}, state.steps, {
        list: [],
        lastStep: {}
      })
    default:
      return state;
  }
}
