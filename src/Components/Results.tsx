import { useAppSelector } from "@/hooks";
import { Col, Row, Text } from "@nextui-org/react";

export const Steps = () => {
  const steps = useAppSelector((state) => state.visualizer.exploredLength);
  return (
    <Col>
      <Row justify="center">
        <Text weight="bold" css={{ paddingRight: "0.25rem" }}>
          Number of Steps:
        </Text>
        <Text>{steps}</Text>
      </Row>
    </Col>
  );
};
export const Path = () => {
  const pathL = useAppSelector((state) => state.visualizer.pathLength);
  return (
    <Col>
      <Row justify="center">
        <Text weight="bold" css={{ paddingRight: "0.25rem" }}>
          Length of Path:
        </Text>
        <Text>{pathL}</Text>
      </Row>
    </Col>
  );
};
