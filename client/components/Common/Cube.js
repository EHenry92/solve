import React from 'react';

const Cube = ({text, fontSize, scale = 4}) => {
  const faceStyle = {
    padding: 10,
    width: (10 * scale),
    height: (10 * scale),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const styles = {
    cubeStyle: {
      position: 'relative',
      top: (200*(scale/8))
    },
    rightFaceStyle: {
      ...faceStyle,
      position: 'absolute',
      left: ((5 * scale)+ 10),
      backgroundColor: '#ddd',
      transform: `skewY(-30deg) scale(${scale / 8})`

    },
    leftFaceStyle: {
      ...faceStyle,
      position: 'absolute',
      backgroundColor: '#ccc',
      transform: `skewY(30deg) scale(${(scale / 8)})`
    },
    topFaceStyle: {
      position: 'absolute',
      top: ((-100/scale)),
      left: (100/scale - 10),
      transform: `rotate(60deg) scale(${scale / 8})`
    },
    topFaceDivStyle: {
      ...faceStyle,
      backgroundColor: '#eee',
      // fontSize: 0.862,
      transform: 'skewY(-30deg) scaleY(1.16)'
    },
    textStyle: {
      alignSelf: 'center',
      justifySelf: 'center'
    }
  }
  const {cubeStyle, rightFaceStyle, leftFaceStyle, topFaceDivStyle, topFaceStyle} = styles;
  return (
    <div style={{...cubeStyle, fontSize: fontSize}}>
      <div style={topFaceStyle}>
        <div style={topFaceDivStyle}>
          {text}
        </div>
      </div>
      <div style={leftFaceStyle}>
        {text}
      </div>
      <div style={rightFaceStyle}>
        {text}
      </div>
    </div>
  )
}

// const faceStyle = {
//   padding: 10,
//   width: 180,
//   height: 180,
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
// }

// const styles = {
//   cubeStyle: {
//     position: 'relative',
//     top: 200
//   },
//   rightFaceStyle: {
//     ...faceStyle,
//     position: 'absolute',
//     left: 200,
//     backgroundColor: '#ddd',
//     transform: 'skewY(-30deg)'

//   },
//   leftFaceStyle: {
//     ...faceStyle,
//     position: 'absolute',
//     backgroundColor: '#ccc',
//     transform: 'skewY(30deg)'
//   },
//   topFaceStyle: {
//     position: 'absolute',
//     top: -158,
//     left: 100,
//     transform: 'rotate(60deg)'
//   },
//   topFaceDivStyle: {
//     ...faceStyle,
//     backgroundColor: '#eee',
//     fontSize: 0.862,
//     transform: 'skewY(-30deg) scaleY(1.16)'
//   },
//   textStyle: {
//     alignSelf: 'center',
//     justifySelf: 'center'
//   }
// }

export {Cube};
