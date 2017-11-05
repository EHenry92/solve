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
          <span>{step.lCo + step.var}</span>
          <span> + </span>
          <span>{step.lConst}</span>
          <span>  =  </span>
          <span>{step.rCo + step.var}</span>
          <span> + </span>
          <span>{step.rConst}</span>
          </div>
      )

    }
}
const mapStateToProps = ({ steps}) => ({lastStep: steps.lastStep, steps: steps.list});
const mapDispatchToProps = {fetchSteps};
export default connect(mapStateToProps, mapDispatchToProps)(Algebra);


// //place an actions on this state that keeps track of the actions performed, and dispalys a list
// //if changed, change the color to red?
