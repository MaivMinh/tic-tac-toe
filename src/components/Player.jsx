import React, { useRef, useState } from "react";

const Player = ({ player, onSave, className, props }) => {
  const [playerName, setPlayerName] = useState(player.name);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef();

  function handleClick() {
    if (!edit) {
      inputRef.current.focus();
      setEdit((prev) => !prev);
    } else {
      // Câu lệnh sẽ thực hiện khi user ấn save.
      setPlayerName(inputRef.current.value);
      onSave((prev) => {
        return {
          ...prev, 
          "name": inputRef.current.value,
        }
      });
      setEdit(prev => !prev);
    }
  }

  function handleChange() {
    setPlayerName(inputRef.current.value);
  }

  return (
    <li className={className}>
      <span className="player">
        <input type="text" required ref={inputRef} value={playerName} onChange={handleChange} disabled={!edit} />
        <span className="player-symbol">{player.symbol}</span>
      </span>
      <button onClick={handleClick}>{edit ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
