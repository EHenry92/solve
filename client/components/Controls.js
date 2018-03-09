import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEquation, postStep, createStep, destroySteps} from './index';
import {ThisOrThat} from './Common/index';


export class Controls extends Component{
    constructor (props) {
      super(props);
      this.state = {
       operation: 'multiply',
       leftSide: false,
       rightSide: false,
       mulOrDiv: false
      }
      this.preserveBalance = this.preserveBalance.bind(this);
      this.singleClick = this.singleClick.bind(this);
      this.MulOrDivHandler = this.MulOrDivHandler.bind(this);
    }
    componentWillMount()  {
      const eqId = this.props.id;
      this.props.fetchEquation(eqId);
      this.props.createStep(eqId);
    }
    singleClick(evt)  {
      evt.preventDefault();
      const operation = evt.target.value.slice(0, 3);
      const column = evt.target.value.slice(3);
      const side = evt.target.name;
      this.preserveBalance(side, operation, 1, column);

    }
    MulOrDivHandler(evt)  {
      evt.preventDefault();
      const operation = evt.target.multiplyOrDivide.value;
      const amount = evt.target.amount.value;
      const side = evt.target.name;
      this.props.postStep(side, operation, amount);
    }


    preserveBalance(side, operation, amount, column) {
      let buttons = document.getElementsByClassName(side + 'Btn');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
      let sendStep = () => {
        if (this.state.leftSide && this.state.rightSide) {
          this.props.postStep(column, operation, amount);
          this.setState({leftSide: true, rightSide: true }, () => {
            document.getElementsByClassName('leftBtn rightBtn')
          })
        }
      }
      side == 'left' ? this.setState({leftSide: true, mulOrDiv: true}, sendStep) : this.setState({rightSide: true, mulOrDiv: true}, sendStep)

    }
    render () {
      const {equation, id} = this.props;
      return (
      <div id="controls">
          <div>
            <div>Equation Controls</div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            {
              ['Left', 'Right'].map(side =>
                    (<table  key={side} className= {`${side}side`}>
                      <thead>
                        <tr>
                          <th className = {`${side}Vis`}>
                            {side} Expression
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className={`${side}Vis`}>
                            <ThisOrThat
                              text={'Variable'}
                              onClick={this.singleClick}
                              type={'button'}
                              leftButton={{
                                  value: `+${equation.var}`,
                                  name: 'leftButton'
                                }}
                              rightButton={{
                                value: `-${equation.var}`,
                                name: 'rightButton'
                              }}
                              />
                              <ThisOrThat
                              text={'Constant'}
                              onClick={this.singleClick}
                              type={'button'}
                              leftButton={{
                                  value: '+1',
                                  name: 'leftButton'
                                }}
                              rightButton={{
                                value: '-1',
                                name: 'rightButton'
                              }}
                              />
                          </td>
                        </tr>
                      </tbody>
                      </table>)
              )
            }
            </div>
            <form
              name= "operation"
              onSubmit = {this.MulOrDivHandler}>
                <ThisOrThat
                  text={''}
                  onClick={(evt) => {this.setState({operation: evt.target.value})}}
                  type={'radio'}
                  leftButton={{
                      text: 'multiply',
                      name: 'multiplyOrDivide',
                      value: 1
                    }}
                  rightButton={{
                    text: 'divide',
                    name: 'multiplyOrDivide',
                    value: 1
                  }}
                />
                <label>
                      <input
                        style={{width: 30}}
                        name="amount"
                        type= "number" />
                    </label>
            <button
              className ="leftBtn"
              name="left"
              disabled = {this.state.mulOrDiv}
              >Go</button>
          </form>
          </div>
          <div>
              <button onClick={() => {this.props.createStep(id)}}>Reset</button>
              <button>Solution</button>
          </div>
      </div>
      )
  }
}

const mapStateToProps = ({equations, steps}) => ({equation: equations.selected});
const mapDispatchToProps = {fetchEquation, postStep, createStep, destroySteps};
export default connect(mapStateToProps, mapDispatchToProps)(Controls);

