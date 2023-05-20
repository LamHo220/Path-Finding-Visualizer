import { setAnimationSpeed } from "@/features/Visualizer/visualizerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button } from "@nextui-org/react";

export default function AnimationSpeedButtonGroup() {
  const animationSpeed = useAppSelector(
    (state) => state.visualizer.animationSpeed
  );
  const dispatch = useAppDispatch();

  const handleOnPress = (value: 10 | 100 | 500) => {
    dispatch(setAnimationSpeed(value));
  };

  return (
    <Button.Group size="sm">
      <Button
        disabled={animationSpeed === 10}
        onPress={() => handleOnPress(10)}
      >
        Fast
      </Button>
      <Button
        disabled={animationSpeed === 100}
        onPress={() => handleOnPress(100)}
      >
        Normal
      </Button>
      <Button
        disabled={animationSpeed === 500}
        onPress={() => handleOnPress(500)}
      >
        Slow
      </Button>
    </Button.Group>
  );
}
