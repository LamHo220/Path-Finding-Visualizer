import { startVisualizeSearchingAlgo } from "@/features/Visualizer/visualizerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button } from "@nextui-org/react";

export default function StatusButton() {
  const status = useAppSelector((state) => state.visualizer.status);
  const dispatch = useAppDispatch();

  const handleOnPress = () => {
    dispatch(startVisualizeSearchingAlgo());
  };

  return <Button onPress={handleOnPress}>{status}</Button>;
}
