import { createContext } from "react";
const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const CurrentSelections = createContext({
  flags: {
    isDiagonal: false,
    isStart: false,
    isStartMaze: false,
    isDarkMode: true,
    isDisabled: false,
    isClearPath: false,
    isWeightedGrid: false,
    isBiDirection: false,
    isTutorial: true,
  },
  parameters:{
    algorithm: "A*",
    heuristic: "Euclidean",
    pattern: "",
  },
  results:{
    numberOfSteps: 0,
    lengthOfPath: 0,
  },
  setResults:(props)=>{},
  setParameters:(props)=>{},
  setFlags:(props)=>{},
})

export { ColorModeContext, CurrentSelections };
