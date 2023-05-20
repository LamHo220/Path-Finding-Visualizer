import { Col, Row } from "@nextui-org/react";
import Node from "./Node";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect } from "react";
import { generateBoundary, generateWall } from "@/features/Visualizer/visualizerSlice";

export default function Grid() {
  const grid: number[][] = Array(20).fill(Array(50).fill(0));
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
