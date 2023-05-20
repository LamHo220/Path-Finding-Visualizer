import { FC } from "react";
import { Navbar, Text } from "@nextui-org/react";
import AlgorithmDropdown from "./Dropdowns/AlgorithmDropdown";
import PatternDropdown from "./Dropdowns/PatternDropdown";
import HeuristicDropdown from "./Dropdowns/HeuristicDropdown";
import StatusButton from "./Buttons/StatusButton";
import ConfigDropdown from "./Dropdowns/ConfigDropdown";

const Header: FC = () => {
  return (
    <Navbar isBordered variant="floating">
      <Navbar.Brand>
        <Text h3>Path Finding Visualizer</Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <AlgorithmDropdown />
        <HeuristicDropdown />
        <PatternDropdown />
        <ConfigDropdown />
      </Navbar.Content>
      <Navbar.Content>
        <StatusButton />
      </Navbar.Content>
    </Navbar>
  );
};

export default Header;
