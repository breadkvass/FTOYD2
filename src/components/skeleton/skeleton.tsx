import { useEffect, useState } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';

type SkeletonProps = {
  length: number;
};

const Skeleton: React.FC<SkeletonProps> = ({ length }) => {
  const arr = new Array(length).fill('');

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const startAnimation = Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );

    startAnimation.start();

    return () => {
      startAnimation.stop();
    };
  }, [animation]);

  const createAnimatedStyles = () => {
    const animatedBackground = animation.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: [
          '#0B0F13',
          '#0F1318',
          '#13171C',
          '#0A0E12',
          '#0A0E12'
        ],
    });

    return {
      backgroundColor: animatedBackground,
    };
  };

  return (
    <View style={styles.container}>
      {arr.map((_, index) => (
        <Animated.View
          key={index}
          style={[styles.skeleton, createAnimatedStyles()]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  skeleton: {
    backgroundColor: '#0B0F13',
    width: '100%',
    height: 87,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default Skeleton;
