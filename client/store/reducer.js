// import axios from 'axios';
// import store from './index';

// let initialState = {
//   equations: [],
//   selected: {},
//   steps: [],
//   lastStep: {}
// }
// //Action Types
//   const GET_EQUATIONS = 'GET_EQUATIONS';
//   const SET_EQUATION = 'SET_EQUATION';
//   const ADD_EQUATION = 'ADD_EQUATION';
//   const DELETE_EQUATION = 'DELETE_EQUATION';
//   const GET_STEPS = 'GET_STEPS';
//   const ADD_STEP = 'ADD_STEP';
//   const GET_LAST_STEP = 'GET_LAST_STEP';
//   const RESET_STEPS = 'RESET_STEPS';

// //Action Creators
//   export function getEquations (equations)  {
//     const action = {type: GET_EQUATIONS, equations};
//     return action;
//   }
//   export function setEquation (equation) {
//     const action = {type: SET_EQUATION, equation};
//     return action;
//   }
//   export function addEquation (equation) {
//     const action = {type: ADD_EQUATION, equation};
//     return action;
//   }
//   export function delEquation (id) {
//     const action = {type: DELETE_EQUATION, id};
//     return action;
//   }
//   export function getSteps (steps)  {
//     const action = {type: GET_STEPS, steps};
//     return action;
//   }
//   export function addStep (step)  {
//     const action = {type: ADD_STEP, step};
//     return action;
//   }
//   export function getStep (step)  {
//     const action = {type: GET_LAST_STEP, step};
//     return action;
//   }
//   export function resetSteps () {
//     const action = {type: RESET_STEPS };
//     return action;
//   }


// //Thunks'
//   export function fetchEquations () {
//     return function thunk(dispatch) {
//       axios.get('/api/equations')
//       .then(res => res.data)
//       .then(equations => {
//         dispatch(getEquations(equations))
//       })
//       .catch(err => err)
//     }
//   }
//   export function fetchEquation(id) {
//     return function thunk(dispatch) {
//       axios.get(`/api/equations/${id}`)
//       .then(res => res.data)
//       .then(equation => {
//         dispatch(setEquation(equation))
//         //Add the reduced equation as the first step
//         let step = {};
//         step.id = equation.id;
//         step.var = equation.var;
//         step.lCo = equation.lCo.reduce(function (acc, el) {
//           return acc + el;
//         }, 0);
//         step.rCo = equation.rCo.reduce(function (acc, el) {
//           return acc + el;
//         }, 0);
//         step.lConst = equation.lConst.reduce(function (acc, el) {
//           return acc + el;
//         }, 0);
//         step.rConst = equation.rConst.reduce(function (acc, el) {
//           return acc + el;
//         }, 0);
//         dispatch(addStep(step));

//       })
//       .catch(err => err)
//     }
//   }

//   export function postEquation (equation) {
//     return function thunk(dispatch) {
//       axios.put('/api/equations', equation)
//       .then(res => res.data)
//       .then(newEquation => {
//         dispatch(addEquation(newEquation))
//       })
//       .catch(err => err)
//     }
//   }

//   export function destroyEquation (id) {
//     return function thunk(dispatch) {
//       axios.delete(`/api/equation/${id}`)
//       .then(res => res.data)
//       .then(trash => {
//         dispatch(delEquation(trash.id))
//       })
//       .catch(err => err)
//     }
//   }

//   export function postStep (col, num) {
//     return function thunk (dispatch)  {
//       let nextStep = Object.assign({}, store.getState().lastStep);
//       if (num > 0)  {
//         nextStep[col] += 1;
//       }
//       else {
//         nextStep[col] -= 1;
//       }
//       dispatch(addStep(nextStep));
//     }
//   }
//   export function fetchSteps () {
//     return function thunk (dispatch)  {
//       dispatch(getSteps(store.getState().steps));
//     }
//   }
//   export function fetchStep () {
//     return function thunk (dispatch)  {
//       dispatch(getStep(store.getState().lastStep));
//     }
//   }
//   export function destroySteps () {
//     return function thunk (dispatch)  {
//       dispatch(resetSteps())
//     }
//   }

// export default function reducer (state = initialState, action) {
//   switch (action.type) {
//     case GET_EQUATIONS:
//       return Object.assign({}, state, {
//         equations: action.equations
//       })
//     case SET_EQUATION:
//       return Object.assign({}, state, {
//         selected: action.equation,
//       })
//     case ADD_EQUATION:
//       return Object.assign({}, state, {
//         equations: [...state.equations, action.equation]
//       })
//     case DELETE_EQUATION:
//       return Object.assign({}, state, {
//         equations: state.equations.filter(equ => equ.id !== action.id)
//       })
//     case GET_STEPS:
//       return action.steps
//     case ADD_STEP:
//       return Object.assign({}, state, {
//         steps: [...state.steps, action.step],
//         lastStep: action.step
//       })
//     case GET_LAST_STEP:
//       return action.Step
//     case RESET_STEPS:
//       return Object.assign({}, state, {
//         steps: [],
//         lastStep: {}
//       })
//     default:
//       return state;
//   }
// }
