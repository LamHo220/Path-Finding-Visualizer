import { setAllowDiagonal } from "@/features/Visualizer";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Switch, SwitchEvent } from "@nextui-org/react";
import { TbArrowsDiagonal } from "react-icons/tb";

export default function AllowDiagonalSwitch() {
  const allowDiagonal = useAppSelector(
    (state) => state.visualizer.allowDiagonal
  );
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.visualizer.status);
  return (
    <Switch
      icon={<TbArrowsDiagonal />}
      checked={allowDiagonal}
      disabled={status !== "idle" && status !== "answered"}
      onChange={(e: SwitchEvent) =>
        dispatch(setAllowDiagonal(e.target.checked))
      }
    />
  );
}
