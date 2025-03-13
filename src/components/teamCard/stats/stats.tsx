import { FC, memo } from "react";
import { View, StyleSheet, Text } from 'react-native';

type StatsProps = {
    type: string,
    value: number,
    flexNum?: number,
    sign?: string
}

const Stats: FC<StatsProps> = ({type, value, flexNum, sign}) => {
    const flex = {flex: flexNum}
    return (
        <View style={{...styles.row, ...flex}}>
            <Text style={styles.text}>{type}</Text>
            <Text style={styles.value}>{sign}{value}</Text>
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
    text: {
        color: '#FAFAFA',
        fontFamily: 'InterMed',
        fontSize: 14,
        opacity: 0.4
    }
});