import { FC, memo, useMemo } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { useResize } from "src/hooks/useResize";

type StatsProps = {
    type: string,
    value: string,
    flexNum?: number,
    sign?: string
}

const Stats: FC<StatsProps> = ({type, value, flexNum, sign}) => {
    const { width, isScreenL } = useResize();
    const flex = {flex: flexNum};

    const textStyle = useMemo(() => !isScreenL ?  {...styles.text, ...styles.text_1200} : styles.text, [width]);
    const valueStyle = useMemo(() => !isScreenL ? {...styles.value, ...styles.value_1200} : styles.value, [width]);

    return (
        <View style={{...styles.row, ...flex}}>
            <Text style={textStyle}>{type}</Text>
            <Text style={valueStyle}>{Number(value) > 0 ? sign : ''}{value}</Text>
        </View>
    )
}

export default memo(Stats, (prevProps, nextProps) => {
    return prevProps.type === nextProps.type || prevProps.value === nextProps.value;
});

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