const Result = (props) => {
  return (
    <div className="flex md:justify-around items-center dark:bg-gray-900">
      <div className="font-medium text-gray-700 dark:text-gray-400">
        Algorithm: {props.algorithm}
      </div>
      <div className="font-medium text-gray-700 dark:text-gray-400">
        Heuristic: {props.heuristic}
      </div>
      <div className="font-noraml text-gray-700 dark:text-gray-400">
        Number of Steps: {props.steps}
      </div>
      <div className="font-noraml text-gray-700 dark:text-gray-400">
        Length of Path: {props.pathLength}
      </div>
    </div>
  );
};

export default Result;