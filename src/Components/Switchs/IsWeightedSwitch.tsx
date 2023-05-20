import { setGrid, setIsWeighted } from "@/features/Visualizer/visualizerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Switch, SwitchEvent } from "@nextui-org/react";
import { useEffect } from "react";
import { TbWeight } from "react-icons/tb";

export default function WeightedSwitch() {
  const isWeighted = useAppSelector((state) => state.visualizer.isWeighted);
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.visualizer.status);

  useEffect(() => {
    dispatch(setGrid());
  }, [isWeighted]);

  return (
    <Switch
      icon={<TbWeight />}
      disabled={status !== "idle" && status !== "answered"}
      checked={isWeighted}
      onChange={(e: SwitchEvent) => dispatch(setIsWeighted(e.target.checked))}
    />
  );
}
