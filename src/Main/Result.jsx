const Result = (props) => {
  return (
    <div className="flex md:justify-around items-center">
      <div className="font-medium text-gray-700">
        Algorithm: {props.algorithm}
      </div>
      <div className="font-medium text-gray-700">
        Heuristic: {props.heuristic}
      </div>
      <div className="font-noraml text-gray-700">
        Number of Steps: {props.steps}
      </div>
      <div className="font-noraml text-gray-700">
        Length of Path: {props.pathLength}
      </div>
    </div>
  );
};

export default Result;