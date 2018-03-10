import React from 'react';
import {fetchEquation} from '../store';
import {connect} from 'react-redux';
import {Cube} from './Common';

export function Visual (props){
        let leftVariable = [];
        let rightVariable = [];
        let leftConstant = [];
        let rightConstant = [];
        return (
        <table id="visual">
          <tbody>
            <tr>
            <td className="leftVis leftSide">
            {   props.equation &&
                visualize(props.equation.lCo, 'variable', leftVariable, props.equation.var)
            }
            {   props.equation &&
                visualize(props.equation.lConst, 'constant', leftConstant)
            }
            </td>
            <td className="eq"> = </td>
            <td className="rightVis rightSide">
            {
                props.equation &&
                visualize(props.equation.rCo, 'variable', rightVariable, props.equation.var)
            }
            {
                props.equation &&
                visualize(props.equation.rConst, 'constant', rightConstant)
            }
            </td>
            </tr>
          </tbody>
        </table>
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
            // if (type == 'constant'){
              array.push(
                <div className={type} key={i + type}>{value}</div>

              )
            // }
            // else {
            //   array.push(
            //     <div className={type} key={i + type}>
            //       <Cube className={type} text={value} fontSize={15} />
            //     </div>
            //   )
            // }

      }
        return array;
    }
}

const mapStateToProps = ({equations, steps}) => ({equation: steps.list[steps.list.length - 1], steps: steps.list, selected: equations.selected});
const mapDispatchToProps = {fetchEquation};
export default connect(mapStateToProps, mapDispatchToProps)(Visual);
