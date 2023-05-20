import { Heuristic, changeHeuristic, heuristics } from "@/features/Visualizer/visualizerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Dropdown, Navbar } from "@nextui-org/react";

export default function HeuristicDropdown() {
  const heuristic = useAppSelector((state) => state.visualizer.heuristic);
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
          {heuristic}
        </Dropdown.Button>
      </Navbar.Item>
      <Dropdown.Menu
        aria-label="heuristic-dropdown"
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
        disabledKeys={[heuristic]}
        onAction={(a) => dispatch(changeHeuristic(a as Heuristic))}
      >
        {heuristics.map((e) => (
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
