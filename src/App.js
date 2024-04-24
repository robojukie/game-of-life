import { useState } from "react";

const Box = ({ boxClass, row, col, selectBox }) => {
  const selectBoxHandler = () => {
    selectBox(row, col);
  };
  return <div className={boxClass} onClick={selectBoxHandler}></div>;
};

const Grid = ({ gridFull, rows, cols, selectBox }) => {
  const width = cols * 14;

  let rowsArr = [];
  let boxClass = "";

  for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
    for (let colIdx = 0; colIdx < cols; colIdx++) {
      let boxId = rowIdx + "_" + colIdx;
      boxClass = gridFull[rowIdx][colIdx] ? "box on" : "box off";
      rowsArr.push(
        <Box
          key={boxId}
          boxId={boxId}
          boxClass={boxClass}
          row={rowIdx}
          col={colIdx}
          selectBox={selectBox}
        />
      );
    }
  }
  return (
    <div className="grid" style={{ width }}>
      {rowsArr}
    </div>
  );
};

// The must-have requirements for the implementation are as follows:
// * It should be playable on a grid of cells, which can be toggled between alive and dead using the mouse.
// * It should progress through generations automatically, according to the Game of Life rules.
// * It should have a pause/play button that allows the user to pause and resume the game.
// * It should have a reset button that resets the grid to its initial state.

// Pause/play
// reset
const Button = ({ label }) => {
  return <button>{label}</button>;
};

// Potential future features
// - allow user to input grid size or select grid size
// - option to step through generations (instead of automatically progressing through generations )

function Game() {
  const SPEED = 1000;
  const ROWS = 30;
  const COLS = 50;

  const [generation, setGeneration] = useState(0);
  const [gridFull, setGridFull] = useState(() =>
    Array(ROWS)
      .fill()
      .map(() => Array(COLS).fill(false))
  );
  //initial populating of grid

  // toggle cell

  // pause/resume game

  //reset game

  const selectBox = () => {
    return <></>;
  };

  return (
    <div class="center">
      <h1>Conway's Game of Life</h1>
      <p>Generation: {generation}</p>
      <div id="button-section">
        {/* add logic for pause/play label */}
        <Button>Pause/Play</Button>
        <Button>Reset</Button>
      </div>
      <Grid
        gridFull={gridFull}
        rows={ROWS}
        cols={COLS}
        selectBox={selectBox}
      ></Grid>
    </div>
  );
}

export default Game;
