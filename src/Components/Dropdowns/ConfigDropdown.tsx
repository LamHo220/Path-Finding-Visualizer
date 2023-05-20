import { Col, Dropdown, Navbar, Row, Text } from "@nextui-org/react";
import WeightedSwitch from "../Switchs/IsWeightedSwitch";
import IsBidirectionalSwitch from "../Switchs/IsBidirectionalSwitch";
import AllowDiagonalSwitch from "../Switchs/AllowDiagonalSwitch";
import { useAppSelector } from "@/hooks";
import AnimationSpeedButtonGroup from "../Buttons/AnimationSpeedButtonGrop";

export default function ConfigDropdown() {
  const status = useAppSelector((state) => state.visualizer.status);
  const items = [
    {
      key: "Weighted Grid",
      item: <WeightedSwitch />,
    },
    {
      key: "Bidirecional Search",
      item: <IsBidirectionalSwitch />,
    },
    {
      key: "Diagonal Move",
      item: <AllowDiagonalSwitch />,
    },
    {
      key: "Animation Speed",
      item: <AnimationSpeedButtonGroup />,
    },
  ];
  return (
    <Dropdown closeOnSelect={false}>
      <Navbar.Item>
        <Dropdown.Button
          disabled={status !== "idle" && status !== "answered"}
          auto
          light
          css={{
            px: 0,
            dflex: "center",
            svg: { pe: "none" },
          }}
          ripple={false}
        >
          Configs
        </Dropdown.Button>
      </Navbar.Item>
      <Dropdown.Menu
        aria-label="config-dropdown"
        css={{
          $$dropdownMenuWidth: "340px",
          $$dropdownItemHeight: "70px",
        }}
      >
        {items.map((e, i) => (
          <Dropdown.Item
            css={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            color="default"
            key={`dropdown-${i}`}
          >
            <Row
              justify="space-between"
              wrap={e.key === "Animation Speed" ? "wrap" : "nowrap"}
            >
              <Col>
                <Text weight="semibold">{e.key}:</Text>
              </Col>
              <Col
                css={{ width: e.key === "Animation Speed" ? "100%" : "auto" }}
              >
                <Row justify="flex-end">{e.item}</Row>
              </Col>
            </Row>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
