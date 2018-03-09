import React from 'react';

const ThisOrThat = ({text, leftButton, rightButton, onClick}) => {
    return (
      <div style={styles.containerStyle}>
        <button
          name = {leftButton.name}
          value = {leftButton.value}
          onClick = {onClick}
        >
          {leftButton.text}
        </button>
        <span>{text}</span>
        <button
          name = {rightButton.name}
          value = {rightButton.value}
          onClick = {onClick}
          >
          {rightButton.text}
        </button>
      </div>
    )
}
const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row'
  }
};

export {ThisOrThat};
