import { FC, useEffect, useMemo, useRef, useState } from 'react'; 
import { View, StyleSheet, Text, Animated } from 'react-native';
import { useResize } from 'src/hooks/useResize';
import { animateScore } from 'src/utils/utils';

type StatsProps = {
    type: string;
    value: string;
    flexNum?: number;
    sign?: string;
};

const Stats: FC<StatsProps> = ({ type, value, flexNum, sign }) => {
    const { width, isScreenXS, isScreenL } = useResize();
    const [displayedValue, setDisplayedValue] = useState(Number(value));
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        animateScore(fadeAnim, setDisplayedValue, Number(value));
    }, [value]);

    const flex = { flex: flexNum };
    const textStyle = useMemo(() => !isScreenL ? [ styles.text, styles.text1200 ] : styles.text, [width]);
    const valueStyle = useMemo(() => !isScreenL ? [ styles.value, styles.value1200 ] : styles.value, [width]);
    const rowStyle = useMemo(() => !isScreenXS ? [ styles.row, styles.row450 ] : styles.row, [width]);

    return (
        <View style={[ rowStyle,  flex ]}>
            <Text style={textStyle}>{type}</Text>
            <Animated.Text style={[valueStyle, { opacity: fadeAnim }]}>
                {Number(displayedValue) > 0 ? sign : ''}{displayedValue}
            </Animated.Text>
        </View>
    );
};

export default Stats;

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center'
    },
    row450: {
        flexDirection: 'column',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    value: {
        color: 'white',
        fontFamily: 'InterSemiBold',
        fontSize: 16,
        textAlign: 'center'
    },
    value1200: {
        fontSize: 14
    },
    text: {
        color: '#FAFAFA',
        fontFamily: 'InterMed',
        fontSize: 14,
        opacity: 0.4,
        textAlign: 'center'
    },
    text1200: {
        fontSize: 12
    }
});