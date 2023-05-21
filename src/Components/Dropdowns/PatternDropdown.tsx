import {
  Pattern,
  changePattern,
  patterns,
} from "@/features/Visualizer/visualizerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Dropdown, Navbar } from "@nextui-org/react";

export default function PatternDropdown() {
  const pattern = useAppSelector((state) => state.visualizer.pattern);
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
          // iconRight={icons.chevron}
          ripple={false}
        >
          {pattern}
        </Dropdown.Button>
      </Navbar.Item>
      <Dropdown.Menu
        aria-label="pattern-dropdown"
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
        disabledKeys={pattern !== "No Walls" ? [pattern] : []}
        onAction={(a) => dispatch(changePattern(a as Pattern))}
      >
        {patterns.map((e) => (
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
