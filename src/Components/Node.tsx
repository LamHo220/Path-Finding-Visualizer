import { FC, useEffect } from "react";
import { Text, Card, Tooltip } from "@nextui-org/react";
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

const ToolTipContent: FC<{ node: TNode; weight: number }> = ({
  node,
  weight,
}) => (
  <div>
    <Text css={{ lineHeight: "1" }}>
      <b>f:</b> {node.f === Infinity ? `∞` : node.f}
    </Text>

    <Text css={{ lineHeight: "1" }}>
      <b>g:</b> {node.g === Infinity ? `∞` : node.g}
    </Text>

    <Text css={{ lineHeight: "1" }}>
      <b>w:</b> {weight}
    </Text>
  </div>
);
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
    inQueue,
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
    if (_visited && (status === "removing walls"|| status === "removing walls II")) {
      console.log(23);
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
    ? "$blue500"
    : isEnd
    ? "$pink400"
    : inQueue
    ? "$purple800"
    : isWall
    ? "$gray800"
    : isPath
    ? "$green400"
    : visited
    ? "$yellow600"
    : _visited &&
      (status === "searching" ||
        status === "answering" ||
        status === "answered")
    ? "$yellow400"
    : "";
  const border = isStart
    ? "1px $blue500 solid"
    : isEnd
    ? "1px $pink400 solid"
    : inQueue
    ? "$purple800"
    : isWall
    ? "1px $gray800 solid"
    : isPath
    ? "1px $green400 solid"
    : visited
    ? "1px $yellow600 solid"
    : _visited &&
      (status === "searching" ||
        status === "answering" ||
        status === "answered")
    ? "1px $yellow400 solid"
    : "1px solid black";

  const _handleMouseDown = (event: React.MouseEvent<unknown, MouseEvent>) => {
    event = event || window.event;
    event.preventDefault();
    if (status === "idle" || status === "answered") {
      dispatch(handleMouseDown(node));
    }
  };

  const _handleMouseEnter = (event: React.MouseEvent<unknown, MouseEvent>) => {
    event = event || window.event;
    event.preventDefault();
    if (status === "idle" || status === "answered") {
      dispatch(handleMouseEnter(node));
    }
  };

  const _handleMouseUp = (event: React.MouseEvent<unknown, MouseEvent>) => {
    event = event || window.event;
    event.preventDefault();
    if (status === "idle" || status === "answered") {
      dispatch(handleMouseUp());
    }
  };

  return (
    <Tooltip
      content={<ToolTipContent node={node} weight={weight} />}
      color={undefined}
      css={undefined}
      contentColor={undefined}
    >
      <Card
        css={{
          "&:hover": {
            border: "3px $code solid",
          },
          cursor: "pointer",
          border: border,
          borderRadius: "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
          transition: "background-color 0.5s",
        }}
        onMouseDown={_handleMouseDown}
        onMouseOverCapture={_handleMouseEnter}
        onMouseUp={_handleMouseUp}
      >
        <div>
          {!isWall ? (
            <Text
              css={{
                lineHeight: "1",
                userSelect: "none",
                "-webkit-user-select": "none",
                "-ms-user-select": "none",
              }}
            >
              <b>f:</b>{" "}
              {node.f === Infinity ? `∞` : Math.round(node.f * 10) / 10}
            </Text>
          ) : undefined}
          {!isWall ? (
            <Text
              css={{
                lineHeight: "1",
                userSelect: "none",
                "-webkit-user-select": "none",
                "-ms-user-select": "none",
              }}
            >
              <b>g:</b>{" "}
              {node.g === Infinity ? `∞` : Math.round(node.g * 10) / 10}
            </Text>
          ) : undefined}
          {!isWall ? (
            <Text
              css={{
                lineHeight: "1",
                userSelect: "none",
                "-webkit-user-select": "none",
                "-ms-user-select": "none",
              }}
            >
              <b>w:</b> {weight}
            </Text>
          ) : undefined}
        </div>
      </Card>
    </Tooltip>
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
