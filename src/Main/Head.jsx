import { DarkMode, StartButton, TrueFalseButton } from "./Buttons";
import { Dropdown, DropdownItem } from "./Dropdown";

const Head = (props) => {
  const {
    start,
    algorithms,
    heuristics,
    allowDiagonal,
    patterns,
    setHeuristic,
    setAllowDiagonal,
    setAlgorithm,
    setPattern,
    setStart,
    setDarkMode,
  } = props;
  return (
    <div className="relative bg-white z-10 dark:bg-gray-900 dark:text-white">
      <div className="flex md:justify-between items-center border-b-2 border-gray-100 dark:border-gray-700 py-2 sm:justify-start md:space-x-10">
        <div className="flex justify-start">
          <a href="#">icon</a>
        </div>
        <nav className="hidden md:flex space-x-10">
          <Dropdown name="Algorithm">
            {algorithms.map((algorithm) => {
              return (
                <DropdownItem f={() => setAlgorithm(algorithm)}>
                  {algorithm}
                </DropdownItem>
              );
            })}
          </Dropdown>
          <Dropdown name="Heuristic">
            {heuristics[allowDiagonal].map((heuristic) => {
              return (
                <DropdownItem f={() => setHeuristic(heuristic)}>
                  {heuristic}
                </DropdownItem>
              );
            })}
          </Dropdown>
          <StartButton buttonName="Start" setStart={setStart} />
          <Dropdown name="Pattern">
            {patterns.map((pattern) => {
              return (
                <DropdownItem f={() => setPattern(pattern)}>
                  {pattern}
                </DropdownItem>
              );
            })}
          </Dropdown>
          <TrueFalseButton
            buttonName="Diagonal is allowed"
            flag={allowDiagonal}
            setFlag={setAllowDiagonal}
          />
        </nav>
        <DarkMode f={() => setDarkMode()} />
      </div>
    </div>
  );
};

export default Head;
