import React from 'react';

const Cell = ({
  active = false,
  column = 0,
  onClick = () => {},
  row = 0
}) => {
  return (
    <div
      className={`cell${active ? " active" : ""}`}
      onClick={(e) => {
        onClick(e, row, column);
      }}
      style={{
        backgroundColor: active ? "black" : "white",
        border: "1px solid",
        display: "inline-block",
        height: 20,
        width: 20
      }}
      title={`(${column}, ${row})`}
    >
      {' '}
    </div>
  );
}

Cell.propTypes = {
  active: React.PropTypes.bool.isRequired,
  column: React.PropTypes.number,
  onClick: React.PropTypes.func,
  row: React.PropTypes.number
}

export default Cell;
