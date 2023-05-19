import { setGrid, setIsWeighted, } from "@/features/Visualizer";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Switch, SwitchEvent, Tooltip } from "@nextui-org/react";
import { useEffect } from "react";
import { TbWeight } from "react-icons/tb";

export default function WeightedSwitch() {
  const isWeighted = useAppSelector((state) => state.visualizer.isWeighted);
  const dispatch = useAppDispatch();
  const status = useAppSelector(state=>state.visualizer.status);
  
  useEffect(()=>{
    dispatch(setGrid())
  }, [isWeighted])
  
  return (
    <Tooltip
      trigger="hover"
      content="Add weight to all nodes"
      placement="bottom"
      color={undefined}
      contentColor={undefined}
      css={undefined}
    >
      <Switch
        icon={<TbWeight />}
        disabled={status!=="idle"}
        checked={isWeighted}
        onChange={(e: SwitchEvent) => dispatch(setIsWeighted(e.target.checked))}
      />
    </Tooltip>
  );
}
