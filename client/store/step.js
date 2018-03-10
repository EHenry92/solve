import store from './index';
import axios from 'axios';

let initialState = {
  list: [],
  lastStep: {},
  solved: false
}

const GET_STEPS = 'GET_STEPS';
const ADD_STEP = 'ADD_STEP';
const RESET_STEPS = 'RESET_STEPS';
const FIRST_STEP = 'FIRST_STEP';
const GET_LAST_STEP = 'GET_LAST_STEP';
const SOLVE_EQUATION = 'SOLVE_EQUATION';

export const getSteps = (steps) => ({type: GET_STEPS, steps});
export const addStep = (step) => ({type: ADD_STEP, step});
export const getStep = (step) => ({type: GET_LAST_STEP, step});
export const resetSteps = () => ({type: RESET_STEPS });
export const firstStep = (step) => ({type: FIRST_STEP, step});
export const solveEquation = (step) => ({type: SOLVE_EQUATION, step});


const checkComplete = (step, solution) => {
    return ((step.lCo == 1 && step.rConst == solution) ||
            (step.rCo == 1 && step.lConst == solution))
}
export function createStep (id) {
  return function thunk (dispatch)  {
    axios.get(`/api/equations/${id}`)
    .then(res => res.data)
    .then(equation => {
      //Add the reduced equation as the first step
      const condencer = (accumulator, currentValue) => parseInt(accumulator + currentValue, 10);
      let step = {
        id: 1,
        var: equation.var,
        lCo: equation.lCo.reduce(condencer),
        rCo: equation.rCo.reduce(condencer),
        lConst:  equation.lConst.reduce(condencer),
        rConst: equation.rConst.reduce(condencer)
      };
      dispatch(firstStep(step));
    })
    .catch(err => err)
  }
}


export const postStep = ( operation, num, solution, pos) => {
  return function thunk (dispatch)  {
    let nextStep = Object.assign({}, store.getState().steps.lastStep, {pos, operation});
    nextStep.id += 1;
    if (operation === 'multiply') {
        nextStep.lCo *= num;
        nextStep.lConst *= num;
        nextStep.rCo *= num;
        nextStep.rConst *= num;
        nextStep.change = num;
    }
    else if (operation == 'divide') {
        nextStep.lCo /= num;
        nextStep.lConst /= num;
        nextStep.rCo /= num;
        nextStep.rConst /= num;
        nextStep.change = num;
    }
    else {
      nextStep.change = operation == 'add' ? 1 : -1;
      nextStep['l' + pos] += nextStep.change;
      nextStep['r' + pos] += nextStep.change;
    }
    if (!checkComplete(nextStep, solution)) {
        dispatch(addStep(nextStep));
    }
    else {
      dispatch(solveEquation(nextStep))
    }
  }
}

export const fetchSteps = () => dispatch  => {dispatch(getSteps(store.getState().steps));}
export const fetchStep = () => dispatch  => {dispatch(getStep(store.getState().lastStep));}
export const destroySteps = () => dispatch => {dispatch(resetSteps())}


export default function reducer (state = initialState, action)  {
  switch (action.type) {
    case GET_STEPS:
      return action.steps
    case SOLVE_EQUATION:
    return Object.assign({}, state.steps, {
      list: [...state.list, action.step],
      lastStep: action.step,
      solved: true
    })
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
    case RESET_STEPS:
      return Object.assign({}, state.steps, {
        list: [],
        solved: false
      })
    default:
      return state;
  }
}
