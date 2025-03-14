import { FC, memo, useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, Text, Animated } from 'react-native';
import { useResize } from "src/hooks/useResize";
import { animateScore } from "src/utils/utils";

type StatsProps = {
    type: string,
    value: string,
    flexNum?: number,
    sign?: string
}

const Stats: FC<StatsProps> = ({type, value, flexNum, sign}) => {
    const { width, isScreenL } = useResize();
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const flex = {flex: flexNum};

    useEffect(() => animateScore(fadeAnim), [value]);



    const textStyle = useMemo(() => !isScreenL ?  {...styles.text, ...styles.text_1200} : styles.text, [width]);
    const valueStyle = useMemo(() => !isScreenL ? {...styles.value, ...styles.value_1200} : styles.value, [width]);

    return (
        <View style={{...styles.row, ...flex}}>
            <Text style={textStyle}>{type}</Text>
            <Animated.Text style={[valueStyle, { opacity: fadeAnim }]}>
                {Number(value) > 0 ? sign : ''}{value}
            </Animated.Text>
        </View>
    )
}

export default Stats;

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center'
    },
    value: {
        color: 'white',
        fontFamily: 'InterSemiBold',
        fontSize: 16
    },
    value_1200: {
        fontSize: 14
    },
    text: {
        color: '#FAFAFA',
        fontFamily: 'InterMed',
        fontSize: 14,
        opacity: 0.4
    },
    text_1200: {
        fontSize: 12
    }
});