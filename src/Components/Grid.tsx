import { Col, Row } from "@nextui-org/react";
import Node from "./Node";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect } from "react";
import {
  generateBoundary,
  generateWall,
} from "@/features/Visualizer/visualizerSlice";
import { GRID_MAX_COL, GRID_MAX_ROW } from "@/Constants";

export default function Grid() {
  const grid: number[][] = Array(GRID_MAX_ROW).fill(
    Array(GRID_MAX_COL).fill(0)
  );
  const status = useAppSelector((state) => state.visualizer.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "generating walls") {
      setTimeout(() => {
        dispatch(generateWall());
      }, 1);
    }
    if (status === "generating boundary") {
      setTimeout(() => {
        dispatch(generateBoundary());
      }, 1);
    }
  }, [status]);

  return (
    <Row justify="center">
      <Col>
        {grid.map((row, i) => (
          <Row justify="center" key={`row-${i}`}>
            {row.map((_, j) => (
              <Node pos={{ row: i, col: j }} key={`node-${i}-${j}`} />
            ))}
          </Row>
        ))}
      </Col>
    </Row>
  );
}
