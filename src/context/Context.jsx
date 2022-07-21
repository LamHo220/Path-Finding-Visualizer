import { createContext } from "react";
const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const CurrentSelections = createContext({
  algorithm: 'A Star',
  heuristic: 'Manhattan',
  maze: 'Self-Defined',
  weighted: false,
  diagonal: false,
  biDirection: false,
  setAlgorithm: (props) => {},
  setHeuristic: (props) => {},
  setMaze: (props) => {},
  setWeighted: (props) => {},
  setDiagonal: (props) => {},
  setBiDirection: (props) => {},
})

export { ColorModeContext, CurrentSelections };
