import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEquation, postStep, createStep, destroySteps} from '../store';


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
      this.changeHandler = this.changeHandler.bind(this);
      this.resetHandler = this.resetHandler.bind(this);
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
    changeHandler(evt)  {
      evt.preventDefault();
      if (this.state.operation === 'multiply') {
        this.setState({operation: 'divide'})
      }
      else {
        this.setState({operation: 'multiply'})}
    }
    resetHandler(evt) {
      evt.preventDefault();
      this.props.createStep(this.props.id);
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
      return (
      <div id="controls">
          <div>
            <table>
              <thead>
                <tr>
                <th>Equation Controls</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td style={{alignContent: 'center'}}>
                  <form
                      name= "left"
                      onSubmit = {this.MulOrDivHandler}>

                      <input
                        id="multiplyLeft"
                        type="radio"
                        name="multiplyOrDivide"
                        value = "multiply"
                        defaultChecked = {true}
                        onChange = {this.changeHandler}
                      />
                      <label htmlFor="multiplyLeft" > multiply
                    </label>

                      <input
                        id="divideLeft"
                        type="radio"
                        name="multiplyOrDivide"
                        value="divide"
                        defaultChecked = {false}
                        onChange = {this.changeHandler}
                      />
                      <label htmlFor="divideLeft"> divide
                    </label>
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
                </td>
                </tr>
              </tbody>
              </table>
                  <table>
                    <thead>
                        <tr>
                        <th className = "leftVis center-align">Left Expression</th>
                        <th className="eq"> = </th>
                        <th className = "rightVis center-align">Right Expression</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className = "leftVis center-align">
                            <button
                                className="waves-effect waves-light #2196f3 blue leftBtn"
                                name="left"
                                onClick={this.singleClick}
                                value={'addCo'}
                                >+{this.props.equation.var}</button>
                                <span>Variable:</span>
                            <button
                                className="waves-effect waves-light #2196f3 blue leftBtn"
                                name="left"
                                onClick={this.singleClick}
                                value={'subCo'}
                                >-{this.props.equation.var}</button>
                          </td>
                          <td className="eq" />
                          <td className = "rightVis center-align">
                            <button
                                name="right"
                                className="waves-effect waves-light #2196f3 blue rightBtn"
                                onClick={this.singleClick}
                                value={'addCo'}
                                >+{this.props.equation.var}</button>
                                <span>Variable:</span>
                            <button
                                name="right"
                                className="waves-effect waves-light #2196f3 blue rightBtn"
                                onClick={this.singleClick}
                                value={'subCo'}
                                >-{this.props.equation.var}</button>
                          </td>
                        </tr>
                        <tr>
                          <td className = "leftVis center-align">
                              <button
                                  name="left"
                                  className="waves-effect waves-light #2196f3 blue leftBtn"
                                  onClick={this.singleClick}
                                  value={'addConst'}
                                  >+1</button>
                                  <span>Constant:</span>
                              <button
                                  name = "left"
                                  className="waves-effect waves-light #2196f3 blue leftBtn"
                                  onClick={this.singleClick}
                                  value={'subConst'}
                                  >-1</button>
                          </td>
                          <td className="eq" />
                          <td className = "rightVis center-align">

                              <button
                                  name="right"
                                  className="waves-effect waves-light #2196f3 blue rightBtn"
                                  onClick={this.singleClick}
                                  value={'addConst'}
                                  >+1</button>
                                  <span>Constant:</span>
                              <button
                                  name="right"
                                  className="waves-effect waves-light #2196f3 blue rightBtn"
                                  onClick={this.singleClick}
                                  value={'subConst'}
                                  >-1</button>
                          </td>
                        </tr>
                    </tbody>
                  </table>
          </div>
          <div>
              <button onClick={this.resetHandler}>Reset</button>
              <button>Solution</button>
          </div>
      </div>
      )
  }
}

const mapStateToProps = ({equations, steps}) => ({equation: equations.selected});
const mapDispatchToProps = {fetchEquation, postStep, createStep, destroySteps};
export default connect(mapStateToProps, mapDispatchToProps)(Controls);


<table className= {`${side}side`}>
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


      </td>
    </tr>
  </tbody>
  </table>
