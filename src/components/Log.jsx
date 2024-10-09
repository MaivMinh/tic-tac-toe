import React from 'react'

const Log = ({id, turns, ascending, props}) => {

  let content = null;
  if(!ascending) {
    turns = [...turns].reverse();
  }

  
  return (
    <ol id={id}>
      {turns.map((turn, index) => {
        return (
          <li key={index}>{turn.player} selected #{turn.square.row + 1}{turn.square.col + 1}</li>
        );
      })}
    </ol>
  )
}

export default Log