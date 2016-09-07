import React from 'react';
import Cell from '../../components/Cell/Cell.js';
import styles from "./styles/styles.js";
import {
  Button,
  Panel,
  Well
} from 'react-bootstrap';
import GoogleAd from 'react-google-ad';

const LIFE_PERCENTAGE = .2

export default class GameOfLife extends React.Component {
  state = {
    columns: 20,
    cycleInterval: undefined,
    isCycling: false,
    matrix: [],
    rows: 20
  };

  componentDidMount() {
    this.initGame();
  }

  createAndDestroy() {
    const {matrix} = this.state;
    matrix.forEach((row, r) => {
      row.forEach((cell, c) => {
        const neighborObject = this.getNeighborsObject(r, c);
        const numberOfNeighbors = Object.keys(neighborObject).filter((key) => neighborObject[key] === true).length;
        if (matrix[r][c].active) {
          // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
          // Any live cell with more than three live neighbours dies, as if by over-population.
          if (numberOfNeighbors < 2 || numberOfNeighbors > 3) {
            matrix[r][c].willChangeActiveState = true;
          }
          // Any live cell with two or three live neighbours lives on to the next generation.
          if (numberOfNeighbors === 2 || numberOfNeighbors === 3) {
            matrix[r][c].willChangeActiveState = false;
          }
        } else {
          // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
          if (numberOfNeighbors === 3) {
            matrix[r][c].willChangeActiveState = true;
          }
        }
      });
    });
    matrix.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (matrix[r][c].willChangeActiveState) {
          matrix[r][c].active = !matrix[r][c].active;
          matrix[r][c].willChangeActiveState = false;
        }
      });
    });
    this.setState({matrix});
  }

  getNeighborsObject(row, column) {
    const {
      columns,
      matrix,
      rows
    } = this.state;
    const neighborObject = {
      aTopLeft: row > 0 && column > 0 ? matrix[row - 1][column - 1].active : null,
      bTop: row > 0 ? matrix[row - 1][column].active : null,
      cTopRight: row > 0 && column < columns - 1 ? matrix[row - 1][column + 1].active : null,
      dLeft: column > 0 ? matrix[row][column - 1].active : null,
      eRight: column < columns - 1 ? matrix[row][column + 1].active : null,
      fBottomLeft: row < rows - 1 && column > 0 ? matrix[row + 1][column - 1].active : null,
      gBottom: row < rows - 1 ? matrix[row + 1][column].active : null,
      hBottomRight: row < rows - 1 && column < columns - 1 ? matrix[row + 1][column + 1].active : null
    };
    return neighborObject;
  }

  initGame() {
    const {
      columns,
      matrix,
      rows
    } = this.state;
    const cell = {
      active: false,
      hasChanged: false,
      willChangeActiveState: false
    };
    let c = 0;
    let r = 0;
    for (r; r < rows; r ++) {
      matrix[r] = [];
      for (c = 0; c < columns; c ++) {
        matrix[r][c] = {
          ...cell,
          active: (Math.random() < LIFE_PERCENTAGE)
        };
      }
    }
    this.setState({matrix});
  }

  onClickCell(e, row, column) {
    const {matrix} = this.state;
    matrix[row][column].active = !matrix[row][column].active;
    this.setState({matrix});
  }

  renderGame() {
    const {matrix} = this.state;
    return matrix.map((column, c) => (
      <div
        className="row"
        style={styles.gameRow}
        key={c}
      >
        {column.map((cell, r) => (
          <Cell
            key={`(${c}, ${r})`}
            active={matrix[c][r].active}
            column={r}
            onClick={(e, r, c) => this.onClickCell(e, r, c)}
            row={c}
          />
        ))}
      </div>
    ));
  }

  toggleCycling() {
    const game = this.state;
    if (!game.isCycling) {
      game.cycleInterval = setInterval(() => this.createAndDestroy(), 100);
      game.isCycling = true;
    } else {
      clearInterval(game.cycleInterval);
      game.isCycling = false;
    }
    this.setState({game});
  }

  render() {
    const {isCycling} = this.state;
    const gameHeader = <h4>Game Of Life</h4>;
    const gameFooter = (
      <div className="game-footer">
        <Button
          bsStyle="primary"
          onClick={() => {this.initGame()}}
        >
          Give life!
        </Button>
        <Button onClick={() => {this.createAndDestroy()}}>Single Cycle</Button>
        <Button
          bsStyle={isCycling ? "danger" : "success"}
          onClick={() => {this.toggleCycling()}}
        >
          {isCycling ? "Stop Cycling" : "Start Cycling"}
        </Button>
      </div>
    );

    return (
      <div className="gameoflife">
        <Well bsSize="small" style={styles.gameBootStrapWell}>
          <Panel
            header={gameHeader}
            footer={gameFooter}
          >
            {this.renderGame()}
          </Panel>
        </Well>
        <div className="google-ad-container" style={styles.googleAdContainer}>
          <GoogleAd client="ca-pub-7550332846806881" slot="1308243719" format="auto" />
        </div>
      </div>
    );
  }
}
