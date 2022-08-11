import { checkMatches } from "./GameStateStoreUtils";
import { CellPosition } from "../types/GameTypes";

describe("GameStateStoreUtils", () => {
  describe("checkMatches", () => {
    it("returns an empty array when there are no matches", () => {
      const input = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ];

      const result = checkMatches(input);

      const expectedOutput: CellPosition[] = [];
      expect(result.matches).toEqual(expectedOutput);
    });

    it("returns the 3 entries in a row when there is a horizontal match", () => {
      const input = [
        [1, 1, 1, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ];

      const result = checkMatches(input);

      const expectedOutput: CellPosition[] = [
        [0, 0],
        [0, 1],
        [0, 2],
      ];
      expect(result.matches).toEqual(expectedOutput);
    });

    it("returns the 4 entries in a row when there is a horizontal match", () => {
      const input = [
        [1, 1, 1, 1],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ];

      const result = checkMatches(input);

      const expectedOutput: CellPosition[] = [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ];
      expect(result.matches).toEqual(expectedOutput);
    });

    it("returns the 3 entries in a row when there is a horizontal match on the right edge", () => {
      const input = [
        [0, 1, 1, 1],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ];

      const result = checkMatches(input);

      const expectedOutput: CellPosition[] = [
        [0, 1],
        [0, 2],
        [0, 3],
      ];
      expect(result.matches).toEqual(expectedOutput);
    });

    it("returns the 3 entries in a column when there is a vertical match", () => {
      const input = [
        [0, 1, 2, 3],
        [0, 6, 7, 8],
        [0, 10, 11, 12],
        [1, 13, 14, 15],
      ];

      const result = checkMatches(input);

      const expectedOutput: CellPosition[] = [
        [0, 0],
        [1, 0],
        [2, 0],
      ];
      expect(result.matches).toEqual(expectedOutput);
    });

    it("returns the 4 entries in a column when there is a vertical match", () => {
      const input = [
        [0, 1, 2, 3],
        [0, 6, 7, 8],
        [0, 10, 11, 12],
        [0, 13, 14, 15],
      ];

      const result = checkMatches(input);

      const expectedOutput: CellPosition[] = [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ];
      expect(result.matches).toEqual(expectedOutput);
    });

    it("returns the 3 entries in a column when there is a vertical match on the bottom edge", () => {
      const input = [
        [1, 1, 2, 3],
        [0, 6, 7, 8],
        [0, 10, 11, 12],
        [0, 13, 14, 15],
      ];

      const result = checkMatches(input);

      const expectedOutput: CellPosition[] = [
        [1, 0],
        [2, 0],
        [3, 0],
      ];
      expect(result.matches).toEqual(expectedOutput);
    });
  });
});
