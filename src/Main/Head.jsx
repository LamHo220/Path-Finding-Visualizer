import { SelectionButton, StartButton, TrueFalseButton } from "./Buttons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
  } = props;
  return (
    <div className="relative bg-white z-10">
      <div className="flex md:justify-between items-center border-b-2 border-gray-100 py-2 sm:justify-start md:space-x-10">
        <div className="flex justify-start">
          <a href="#">icon</a>
        </div>
        <nav className="hidden md:flex space-x-10">
          <SelectionButton buttonName="Algorithm" icon={faChevronDown}>
            <div className="absolute">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-2 bg-white px-3 py-3">
                  {algorithms.map((algorithm) => {
                    return (
                      <a
                        onClick={() => setAlgorithm(algorithm)}
                        href="#"
                        className="transition ease-in-out delay-150 hover:scale-105 duration-100 hover:text-gray-900 text-gray-400 text-sm whitespace-nowrap p-1 flex items-start rounded-lg "
                      >
                        {algorithm}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </SelectionButton>
          <SelectionButton buttonName="Heuristic" icon={faChevronDown}>
            <div className="absolute">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-2 bg-white px-3 py-3">
                  {heuristics[allowDiagonal].map((heuristic) => {
                    return (
                      <a
                        onClick={() => setHeuristic(heuristic)}
                        href="#"
                        className="transition ease-in-out delay-150 hover:scale-105 duration-100 hover:text-gray-900 text-gray-400 text-sm whitespace-nowrap p-1 flex items-start rounded-lg "
                      >
                        {heuristic}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </SelectionButton>
          <StartButton buttonName="Start" setStart={setStart} />
          <SelectionButton buttonName="Pattern" icon={faChevronDown}>
            <div className="absolute">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-2 bg-white px-3 py-3">
                  {patterns.map((pattern) => {
                    return (
                      <a
                        onClick={() => setPattern(pattern)}
                        href="#"
                        className="transition ease-in-out delay-150 hover:scale-105 duration-100 hover:text-gray-900 text-gray-400 text-sm whitespace-nowrap p-1 flex items-start rounded-lg "
                      >
                        {pattern}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </SelectionButton>
          <TrueFalseButton
            buttonName="Diagonal is allowed"
            flag={allowDiagonal}
            setFlag={setAllowDiagonal}
          />
        </nav>
        <div className="flex justify-start">
          <a href="#">setting</a>
        </div>
      </div>
    </div>
  );
};

export default Head;
