import Cell from "./Cell";
import { useMemo } from "react";

const Board = () => {
  // Generate cells based on numerical index rather than reading the grid data structure to prevent re-render of entire
  // board on interaction
  const cells = useMemo(() => {
    const result = [];
    for (let i = 0; i < 49; i++) {
      const rowIndex = Math.floor(i / 7);
      const columnIndex = i % 7;
      result.push(
        <Cell
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          key={`${rowIndex}-${columnIndex}`}
        />
      );
    }

    return result;
  }, []);

  return <div className="grid grid-cols-7">{cells}</div>;
};

export default Board;
