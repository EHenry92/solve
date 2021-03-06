import React from 'react';
import {fetchSteps} from '../store';
import {connect} from 'react-redux';

export function Algebra (props){
        return (
        <div id="algebra">
          <table>
          {
              props.steps.map((step) => {
              return (
                  <tbody key={step.id}>
                  {showAction(step.pos, step.operation, step.change, step.var)}
                  <tr>
                  {
                    step.lCo !== 0 &&
                    <td>{step.lCo + step.var}</td>
                  }
                  {
                    step.lConst !== 0 &&
                      <td> + </td>
                  }
                  {
                    step.lConst !== 0 &&
                      <td>{step.lConst}</td>
                  }
                  <td>  =  </td>
                  {
                    step.rCo !== 0 &&
                      <td>{step.rCo + step.var}</td>
                  }
                  {
                    step.rConst !== 0 &&
                      <td> + </td>
                  }
                  {
                    step.rConst !== 0 &&
                      <td>{step.rConst}</td>
                  }
                  </tr>
                  </tbody>
              )
            })
          }
          </table>
        </div>
        )
        function showAction (position, operation, value, variable ) {
          let sign;
          switch (operation) {
            case 'multiply':
            case 'divide':
            sign = operation == 'multiply' ? '* ' : '/ ';
            return (
              <tr style={{borderBottom: '2'}}>
                <td />
                <td />
                <td> {sign}{value}</td>
                <td />
                <td />
                <td />
                <td> {sign}{value}</td>
              </tr>
            )
            case 'add':
            case 'sub':
            sign = operation == 'add'  && '+ ';
            return (
              <tr style={{borderBottom: '2'}}>
              {
                position == 'Co' ?
                    <td>{sign}{value}{variable}</td>
                    :
                    <td/>
              }
                <td />
                {
                position == 'Const' ?
                    <td>{sign}{value}</td>
                    :
                    <td/>
              }
                <td />
                {
                position == 'Co' ?
                    <td>{sign}{value}{variable}</td>
                    :
                    <td/>
              }
                <td />
                {
                position == 'Const' ?
                    <td>{sign}{value}</td>
                    :
                    <td/>
              }
              </tr>
            )
          }
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
