import { View, Text, StyleSheet } from 'react-native';
import { FilterItem } from 'src/utils/types';

export const renderPickerItem = (
    item: FilterItem,
    isPickerItemHovered: string,
    isPickerItemPressed: string,
    setIsPickerItemHovered: (isPickerItemHovered: string) => void,
    setIsPickerItemPressed: (isPickerItemHPressed: string) => void,
) => {

    const pickerItemStyle = (item: FilterItem) => {
        return (
            isPickerItemHovered === item.value) ? (
                {...styles.dropdownItemStyle, ...styles.dropdownItemHover}
            ) : (
                (isPickerItemPressed === item.value) ? (
                    {...styles.dropdownItemStyle, ...styles.dropdownItemPressed}
                ) : (
                    styles.dropdownItemStyle
                )
            )
    }

    return (
        <View
            style={pickerItemStyle(item)}
            onPointerEnter={() => setIsPickerItemHovered(item.value)}
            onPointerLeave={() => setIsPickerItemHovered('')}
            onPointerDown={() => setIsPickerItemPressed(item.value)}
            onPointerUp={() => setIsPickerItemPressed('')}
        >
            <Text style={
                (isPickerItemHovered === item.value || isPickerItemPressed === item.value) ? (
                    {...styles.dropdownItemTxtStyle, ...styles.dropdownButtonTextHover}
                ) : (
                    styles.dropdownItemTxtStyle
                )
            }>
                {item.label}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdownButtonTextHover: {
        color: 'white'
    },
    dropdownItemStyle: {
        backgroundColor: '#0F1318',
        padding: 12,
    },
    dropdownItemHover: {
        backgroundColor: '#11161D',
    },
    dropdownItemPressed: {
        backgroundColor: '#0D1115'
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'InterMed',
        color: '#B4B5B6',
    }
});
