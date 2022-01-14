import { DarkMode, StartButton, TrueFalseButton, SliceBar } from "./Buttons";
import { Dropdown, DropdownItem } from "./Dropdown";

const Head = (props) => {
  const {
    timeRatio,
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
    onSlice,
  } = props;
  return (
    <div className="relative bg-white z-10 dark:bg-gray-900 dark:text-white">
      <div className="justify-items-center sm:flex-col md:flex-row flex flex-wrap md:justify-between items-center border-b-2 border-gray-100 dark:border-gray-700 py-2 sm:justify-start md:space-x-10">
        <div className="justify-start px-5">
          <a
            href="#"
            className="italic dark:text-white text-gray-700 inline-flex items-center text-base font-black"
          >
            Path Finding Visualizer
          </a>
        </div>
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

        <Dropdown name="Parameters">
          <DropdownItem>
            <TrueFalseButton
              buttonName="Diagonal is allowed"
              flag={allowDiagonal}
              setFlag={setAllowDiagonal}
            />
          </DropdownItem>
          <DropdownItem>
            <SliceBar
              name="Animation Speed: "
              timeRatio={timeRatio}
              onSlice={onSlice}
            />
          </DropdownItem>
        </Dropdown>
        <div className="pl-52 pr-5">
          <DarkMode f={() => setDarkMode()} />
        </div>
      </div>
    </div>
  );
};

export default Head;
