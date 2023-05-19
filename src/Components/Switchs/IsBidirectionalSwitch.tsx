import { setIsBirectional } from "@/features/Visualizer";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Switch, SwitchEvent, Tooltip } from "@nextui-org/react";
import { GiDirectionSign } from "react-icons/gi";
import { GiDirectionSigns } from "react-icons/gi";

export default function IsBidirectionalSwitch() {
  const isBidirectional = useAppSelector(
    (state) => state.visualizer.isBidirectional
  );
  const dispatch = useAppDispatch();
  const status = useAppSelector(state=>state.visualizer.status);
  return (
    <Tooltip
      trigger="hover"
      content="Bidirctional search"
      placement="bottom"
      color={undefined}
      contentColor={undefined}
      css={undefined}
    >
      <Switch
        iconOn={<GiDirectionSigns />}
        iconOff={<GiDirectionSign />}
        checked={isBidirectional}
        disabled={status!=="idle"}
        onChange={(e: SwitchEvent) =>
          dispatch(setIsBirectional(e.target.checked))
        }
      />
    </Tooltip>
  );
}
