import { FC } from 'react';
import { View, StyleProp, ViewStyle  } from 'react-native';

type ArrowUpIconProps = {
    iconContainerStyle?: StyleProp<ViewStyle>;
    color?: string;
}

const ArrowUpIcon: FC<ArrowUpIconProps> = ({iconContainerStyle, color = '#B4B5B6'}) => {
    return (
        <View style={iconContainerStyle}>
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M15.5658 11.6512L12.8908 8.97616L11.2575 7.33449C10.9247 7.00219 10.4736 6.81555 10.0033 6.81555C9.53299 6.81555 9.08192 7.00219 8.74912 7.33449L4.43246 11.6512C3.86579 12.2178 4.27412 13.1845 5.06579 13.1845H14.9325C15.7325 13.1845 16.1325 12.2178 15.5658 11.6512Z' fill={color}/>
            </svg>
        </View>
    )
}

export default ArrowUpIcon;