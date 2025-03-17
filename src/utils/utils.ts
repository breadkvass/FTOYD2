import { Animated, Easing } from 'react-native';

export const setCircleAnimation = (isLoading: boolean, value: Animated.Value) => {
  let animation: Animated.CompositeAnimation | null = null;

  if (isLoading) {
    animation = Animated.loop(
    Animated.timing(value, {
      toValue: -1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    })
    );
    animation.start();
  } else {
    value.setValue(0);
  }

  return () => {
    if (animation) {
    animation.stop();
    }
  };
}

export const animateScore = (
  fadeAnim: Animated.Value,
  setDisplayedValue: (value: number) => void,
  newValue: number
) => {
  Animated
    .timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    })
    .start(() => {
      setDisplayedValue(newValue);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      })
      .start();
    });
};
  