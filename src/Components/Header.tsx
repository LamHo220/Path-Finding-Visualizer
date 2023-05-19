import { FC } from "react";
import { Button, Navbar, Text } from "@nextui-org/react";
import AlgorithmDropdown from "./Dropdowns/AlgorithmDropdown";
import PatternDropdown from "./Dropdowns/PatternDropdown";
import HeuristicDropdown from "./Dropdowns/HeuristicDropdown";
import WeightedSwitch from "./Switchs/IsWeightedSwitch";
import AllowDiagonalSwitch from "./Switchs/AllowDiagonalSwitch";
import IsBidirectionalSwitch from "./Switchs/IsBidirectionalSwitch";
import { useAppDispatch } from "@/hooks";
import { startVisualizeSearchingAlgo } from "@/features/Visualizer";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Navbar isBordered variant="floating">
      <Navbar.Brand>
        <Text h3>Path Finding Visualizer</Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <AlgorithmDropdown />
        <HeuristicDropdown />
        <PatternDropdown />
        <WeightedSwitch />
        <IsBidirectionalSwitch />
        <AllowDiagonalSwitch />
      </Navbar.Content>
      <Navbar.Content>
        <Button onPress={() => dispatch(startVisualizeSearchingAlgo())}>
          Start
        </Button>
      </Navbar.Content>
    </Navbar>
  );
};

export default Header;
