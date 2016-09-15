import React from 'react';

export const tileWidth = 35;
export const tileHeight = 25;

const Tile = ({
  active = false,
  color = '',
  onClick = () => {},
  x = 0,
  y = 0
}) => {
  const onTileClick = (e) => {
    e.preventDefault();
    onClick(x, y);
  }
  return (
    <div
      className={`cell${active ? " active" : ""}`}
      onClick={onTileClick}
      style={{
        backgroundColor: color,
        // border: active ? "1px solid" : "none",
        cursor: active ? "auto" : "pointer",
        display: color !== "transparent" ? "block" : "none",
        height: tileHeight,
        left: x * tileWidth,
        opacity: active ? .8 : 1,
        position: "absolute",
        top: y * tileHeight,
        width: tileWidth
      }}
      title={`(${x}, ${y})`}
    >
      {' '}
    </div>
  );
}

Tile.propTypes = {
  active: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func,
  x: React.PropTypes.number,
  y: React.PropTypes.number
}

export default Tile;
