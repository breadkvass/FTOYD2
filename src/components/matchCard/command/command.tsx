import { FC } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

type CommandProps = {
    commandName: string;
    isReverse: boolean;
}

const Command: FC<CommandProps> = ({commandName, isReverse}) => {
    const style = !isReverse ? styles.command : {...styles.command, ...styles.reverse};

    return (
        <View style={style}>
            <Image style={styles.img} source={require('../../../assets/images/command-icon.png')}/>
            <Text style={styles.name}>{commandName}</Text>
        </View>
    )
}

export default Command;

const styles = StyleSheet.create({
    img: {
        width: 48,
        aspectRatio: '1 / 1'
    },
    command: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 'auto',
        minWidth: 'auto',
        gap: 14,
        height: 55
    },
    reverse: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        marginRight: 0,
        marginLeft: 'auto'
    },
    name: {
        fontSize: 16,
        fontWeight: 600,
        color: 'white',
        fontFamily: 'InterSemiBold'
    }
  });

