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
const FIRST_STEP = 'FIRST_STEP';

export const getSteps = (steps) => ({type: GET_STEPS, steps});
export const addStep = (step) => ({type: ADD_STEP, step});
export const getStep = (step) => ({type: GET_LAST_STEP, step});
export const resetSteps = () => ({type: RESET_STEPS });
export const firstStep = (step) => ({type: FIRST_STEP, step});

export function createStep (id) {
  return function thunk (dispatch)  {
    axios.get(`/api/equations/${id}`)
    .then(res => res.data)
    .then(equation => {
      //Add the reduced equation as the first step
      let step = {};
      step.id = 1;
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
      dispatch(firstStep(step));
    })
    .catch(err => err)
  }
}

export function postStep (pos, operation, num) {
  return function thunk (dispatch)  {
    let nextStep = Object.assign({}, store.getState().steps.lastStep, {pos, operation});
    nextStep.id += 1;
    if (operation === 'add') {nextStep[pos] += 1;}
    else if (operation === 'sub') {nextStep[pos] -= 1;}
    else if (operation === 'multiply') {
      if (pos === 'left') {
        nextStep.lCo *= num
        nextStep.lConst *= num
      }
      else {
        nextStep.rCo *= num
        nextStep.rConst *= num
      }
    }
    else if (operation == 'divide') {
      if (pos === 'left') {
        nextStep.lCo /= num
        nextStep.lConst /= num
      }
      else {
        nextStep.rCo /= num
        nextStep.rConst /= num
      }
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
    case FIRST_STEP:
      return Object.assign({}, state.steps, {
        list: [...[], action.step],
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
