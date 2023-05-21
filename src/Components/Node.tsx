import { FC, useEffect } from "react";
import { Text, Card } from "@nextui-org/react";
import {
  Pos,
  TNode,
  VisualizerState,
  generateBoundaryNext,
  generateWall,
  generateWallNext,
  getNode,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  nextOfSolution,
  nextStateOfSearchingAlgo,
  setPath,
  setVisited,
} from "@/features/Visualizer/visualizerSlice";
import { connect } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { GRID_MAX_COL } from "@/Constants";

const _Node: FC<{ node: TNode }> = ({ node }) => {
  const dispatch = useAppDispatch();
  const {
    isStart,
    isEnd,
    isWall,
    isPath,
    visited,
    weight,
    _visited,
    isBoundary,
  } = node;
  const status = useAppSelector((state) => state.visualizer.status);
  const animationSpeed = useAppSelector(
    (state) => state.visualizer.animationSpeed
  );

  useEffect(() => {
    if (status === "searching" && node.isStart) {
      dispatch(setVisited(node.pos));

      setTimeout(() => {
        dispatch(nextStateOfSearchingAlgo());
      }, animationSpeed);
    }
    if (status === "answering" && node.isStart) {
      dispatch(setPath(node.pos));

      setTimeout(() => {
        dispatch(nextOfSolution());
      }, animationSpeed);
    }

    if (node.pos.row === 0 && node.pos.col === 0 && status === "cutted") {
      setTimeout(() => {
        dispatch(generateWall());
      }, 1);
    }
  }, [status, animationSpeed]);

  useEffect(() => {
    if (visited) {
      setTimeout(() => {
        dispatch(nextStateOfSearchingAlgo());
      }, animationSpeed);
    }
  }, [visited, animationSpeed]);

  useEffect(() => {
    if (isPath) {
      setTimeout(() => {
        dispatch(nextOfSolution());
      }, animationSpeed);
    }
  }, [isPath]);

  useEffect(() => {
    if (_visited && status === "generating walls") {
      setTimeout(() => {
        dispatch(generateWallNext(node.pos));
      }, 1);
    }
  }, [status, _visited]);

  useEffect(() => {
    if (isWall && status === "generating boundary") {
      setTimeout(() => {
        dispatch(generateBoundaryNext(node.pos));
      }, 1);
    }
    if (status === "cutting" && !isBoundary) {
      setTimeout(() => {
        dispatch(generateWallNext(node.pos));
      }, 1);
    }
  }, [isWall, status, isBoundary, _visited]);

  const bg = isStart
    ? "$blue400"
    : isEnd
    ? "$pink400"
    : isPath
    ? "$green400"
    : visited
    ? "$yellow400"
    : _visited &&
      (status === "searching" ||
        status === "answering" ||
        status === "answered")
    ? "$yellow200"
    : isWall
    ? "$gray400"
    : "";

  const _handleMouseDown = (event: React.MouseEvent<unknown, MouseEvent>) => {
    event = event || window.event;
    event.preventDefault();
    dispatch(handleMouseDown(node));
  };

  const _handleMouseEnter = (event: React.MouseEvent<unknown, MouseEvent>) => {
    event = event || window.event;
    event.preventDefault();
    dispatch(handleMouseEnter(node));
  };

  const _handleMouseUp = (event: React.MouseEvent<unknown, MouseEvent>) => {
    event = event || window.event;
    event.preventDefault();
    dispatch(handleMouseUp());
  };

  return (
    <Card
      css={{
        "&:hover": {
          background: "$code",
        },
        cursor: "pointer",
        border: "1px solid black",
        borderRadius: "0",
        bg: bg,
        "@xs": {
          height: `calc(650px/${GRID_MAX_COL})`,
          width: `calc(650px/${GRID_MAX_COL})`,
        },
        "@sm": {
          height: `calc(960px/${GRID_MAX_COL})`,
          width: `calc(960px/${GRID_MAX_COL})`,
        },
        "@md": {
          height: `calc(1280px/${GRID_MAX_COL})`,
          width: `calc(1280px/${GRID_MAX_COL})`,
        },
        "@lg": {
          height: `calc(1440px/${GRID_MAX_COL})`,
          width: `calc(1440px/${GRID_MAX_COL})`,
        },
      }}
      onMouseDown={_handleMouseDown}
      onMouseOverCapture={_handleMouseEnter}
      onMouseUp={_handleMouseUp}
    >
      <Text css={{ textAlign: "center" }}>{weight ? weight : ""}</Text>
    </Card>
  );
};

const mapStateToProps = (
  state: { visualizer: VisualizerState },
  ownProps: { pos: Pos }
) => {
  const { pos } = ownProps;
  const node = getNode(state.visualizer, pos);
  return { node };
};

const Node = connect(mapStateToProps)(_Node);

export default Node;
