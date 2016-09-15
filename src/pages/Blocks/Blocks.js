import React from 'react';
import Tile from '../../components/Tile/Tile.js';
import styles from "./styles/styles.js";
import {
  Button,
  Panel,
  Well
} from 'react-bootstrap';
import GoogleAd from 'react-google-ad';
import update from 'react-addons-update';

const COLORS = ['#16d5eb', '#4ab19d', '#ffe57e', '#e23f3f'];

export default class Blocks extends React.Component {
  state = {
    activeTiles: 0,
    difficulty: 2,
    height: 12,
    level: 0,
    matrix: [],
    score: 0,
    targetScore: 0,
    width: 12
  };

  componentDidMount() {
    this.initGame();
  }

  findSimilar(x, y, color) { // updated
    this.clearSelected();
    const {
      height,
      matrix,
      width
    } = this.state;
    const updatedMatrix = [...matrix];
    let numberOfActiveTiles = 0;
    const activateSimilar = (x, y, color) => {
      if(color !== "transparent") {
        let index = this.getIndex(x, y);
        let t = updatedMatrix[index];
        if (t && t.isChecked === false) {
          if (t.color === color) {
            updatedMatrix[index] = update(updatedMatrix[index], {$merge: {
              isChecked: true,
              active: true
            }});
            numberOfActiveTiles++;
            // check north
            if (y - 1 >= 0) {
              activateSimilar(x, y - 1, color);
            }
            // check south
            if (y + 1 < width) {
              activateSimilar(x, y + 1, color);
            }
            // check east
            if (x + 1 < height) {
              activateSimilar(x + 1, y, color);
            }
            // check west
            if (x - 1 >= 0) {
              activateSimilar(x - 1, y, color);
            }
          }
        }
      }
    }
    activateSimilar(x, y, color);
    if (numberOfActiveTiles > 1) {
      this.setState({matrix: updatedMatrix});
    }
  }

  initGame() { // updated
    const {
      height,
      width
    } = this.state;
    const tile = {
      active: false,
      isChecked: false
    };
    let x = 0;
    let y = 0;
    const matrix = [];
    for (x; x < width; x ++) {
      for (y = 0; y < height; y ++) {
        matrix.push({
          ...tile,
          color: this.getColor(),
          x,
          y
        });
      }
    }
    this.setState({matrix});
  }

  clearSelected() {
    const {
      matrix
    } = this.state;
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = update(matrix[i], {$merge: {
        isChecked: false,
        active: false
      }});
    }
    this.setState({matrix});
  };

  getBlockByIndex(index) { // updated
    const {matrix} = this.state;
    return matrix[index];
  }

  getBlock(x, y) { // updated
    const index = this.getIndex(x, y);
    return this.getBlockByIndex(index);
  }

  getColor() { // updated
    let colorIndex = Math.random() * COLORS.length;
    const color = COLORS[Math.floor(colorIndex)];
    return color;
  }

  getIndex(x, y) { // updated
    const {height} = this.state;
    return (x * height) + y;
  }

  handleTileClick(x, y) {
    const tile = this.getBlock(x, y);
    if (tile.active) {
      this.removeActive();
    } else {
      this.findSimilar(x, y, tile.color);
    }
  }

  removeActive() {
    const {
      height,
      matrix,
      width
    } = this.state;

    const updatedMatrix = [...matrix];

    const swapBlocks = (a, b) => {
      const temp = {...a};
      a.color = b.color;
      b.color = temp.color;
    };

    const collapseColumn = (x) => { //brings tiles down.
      let clearedBlock,
          h,
          t2s, // tile to swap
          cursor; //temp var to check tiles above current tile
          // temp = "";
      for (h = height - 1; h >= 0; h -= 1) { //start from the bottom
        clearedBlock = updatedMatrix[this.getIndex(x, h)];
        if (clearedBlock.color === "transparent") {
          //swap with a block above that isn't cleared
          for (cursor = h - 1; cursor >= 0; cursor -= 1) {
            t2s = updatedMatrix[this.getIndex(x, cursor)]; //find next tile to swap
            if (t2s.color !== "transparent") {
              swapBlocks(clearedBlock, t2s);
              // temp = {...clearedBlock};
              // clearedBlock.color = t2s.color;
              // t2s.color = temp.color;
              if (h > 0) {
                h -= 1;
                clearedBlock = updatedMatrix[this.getIndex(x, h)];
              }
            }
          }
        }
      }
    }

    const isEmptyColumn = (x) => {
        //check if the bottom one is empty
        return updatedMatrix[this.getIndex(x, height - 1)].color === "transparent";
    };

    const swapColumns = (x1, x2) => {
        let h = 0;
        //find the first empty column, and bring the next non-empty column over.
        for(h; h < height;  h += 1) {
            swapBlocks(updatedMatrix[this.getIndex(x1, h)], updatedMatrix[this.getIndex(x2, h)]);
        }
    };

    const collapseRows = () => { //brings tiles from the right
      let w = 0,
        cursor; //column to swap
      //find the first empty column, and bring the next non-empty column over.
      for(w; w < width;  w += 1) {
        if(isEmptyColumn(w)) {
          //find next empty column
          for(cursor = w + 1; cursor < width; cursor += 1) {
            if (!isEmptyColumn(cursor)) {
              swapColumns(w, cursor);
              if(w < width) {
                w += 1;
              }
            }
          }
        }
      }
    }

    // clear all active to cleared
    let w = 0;
    for (let i = 0; i < matrix.length; i++) {
      if (updatedMatrix[i].active) {
          updatedMatrix[i] = update(updatedMatrix[i], {$merge: {
            color: "transparent",
            active: false,
            isChecked: false
          }
        });
      }
    }

    for (w = 0; w < width; w += 1) {
        collapseColumn(w);
    }

    collapseRows();

    this.setState({matrix: updatedMatrix});
  //           if(!this.moreMovesAvailable()) {
  //              this.gameOver();
  //           }
  }

  renderGame() {
    const {matrix} = this.state;
    return (
      <div
        className="row"
        style={styles.gameRow}
      >
        {matrix.map((tile, i) => (
          <Tile
            key={`${i}: (${tile.x}, ${tile.y})`}
            active={tile.active}
            color={tile.color}
            onClick={(x, y) => this.handleTileClick(x, y)}
            x={tile.x}
            y={tile.y}
          />
        ))}
      </div>
    );
  }

  render() {
    const gameHeader = <h4>Blocks</h4>;
    const gameFooter = (
      <div className="game-footer">
        <Button
          bsStyle="primary"
          onClick={() => {this.initGame()}}
        >
          Restart
        </Button>
        <Button
          bsStyle="danger"
          onClick={() => {console.log(this.state.matrix)}}
        >
          Log Matrix
       </Button>
      </div>
    );

    return (
      <div className="blocks">
        <Well bsSize="small" style={styles.gameBootStrapWell}>
          <Panel
            header={gameHeader}
            footer={gameFooter}
          >
            <div style={styles.gamePanelGameContainer}>
              {this.renderGame()}
            </div>
          </Panel>
        </Well>
        <div className="google-ad-container" style={styles.googleAdContainer}>
          <GoogleAd client="ca-pub-7550332846806881" slot="1308243719" format="auto" />
        </div>
      </div>
    );
  }
}



// class Block {
//   //block game
//   Block(config) {
//       var that = this,
//           x = this.x = config && config.x || 0,
//           y = this.y = config && config.y || 0,
//           id = this.id = x + "_" + y,
//           isCleared = this.isCleared = config && config.isCleared || false,
//           isChecked = this.isChecked = config && config.idChecked || false;
//       colors = this.colors = ['#16d5eb', '#4ab19d', '#ffe57e', '#e23f3f'],
//       color = this.color = ((config && config.color === 'random')
//           ? Math.floor(Math.random() * this.colors.length)
//           : config && config.color || 0),
//       game = this.game = config && config.game || null,
//       tile = this.tile = config && config.tile || $('<td>')
//       .data('block', this)
//       .css('background-color', (color === "transparent") ? "transparent" : colors[color])
//           .on('click', function () {
//           if (that.isSelected()) {
//               that.game.clearSelected();
//               var t = that.game.findSimilar(that.x, that.y, that.color),
//                   s = that.game.getNumSelected();
//               if (s <= 1) {
//                   that.game.clearSelected();
//               } else {
//                   $('#console').text(s + " selected.");
//               }
//           } else {
//               that.game.removeSelected();
//           }
//       });
//       tile.addClass("block");
//       this.changeColor = function (color) {
//           this.color = color;
//           if (color === "transparent"){
//               this.tile.css({
//                   "background-color": "transparent",
//                   "cursor": "auto"
//               });
//               ($(this.tile).data('block')).isCleared = true;
//           } else {
//               this.tile.css({
//                   "background-color": colors[color],
//                   "cursor": "pointer"
//               });
//               ($(this.tile).data('block')).isCleared = false;
//           }
//       };
//       this.toString = function () {
//           var str = "";
//           str = "(" + this.x + ", " + this.y + ")";
//           return str;
//       };
//       this.isSelected = function () {
//           return !that.tile.hasClass('selected');
//       };
//       return this;
//   }
//
//   LevelManager(config) {
//       this.score = 0;
//       this.targetScore = 0;
//       this.level = 0;
//       this.difficulty = 2;
//       this.addScore = function (value) {
//           this.score += value;
//       };
//       this.resetScore = function () {
//           this.score = 0;
//       };
//   }
//
//   Tiles(config) {
//       this.matrix = [];
//       this.width = 5;
//       this.height = 5;
//       this.levelManager = {};

//       this.getNumSelected = function () {
//           return $('#board tr td.selected').length;
//       };


//       this.collapseRows = function () { //brings tiles from the right
//           var width = this.width,
//               height = this.height,
//               w = 0,
//               cursor,
//               c2s; //column to swap
//           //find the first empty column, and bring the next non-empty column over.
//           for(w; w < width;  w += 1) {
//               if(this.isEmptyColumn(w)) {
//                   //find next empty column
//                   for(cursor = w + 1; cursor < width; cursor += 1) {
//                       if (!this.isEmptyColumn(cursor)) {
//                           this.swapColumns(w, cursor);
//                           if(w < width) {
//                               w += 1;
//                           }
//                       }
//                   }
//               }
//           }
//       };
//       this.isEmptyColumn = function (col) {
//           //check if the bottom one is empty
//           return this.getBlock(col, this.height-1).isCleared;
//       };

//       this.swapColumns = function (col1, col2) {
//           var width = this.width,
//               height = this.height,
//               h = 0;
//           //find the first empty column, and bring the next non-empty column over.
//           for(h; h < height;  h += 1) {
//               this.swapBlocks(this.getBlock(col1, h), this.getBlock(col2, h));
//           }
//       };
//       this.moreMovesAvailable = function () {
//           var moreMovesLeft = false,
//               that = this;
//           $.each(this.matrix, function(index, block) {
//               if(!block.isCleared) {
//                   var numSelected = 0;
//                   that.findSimilar(block.x, block.y, block.color),
//                   numSelected = that.getNumSelected();
//                   that.clearSelected();
//                   if (numSelected > 1 ) {
//                       moreMovesLeft = true;
//                       return false;
//                   }
//               }
//           });
//           return moreMovesLeft;
//       };
//       this.numBlocksLeft = function () {
//           var count = 0;
//           $.each(this.matrix, function (index, block) {
//               if(!block.isCleared) {
//                   count += 1;
//               }
//           });
//           return count;
//       }
//       this.gameOver = function () {
//           //check for number of blocks left to apply bonus
//           var bonusText = "",
//               numBlocksLeft = this.numBlocksLeft();
//           if(numBlocksLeft === 0) {
//               bonusText = "Congratulations! You've cleared the board!";
//           } else {
//               bonusText = "There are " + numBlocksLeft + " blocks left.  "
//           }
//           $('#console').html(bonusText + "<br />There are no more moves available.  Game over.");
//       };
//   }
//
//   var tiles = new Tiles();
//   tiles.init({
//       width: 15,
//       height: 15
//   });
// }
