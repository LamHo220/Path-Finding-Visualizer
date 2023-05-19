import { setAllowDiagonal } from "@/features/Visualizer";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Switch, SwitchEvent, Tooltip } from "@nextui-org/react";
import { TbArrowsDiagonal } from "react-icons/tb";

export default function AllowDiagonalSwitch() {
  const allowDiagonal = useAppSelector(
    (state) => state.visualizer.allowDiagonal
  );
  const dispatch = useAppDispatch();
  const status = useAppSelector(state=>state.visualizer.status);
  return (
    <Tooltip
      trigger="hover"
      content="Allow diagonal moves"
      placement="bottom"
      color={undefined}
      contentColor={undefined}
      css={undefined}
    >
      <Switch
        icon={<TbArrowsDiagonal />}
        checked={allowDiagonal}
        disabled={status!=="idle"}
        onChange={(e: SwitchEvent) =>
          dispatch(setAllowDiagonal(e.target.checked))
        }
      />
    </Tooltip>
  );
}
