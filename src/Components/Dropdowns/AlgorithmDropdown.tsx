import {
  Algorithm,
  algorithms,
  changeAlgorithm,
} from "@/features/Visualizer/visualizerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Dropdown, Navbar } from "@nextui-org/react";

export default function AlgorithmDropdown() {
  const algorithm = useAppSelector((state) => state.visualizer.algorithm);
  const status = useAppSelector((state) => state.visualizer.status);

  const dispatch = useAppDispatch();
  return (
    <Dropdown>
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
          {algorithm}
        </Dropdown.Button>
      </Navbar.Item>
      <Dropdown.Menu
        aria-label="algorithm-dropdown"
        css={{
          $$dropdownMenuWidth: "340px",
          $$dropdownItemHeight: "70px",
          "& .nextui-dropdown-item": {
            py: "$4",
            // dropdown item left icon
            svg: {
              color: "$secondary",
              mr: "$4",
            },
            // dropdown item title
            "& .nextui-dropdown-item-content": {
              w: "100%",
              fontWeight: "$semibold",
            },
          },
        }}
        disabledKeys={[algorithm]}
        onAction={(a) => dispatch(changeAlgorithm(a as Algorithm))}
      >
        {algorithms.map((e) => (
          <Dropdown.Item
            key={e.name}
            showFullDescription
            description={e.description}
          >
            {e.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
