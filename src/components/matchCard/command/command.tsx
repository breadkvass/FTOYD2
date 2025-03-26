import { FC, memo, useMemo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useResize } from 'src/hooks/useResize';

type CommandProps = {
    commandName: string;
    isReverse: boolean;
}

const Command: FC<CommandProps> = ({commandName, isReverse}) => {
    const { width, isScreenXS, isScreenM } = useResize();

    const imgStyle = useMemo(() => !isScreenM ? styles.img1000 : styles.img, [width]);
    const nameStyle = useMemo(() => !isScreenM ? [ styles.name,  styles.name1000 ] : styles.name, [width]);
    const commandStyle = useMemo(() => { 
        return !isScreenXS ? [ styles.command,  styles.command450 ] :
        (!isScreenM ? [ styles.command,  styles.command1000 ] : styles.command)
    }, [width]);

    const style = isReverse ? [ commandStyle,  (!isScreenXS ? styles.reverse450 : styles.reverse) ] : commandStyle;

    return (
        <View style={style}>
            <Image style={imgStyle} source={require('../../../assets/images/command-icon.png')}/>
            <Text style={nameStyle}>{commandName}</Text>
        </View>
    )
}

export default memo(Command, (prevProps, nextProps) => {
    return prevProps.commandName === nextProps.commandName && prevProps.isReverse === nextProps.isReverse;
});

const styles = StyleSheet.create({
    img: {
        width: 48,
        height: 48
    },
    img1000: {
        width: 28,
        height: 28
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
    command450: {
        flexDirection: 'column'
    },
    command1000: {
        gap: 6
    },
    reverse: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        marginRight: 0,
        marginLeft: 'auto'
    },
    reverse450: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 0,
    },
    name: {
        fontSize: 16,
        fontWeight: 600,
        color: 'white',
        fontFamily: 'InterSemiBold'
    },
    name1000: {
        fontSize: 14
    }
  });