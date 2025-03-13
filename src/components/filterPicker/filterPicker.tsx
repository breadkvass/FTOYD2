import { StyleSheet } from "react-native";
import { FC, useState } from "react";
import { renderPickerButton } from "./pickerButton";
import { renderPickerItem } from "./pickerItem";
import { FilterItem } from "src/utils/types";
import SelectDropdown from "react-native-select-dropdown";

type FilterPickerProps = {
    setFilterHandler: (selectedItem: any) => any
}

const FilterPicker: FC<FilterPickerProps> = ({setFilterHandler}) => {
    const [ isPickerItemHovered, setIsPickerItemHovered ] = useState('');
    const [ isPickerItemPressed, setIsPickerItemPressed ] = useState('');
    const [ isPickerHovered, setIsPickerHovered ] = useState(false);

    const filters: FilterItem[] = [
        {label: 'Все статусы', value: ''},
        {label: 'Match preparing', value: 'Scheduled'},
        {label: 'Live', value: 'Ongoing'},
        {label: 'Finished', value: 'Finished'},
    ]
   
    return (
        <SelectDropdown
            data={filters}
            onSelect={(selectedItem) => setFilterHandler(selectedItem.value)}
            renderButton={(selectedItem, isPickerOpen) => renderPickerButton(
                selectedItem,
                isPickerOpen,
                isPickerHovered,
                setIsPickerHovered
            )}
            renderItem={(item: FilterItem) => renderPickerItem(
                item,
                isPickerItemHovered,
                isPickerItemPressed,
                setIsPickerItemHovered,
                setIsPickerItemPressed
            )}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    )
}

export default FilterPicker;

const styles = StyleSheet.create({
    dropdownMenuStyle: {
        backgroundColor: '#0F1318',
        borderRadius: 8,
    }
});
