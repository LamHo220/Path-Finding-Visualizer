import { Col, Row } from "@nextui-org/react";
import Node from "./Node";

export default function Grid() {
  const grid: number[][] = Array(20).fill(Array(50).fill(0));

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
