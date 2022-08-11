import { useState } from "react";
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
  const [, setReconciliationKey] = useState(0);
  const { rowIndex, columnIndex } = props;
  const cellData = useGameStateStore(
    (state) => state.grid[rowIndex][columnIndex]
  );
  const matchesSelectedPosition = useGameStateStore(
    (state) => state.matchesSelectedPosition
  );
  const handleSelection = useGameStateStore((state) => state.handleSelection);
  const isSelected = matchesSelectedPosition(rowIndex, columnIndex);

  const key = cellData as keyof typeof ColorMapping;
  const color = ColorMapping[key];

  /**
   * Forces this component to update.
   *
   * Because our global state management holds the state of what is "selected", the cells don't naturally re-render when
   * there is a new selection. This is normally good; we don't want the entire board to re-render as we change a single
   * cell. But we do want the cell we interacted with to actually show the selection outline. This triggers a state
   * update, which causes the component to re-render and show the selection outline.
   */
  const forceUpdate = () => {
    setReconciliationKey((key) => key + 1);
  };

  const onCellClick = () => {
    handleSelection(rowIndex, columnIndex);
    forceUpdate();
  };

  return (
    <div
      className={`w-20 h-20 border-gray-300 border flex justify-center items-center`}
    >
      <button
        onClick={onCellClick}
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
