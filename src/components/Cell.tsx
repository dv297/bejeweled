import clsx from "clsx";
import { useGameStateStore } from "../stores/GameStateStore";

interface CellProps {
  rowIndex: number;
  columnIndex: number;
}

const ColorMapping = {
  "-1": "bg-white !border-0",
  0: "bg-red-500",
  1: "bg-orange-500",
  2: "bg-yellow-500",
  3: "bg-green-600",
  4: "bg-blue-500",
  5: "bg-purple-400",
  6: "bg-teal-400",
};

const Cell = (props: CellProps) => {
  const { rowIndex, columnIndex } = props;
  const cellData = useGameStateStore(
    (state) => state.grid[rowIndex][columnIndex]
  );
  const { matchesSelectedPosition, handleSelection } = useGameStateStore();
  const isSelected = matchesSelectedPosition(rowIndex, columnIndex);

  const key = cellData as keyof typeof ColorMapping;
  const color = ColorMapping[key];

  return (
    <div
      className={`w-20 h-20 border-gray-300 border flex justify-center items-center`}
    >
      <button
        onClick={() => {
          handleSelection(rowIndex, columnIndex);
        }}
        className={clsx(
          `border rotate-45 w-10 h-10 ${color} flex justify-center items-center hover:border-yellow-300 hover:border-2 hover:shadow-gray-400 hover:shadow-md`,
          {
            "!border-rose-700 !border-4": isSelected,
          }
        )}
      />
    </div>
  );
};

export default Cell;
