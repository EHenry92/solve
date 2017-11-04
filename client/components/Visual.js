import React, {Component} from 'react';
import store from '../store';
import {fetchEquation} from './index';
import postStep from '../store/reducer';
import {connect} from 'react-redux';



export function Visual (props){
        let leftVariable = [];
        let rightVariable = [];
        let leftConstant = [];
        let rightConstant = [];
        return (
        <div id="visual">
            <div className="leftSide">
            {
                visualize(props.equation.lCo, 'variable', leftVariable, props.equation.var)
            }
            {
                visualize(props.equation.lConst, 'constant', leftConstant)
            }
            </div>
            <div className="rightSide">
            {
                visualize(props.equation.rCo, 'variable', rightVariable, props.equation.var)
            }
            {
                visualize(props.equation.rConst, 'constant', rightConstant)
            }
            </div>
        </div>
        )


    function visualize(number, type, array, variable)  {
        array = [];
        let sign;
        number < 0 ? sign = 'negative' : sign = 'positive';

        let value;
        if (type === 'variable')  {
            if (sign === 'negative') {value = ('-' + variable);}
            else { value = variable;}
        }
        else if (type === 'constant')  {
            if (sign === 'negative')   {value = '-1';}
            else {value = '1';}
        }
        const amount = Math.abs(number);
        for (var i = 0;i < amount; i++)  {
            array.push( <div className={type} key={number + i}>{value}</div>)
            }
        return array;
    }
}

const mapStateToProps = ({selected, steps, lastStep}) => ({equation: lastStep, steps, selected});
const mapDispatchToProps = {fetchEquation, postStep};
export default connect(mapStateToProps, mapDispatchToProps)(Visual);
