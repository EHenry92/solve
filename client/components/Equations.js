import React, {Component} from 'react';
import store from '../store';
import { NavLink } from 'react-router-dom';
import {fetchEquations} from './index';
import expand from '../../public/function.js';
import {connect} from 'react-redux';


export default class Equations extends Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
    }
    componentWillMount()  {
      store.dispatch(fetchEquations());
      this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    componentWillUnmount () {
      this.unsubscribe();
    }

    render ()   {
      const info = this.state.equations;
        return (
            <div>
              <ul>
              {
                info.map(equation => {
                  return (
                      <li key={equation.id}>
                      <span><NavLink to={`equation/${equation.id}`}>*</NavLink></span>
                      <span>{expand(equation)}</span>
                      </li>
                  )
                })
              }
              </ul>
            </div>

        )
    }
}
