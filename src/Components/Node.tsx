import { FC, useEffect } from "react";
import { Text, Card } from "@nextui-org/react";
import {
  Pos,
  TNode,
  VisualizerState,
  getNode,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  nextOfSolution,
  nextStateOfSearchingAlgo,
  setPath,
  setVisited,
} from "@/features/Visualizer";
import { connect } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/hooks";

const _Node: FC<{ node: TNode }> = ({ node }) => {
  const dispatch = useAppDispatch();
  const { isStart, isEnd, isWall, isPath, visited, weight, _visited } = node;
  const status = useAppSelector((state) => state.visualizer.status);

  useEffect(() => {
    if (status === "visiting" && node.isStart) {
      dispatch(setVisited(node.pos));
      
      setTimeout(() => {
        dispatch(nextStateOfSearchingAlgo());
      }, 100);
    }
    if (status === "answering" && node.isStart){
      dispatch(setPath(node.pos))
      
      setTimeout(() => {
        dispatch(nextOfSolution());
      }, 100);
    }
  }, [status]);

  useEffect(() => {
    if (visited) {
      setTimeout(() => {
        dispatch(nextStateOfSearchingAlgo());
      }, 100);
    }
  }, [visited]);

  useEffect(() => {
    if (isPath) {
      setTimeout(() => {
        dispatch(nextOfSolution());
      }, 100);
    }
  }, [isPath]);

  const bg = isStart
    ? "$blue400"
    : isEnd
    ? "$pink400"
    : isPath
    ? "$green400"
    : visited
    ? "$yellow400"
    : _visited
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
          height: "calc(650px/50)",
          width: "calc(650px/50)",
        },
        "@sm": {
          height: "calc(960px/50)",
          width: "calc(960px/50)",
        },
        "@md": {
          height: "calc(1280px/50)",
          width: "calc(1280px/50)",
        },
        "@lg": {
          height: "calc(1440px/50)",
          width: "calc(1440px/50)",
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