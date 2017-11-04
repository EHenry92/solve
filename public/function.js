import React, {Component} from 'react';

export default function expand (equation)  {
  let sign = ' ';
  const space = ' ';
  //Comment
      // let combined;
    //   if (!simplified)  {
    //     combined = {};
    //     combined.id = equation.id;
    //     combined.var = equation.var;
    //     combined.lCo = equation.lCo.reduce(function (acc,el) {
    //       return acc + el;
    //     }, 0);
    //     combined.rCo = equation.rCo.reduce(function (acc,el) {
    //       return acc + el;
    //     }, 0);
    //     combined.lConst = equation.lConst.reduce(function (acc, el) {
    //       return acc + el;
    //     }, 0);
    //     combined.rConst = equation.rConst.reduce(function (acc, el) {
    //       return acc + el;
    //     }, 0);
    //   }
    //   else {
    //     combined = equation;
    //   }
  return (
    <span>
            <span>
              {
                equation.lCo.map((co, idx) => {
                  if (co > 0 && idx !== 0) { sign = ' + '}
                  else {sign = ' '}
                  return (<span key={co}>
                  {sign}{co}{equation.var}
                  </span>
                  )
                })
              }
              {
                equation.lConst.map((num) => {
                  if (num > 0) {sign = ' + '}
                  else {sign = ' '}
                  return (<span key={num}>
                  {sign}{num}
                  </span>
                  )
                })
              }
          </span>
          <span>{space}={space}</span>
          <span>
              {
                equation.rCo.map((co, idx) => {
                  if (co > 0 && idx !== 0) { sign = ' + '}
                  else {sign = ' '}
                  return (<span key={co}>
                  {sign}{co}{equation.var}
                  </span>
                  )
                })
              }
              {
                equation.rConst.map(num => {
                  if (num > 0) {sign = ' + '}
                  else {sign = ' '}
                  return (<span key={num}>
                  {sign}{num}
                  </span>
                  )
                })
              }
          </span>
      </span>
  )
}
