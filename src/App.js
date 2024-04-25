import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./styles.css";

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

const Box = ({ boxClass, row, col, selectBox }) => {
  const selectBoxHandler = () => {
    selectBox(row, col);
  };

  return <div className={boxClass} onClick={selectBoxHandler} />;
};

const Grid = ({ gridFull, rows, cols, selectBox }) => {
  const width = cols * 16;

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

const App = () => {
  const SPEED = 1000;
  const ROWS = 30;
  const COLS = 50;

  const [generation, setGeneration] = useState(0);
  const [gridFull, setGridFull] = useState(() =>
    Array(30)
      .fill()
      .map(() => Array(50).fill(false))
  );
  const [originalGrid, setOriginalGrid] = useState(gridFull);
  const [intervalId, setIntervalId] = useState(null); // Declare intervalId
  const [isPlaying, setIsPlaying] = useState(true); // game is started on load

  useEffect(() => {
    seed();
    initiateGame();
  }, []);

  // toggle cell
  const selectBox = (row, col) => {
    let gridCopy = arrayClone(gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    setGridFull(gridCopy);
  };

  //initial populating of grid
  const seed = () => {
    let newGrid = arrayClone(gridFull);
    for (let i = 0; i < ROWS; i++) {
      newGrid[i] = [];
      for (let j = 0; j < COLS; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          newGrid[i][j] = true;
        }
      }
    }
    setGridFull(newGrid);
    setOriginalGrid(newGrid);
  };

  const initiateGame = () => {
    clearInterval(intervalId);
    const id = setInterval(play, SPEED);
    setIntervalId(id); // Store intervalId
  };

  const toggleGame = () => {
    if (isPlaying) {
      clearInterval(intervalId); // pauses game
    } else {
      clearInterval(intervalId);
      const id = setInterval(play, SPEED);
      setIntervalId(id); // Store intervalId
    }
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    clearInterval(intervalId);
    setGridFull(originalGrid);
    setGeneration(0);
    setIsPlaying(false);
  };

  const play = () => {
    setGridFull((prevGrid) => {
      // check current state
      let g = prevGrid;
      // change state on clone, to set state of grid with clone at end
      let g2 = arrayClone(prevGrid);

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          let count = 0;
          if (i > 0) if (g[i - 1][j]) count++;
          if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
          if (i > 0 && j < COLS - 1) if (g[i - 1][j + 1]) count++;
          if (j < COLS - 1) if (g[i][j + 1]) count++;
          if (j > 0) if (g[i][j - 1]) count++;
          if (i < ROWS - 1) if (g[i + 1][j]) count++;
          if (i < ROWS - 1 && j > 0) if (g[i + 1][j - 1]) count++;
          if (i < ROWS - 1 && COLS - 1) if (g[i + 1][j + 1]) count++;
          if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
          if (!g[i][j] && count === 3) g2[i][j] = true;
        }
      }
      setGeneration((prevGeneration) => ++prevGeneration);
      return g2;
    });
  };

  return (
    <div>
      <h1>The Game of Life</h1>
      <h2>Generations: {generation}</h2>
      <div id="buttons-section" className="center">
        <div>
          <Button onClick={toggleGame} label={isPlaying ? "Pause" : "Play"} />
          <Button onClick={reset} label="Reset" />
          <Button onClick={seed} label="Reseed" />
        </div>
      </div>
      <Grid gridFull={gridFull} rows={ROWS} cols={COLS} selectBox={selectBox} />
    </div>
  );
};

export default App;
