import React, {Component} from 'react';

export function expand (equation)  {
  let sign = ' ';
  const space = ' ';
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
