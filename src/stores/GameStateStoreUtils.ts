import { CellPosition } from "../types/GameTypes";

const randomIntFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

interface CheckMatchesResult {
  matches: CellPosition[];
  score: number;
}

const checkMatches = (grid: number[][]): CheckMatchesResult => {
  const numberOfRows = grid.length;
  const numberOfColumns = grid[0].length;

  let matches: CellPosition[] = [];
  let score = 0;

  // Check horizontal triplets
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j <= numberOfColumns - 3; j++) {
      if (grid[i][j] === grid[i][j + 1] && grid[i][j] === grid[i][j + 2]) {
        matches.push([i, j]);
        matches.push([i, j + 1]);
        matches.push([i, j + 2]);

        j += 2;
        score += 100;

        if (grid[i][j] === grid[i][j + 1]) {
          matches.push([i, j + 1]);
          j++;
          score += 50;
        }
      }
    }
  }

  // Check vertical triplets, swap i and j for easier traversal
  for (let j = 0; j < numberOfColumns; j++) {
    for (let i = 0; i <= numberOfRows - 3; i++) {
      if (grid[i][j] === grid[i + 1][j] && grid[i][j] === grid[i + 2][j]) {
        matches.push([i, j]);
        matches.push([i + 1, j]);
        matches.push([i + 2, j]);

        i += 2;
        score += 100;

        if (grid[i][j] === grid[i + 1]?.[j]) {
          matches.push([i + 1, j]);
          i++;
          score += 50;
        }
      }
    }
  }

  return {
    matches,
    score,
  };
};

const removeMatches = (
  grid: number[][],
  matchesResult: CheckMatchesResult
): number[][] => {
  const updatedGrid = cloneGrid(grid);

  matchesResult.matches.forEach((cellPosition) => {
    updatedGrid[cellPosition[0]][cellPosition[1]] = -1;
  });

  return updatedGrid;
};

const populateEmptyCells = (
  grid: number[][],
  matchesResult: CheckMatchesResult
): number[][] => {
  const updatedGrid = cloneGrid(grid);

  matchesResult.matches.forEach((cellPosition) => {
    const row = cellPosition[0];
    const column = cellPosition[1];

    for (let i = row; i > 0; i--) {
      updatedGrid[i][column] = updatedGrid[i - 1][column];
    }

    updatedGrid[0][column] = -1;
  });

  for (let i = 0; i < updatedGrid.length; i++) {
    for (let j = 0; j < updatedGrid[i].length; j++) {
      if (updatedGrid[i][j] === -1) {
        updatedGrid[i][j] = randomIntFromInterval(0, 6);
      }
    }
  }

  return updatedGrid;
};

const getGridWithSwappedCells = (
  grid: number[][],
  cellPosition1: CellPosition,
  cellPosition2: CellPosition
): number[][] => {
  const updatedGrid = cloneGrid(grid);
  const tempValue = grid[cellPosition1[0]][cellPosition1[1]];

  const [row1, column1] = cellPosition1;
  const [row2, column2] = cellPosition2;

  updatedGrid[row1][column1] = updatedGrid[row2][column2];
  updatedGrid[row2][column2] = tempValue;

  return updatedGrid;
};

const cloneGrid = (grid: number[][]): number[][] => {
  const numberOfRows = grid.length;
  const numberOfColumns = grid[0].length;

  let result: number[][] = [];

  for (let i = 0; i < numberOfRows; i++) {
    const row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      const entry = grid[i][j];
      row.push(entry);
    }

    result.push(row);
  }

  return result;
};

const doResultsMatchProvidedPosition = (
  results: CellPosition[],
  cellPosition: CellPosition
) => {
  return results.some((result) => {
    return result[0] === cellPosition[0] && result[1] === cellPosition[1];
  });
};

export {
  checkMatches,
  removeMatches,
  populateEmptyCells,
  getGridWithSwappedCells,
  doResultsMatchProvidedPosition,
};
