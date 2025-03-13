import { View, Text, StyleSheet } from "react-native";
import ArrowDownIcon from "../icons/arrowDownIcon";
import ArrowUpIcon from "../icons/arrowUpIcon";

export const renderPickerButton = (
    selectedItem: any,
    isPickerOpen: boolean,
    isPickerHovered: boolean,
    setIsPickerHovered: (isPickerHovered: boolean) => void
) => {

    const pickerButtonStyle = (isPickerOpen: boolean) => {
        return isPickerOpen ? (
            {...styles.picker, ...styles.dropdownButtonOpen}
        ) : (
           isPickerHovered ? (
               {...styles.picker, ...styles.dropdownButtonHover} 
           ) : (
               styles.picker
           )
       )
    }

    const pickerTextStyle = (isPickerOpen: boolean) => {
        return (!isPickerHovered || !isPickerOpen) ? (
            styles.dropdownButtonTxtStyle
        ) : (
            {...styles.dropdownButtonTxtStyle, ...styles.dropdownButtonTextHover}
        )
    }

    return (
        <View
            style={pickerButtonStyle(isPickerOpen)}
            onPointerEnter={() => setIsPickerHovered(true)}
            onPointerLeave={() => setIsPickerHovered(false)}
        >
            <Text style={pickerTextStyle(isPickerOpen)}>
                {(selectedItem && selectedItem.label) || 'Все статусы'}
            </Text>
            {!isPickerOpen ?
                <ArrowDownIcon color={isPickerHovered ? 'white' : '#B4B5B6'} />
                :
                <ArrowUpIcon />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    picker: {
        marginRight: 'auto',
        marginLeft: 24,
        width: 190,
        backgroundColor: '#0B0E12',
        padding: 16,
        borderWidth: 0,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownButtonHover: {
        backgroundColor: '#0F1318'
    },
    dropdownButtonOpen: {
        backgroundColor: '#0B0E12',
        borderColor: '#171D25',
        borderWidth: 1
    },
    dropdownButtonTxtStyle: {
        color: '#B4B5B6',
        fontFamily: 'InterMed',
        fontSize: 16,
    },
    dropdownButtonTextHover: {
        color: 'white'
    }
});
