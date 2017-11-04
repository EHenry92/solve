let initialState = {
  list: [],
  last: {}
}
//Action Types
const GET_STEPS = 'GET_STEPS';
const ADD_STEP = 'ADD_STEP';
const GET_LAST_STEP = 'GET_LAST_STEP';
const START_STEP = 'START_STEP ';


//Action Creators
export function getSteps (steps)  {
  const action = {type: GET_STEPS, steps};
  return action;
}
export function addStep (change)  {
  const action = {type: ADD_STEP, change};
  return action;
}
export function getStep (step)  {
  const action = {type: GET_LAST_STEP, step};
  return action;
}
export function startStep(equation) {
  const action = {type: START_STEP, equation};
  return action;
}

//reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_STEPS:
      return action.steps;
    case ADD_STEP:
      return Object.assign({}, state, {
        last: Object.assign({}, state.last, action.change),
        list: [...state.list, state.last]
        })
    case START_STEP:
      return Object.assign({}, state, {
        last: Object.assign({}, state.last, action.equation),
        list: [...state.list, action.equation]
      })
    case GET_LAST_STEP:
      return action.step;
    default:
      return state;
  }
}

//thunk
export function postStep (place, num) {
  return function thunk (dispatch)  {
    console.log("stateeee", state)
    // let last = initialState.last;
    // num > 0 ? last[place]++ : last[place]--;
    // dispatch(addStep(last));
  }
}
export function fetchSteps () {
  return function thunk (dispatch)  {
    dispatch(getSteps());
  }
}
export function fetchStep () {
  return function thunk (dispatch)  {
    dispatch(getStep());
  }
}

export function firstStep (equation) {
  return function thunk (dispatch)  {
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
    dispatch(startStep(step));
  }
}

