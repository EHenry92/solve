import React, {Component} from 'react';
import {fetchEquation} from '../store';
import Visual from './Visual';
import Controls from './Controls';
import Algebra from './Algebra';
import {expand} from '../../public/function.js';
import {connect} from 'react-redux';

const SingleEquation = (props) => {
        const equation = props.selected;
        let expanded;
        if (Object.keys(equation).length !== 0)  {
            expanded = expand(equation);
        }
        return (
        <div id="singleEquation">
            <div>
                <div className = "center-align">
                   <h3> {expanded} </h3>
                </div>
                <Controls
                  id = {props.match.params.id}
                />
            </div>
            <div>
             <div id="box">
                <Visual />
                <Algebra />
              </div>
            </div>
        </div>
        )
}

const mapStateToProps = ({equations, steps}) => ({selected: equations.selected, steps: steps.list, lastStep: steps.lastStep});
const mapDispatchToProps = {fetchEquation};
export default connect(mapStateToProps, mapDispatchToProps)(SingleEquation);
