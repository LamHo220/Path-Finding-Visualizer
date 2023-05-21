import { setIsBirectional } from "@/features/Visualizer/visualizerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Switch, SwitchEvent } from "@nextui-org/react";
import { GiDirectionSign } from "react-icons/gi";
import { GiDirectionSigns } from "react-icons/gi";

export default function IsBidirectionalSwitch() {
  const isBidirectional = useAppSelector(
    (state) => state.visualizer.isBidirectional
  );
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.visualizer.status);
  return (
    <Switch
      iconOn={<GiDirectionSigns />}
      iconOff={<GiDirectionSign />}
      checked={isBidirectional}
      disabled={status !== "idle" && status !== "answered"}
      onChange={(e: SwitchEvent) =>
        dispatch(setIsBirectional(e.target.checked))
      }
    />
  );
}
