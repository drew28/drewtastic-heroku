import React from 'react';

export const tileWidth = 35;
export const tileHeight = 25;

const Tile = ({
  active = false,
  color = '',
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
        backgroundColor: color,
        // border: active ? "1px solid" : "none",
        cursor: active ? "auto" : "pointer",
        display: "inline-block",
        height: tileHeight,
        opacity: active ? .8 : 1,
        width: tileWidth
      }}
      title={`(${column}, ${row})`}
    >
      {' '}
    </div>
  );
}

Tile.propTypes = {
  active: React.PropTypes.bool.isRequired,
  column: React.PropTypes.number,
  onClick: React.PropTypes.func,
  row: React.PropTypes.number
}

export default Tile;
