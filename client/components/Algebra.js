import React, {Component} from 'react';
import {fetchSteps} from './index';
import {connect} from 'react-redux';

export function Algebra (props){
        return (
        <div id="algebra">
                {
                  props.steps.map((step, idx) => {
                  return (
                    <div key={'step'+idx}> {displayStep(step)}
                      </div>
                  )
                })
              }
        </div>
        )
    function displayStep(step)  {
      return (
        <div>
          {
            step.lCo !== 0 &&
            <span>{step.lCo + step.var}</span>
          }
          {
            step.lConst !== 0 &&
            <span>
              <span> + </span>
              <span>{step.lConst}</span>
            </span>
          }
          <span>  =  </span>
          {
            step.rCo !== 0 &&
              <span>{step.rCo + step.var}</span>
          }
          {
            step.rConst !== 0 &&
            <span>
              <span> + </span>
              <span>{step.rConst}</span>
            </span>
          }
          </div>
      )

    }
}
const mapStateToProps = ({ steps}) => ({lastStep: steps.lastStep, steps: steps.list});
const mapDispatchToProps = {fetchSteps};
export default connect(mapStateToProps, mapDispatchToProps)(Algebra);


// //place an actions on this state that keeps track of the actions performed, and dispalys a list
// //if changed, change the color to red?


/*
Is the answer:
  if( (equation.lCo * equation.answer + equation.lConst) === (equation.rCo * equation.answer + equation.rConst))
    warning = "Correct ! x=" + equation.answer
*/
