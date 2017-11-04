import React, {Component} from 'react';
import store from '../store';
import {connect} from 'react-redux';


export default function Controls (props){
    return (
    <div id="controls">
        <div>
        <table>
        <thead>
            <tr>
                <th>Controls</th>
            </tr>
            <tr>
            <th>Left Expression</th>
            <th>Right Expression</th>
            </tr>
        </thead>
            <tbody>
                <tr>
                    <td>
                        <span>Variable:</span>
                        <button
                            onClick={props.variableClick}
                            value={'addVarLeft'}
                            >+</button>
                        <span className ="variable">{props.var}</span>
                        <button
                            onClick={props.variableClick}
                            value={'subVarLeft'}
                            >-</button>
                    </td>
                    <td>
                        <span>Variable:</span>
                        <button
                            onClick={props.variableClick}
                            value={'addVarRight'}
                            >+</button>
                        <span className ="variable">{props.var}</span>
                        <button
                            onClick={props.variableClick}
                            value={'subVarRight'}
                            >-</button>
                        </td>
                </tr>
                <tr>
                    <td>
                        <span>Constant:</span>
                        <button
                            onClick={props.constClick}
                            value={'addConstLeft'}
                            >+</button>
                        <span className = "Constant">1</span>
                        <button
                            onClick={props.constClick}
                            value={'subConstLeft'}
                            >-</button>
                        </td>
                    <td>
                        <span>Constant:</span>
                        <button
                            onClick={props.constClick}
                            value={'addConstRight'}
                            >+</button>
                        <span className = "Constant">1</span>
                        <button
                            onClick={props.constClick}
                            value={'subConstRight'}
                            >-</button>
                        </td>
                </tr>
        </tbody>
    </table>
        </div>
        <div>
            <button>Reset</button>
            <button>Solution</button>
        </div>
    </div>
    )
}
