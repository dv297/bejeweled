import { useGameStateStore } from "../stores/GameStateStore";
import Cell from "./Cell";

interface RowProps {
  rowIndex: number;
}

const Row = (props: RowProps) => {
  const { rowIndex } = props;

  const rowData = useGameStateStore((state) => state.grid[rowIndex]);

  return (
    <div className="flex flex-row">
      {rowData.map((cellData, columnIndex) => (
        <Cell
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          key={`${rowIndex}-${columnIndex}`}
        />
      ))}
    </div>
  );
};

export default Row;
