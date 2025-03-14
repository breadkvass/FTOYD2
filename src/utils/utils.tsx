import { Animated, Easing } from 'react-native';

export const animate = (isLoading: boolean, value: Animated.Value) => {
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

export const animateScore = (value: Animated.Value) => {
    value.setValue(0);
    Animated.timing(value, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
}