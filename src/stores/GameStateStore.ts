import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { CellPosition } from "../types/GameTypes";
import {
  checkMatches,
  doResultsMatchProvidedPosition,
  getGridWithSwappedCells,
  populateEmptyCells,
  removeMatches,
} from "./GameStateStoreUtils";

const MAX_ROWS = 7;
const MAX_COLUMNS = 7;

interface GameStateStoreInterface {
  grid: number[][];
  score: number;
  selectedPosition: undefined | CellPosition;
  setSelectedPosition: (row: number, column: number) => void;
  clearSelectedPosition: () => void;
  matchesSelectedPosition: (row: number, column: number) => boolean;
  handleSelection: (row: number, column: number) => void;
  checkConditionsForSwap: (
    cellPosition1: CellPosition,
    cellPosition2: CellPosition
  ) => boolean;
  swapCells: (cellPosition1: CellPosition, cellPosition2: CellPosition) => void;
  processGrid: () => void;
}

const randomIntFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateGrid = () => {
  let result: number[][] = [];

  for (let i = 1; i <= MAX_ROWS; i++) {
    const row = [];
    for (let j = 1; j <= MAX_COLUMNS; j++) {
      const entry = randomIntFromInterval(0, 6);
      row.push(entry);
    }

    result.push(row);
  }

  return result;
};

const useGameStateStore = create<GameStateStoreInterface>()(
  immer((set, get) => {
    const initialGrid = generateGrid();

    setTimeout(() => {
      get().processGrid();
    }, 1000);

    return {
      grid: initialGrid,
      score: 0,
      selectedPosition: undefined,
      setSelectedPosition: (row, column) => {
        set((state) => {
          state.selectedPosition = [row, column];
        });
      },
      clearSelectedPosition: () => {
        set((state) => {
          state.selectedPosition = undefined;
        });
      },
      matchesSelectedPosition: (row, column) => {
        const [currentRow, currentColumn] = get().selectedPosition ?? [
          undefined,
          undefined,
        ];
        return currentRow === row && currentColumn === column;
      },
      handleSelection: (row, column) => {
        const store = get();
        const newPosition: CellPosition = [row, column];

        if (!store.selectedPosition) {
          store.setSelectedPosition(row, column);
        } else if (store.matchesSelectedPosition(row, column)) {
          store.clearSelectedPosition();
        } else {
          const canSwitchBasedOnPositions = store.checkConditionsForSwap(
            store.selectedPosition,
            [row, column]
          );

          const potentialGrid = getGridWithSwappedCells(
            store.grid,
            store.selectedPosition,
            [row, column]
          );
          const checkMatchesResult = checkMatches(potentialGrid);
          const doesMoveCauseAMatch =
            doResultsMatchProvidedPosition(
              checkMatchesResult.matches,
              store.selectedPosition
            ) ||
            doResultsMatchProvidedPosition(checkMatchesResult.matches, [
              row,
              column,
            ]);

          if (canSwitchBasedOnPositions && doesMoveCauseAMatch) {
            store.swapCells(store.selectedPosition, newPosition);
            store.processGrid();
          } else {
            console.log("Illegal move");
          }
        }
      },
      checkConditionsForSwap: (cellPosition1, cellPosition2) => {
        const diffInRows = Math.abs(cellPosition2[0] - cellPosition1[0]);
        const diffInColumns = Math.abs(cellPosition2[1] - cellPosition1[1]);

        return diffInRows <= 1 && diffInColumns <= 1;
      },
      swapCells: (cellPosition1, cellPosition2) => {
        const store = get();

        set((state) => {
          state.grid = getGridWithSwappedCells(
            state.grid,
            cellPosition1,
            cellPosition2
          );
        });

        store.clearSelectedPosition();
      },
      processGrid: () => {
        setTimeout(() => {
          set((state) => {
            const currentGrid = state.grid;
            let processResults = checkMatches(currentGrid);
            const updatedGrid = removeMatches(currentGrid, processResults);

            const audioElement = document?.getElementById(
              "pop"
            ) as HTMLAudioElement;

            if (audioElement) {
              audioElement.play();
            }
            state.score += processResults.score;
            state.grid = updatedGrid;

            setTimeout(() => {
              set((updatedState) => {
                const updatedGrid2 = populateEmptyCells(
                  get().grid,
                  processResults
                );
                updatedState.grid = updatedGrid2;

                processResults = checkMatches(updatedGrid2);

                if (processResults.matches.length > 0) {
                  get().processGrid();
                }
              });
            }, 400);
          });
        }, 200);
      },
    };
  })
);

export { useGameStateStore };
