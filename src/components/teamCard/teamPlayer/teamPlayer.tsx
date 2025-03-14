import { FC, memo, useMemo } from "react";
import { View, StyleSheet, Text, Image } from 'react-native';
import { useResize } from "src/hooks/useResize";
import { MatchStatus, Player } from "src/utils/types";
import Stats from "../stats/stats";

type TeamPlayerProps = {
    teamPlayer: Player;
    matchStatus: MatchStatus;
}

const TeamPlayer: FC<TeamPlayerProps> = ({teamPlayer, matchStatus}) => {
    const { width, isScreenS, isScreenL, isScreenXl } = useResize();

    const ContainerStyle = useMemo(() => {
        return ( !isScreenS ? {...styles.container, ...styles.container800} : 
            (!isScreenXl ? {...styles.container, ...styles.container1800} : styles.container))
    }, [width]);
    const NameStyle = useMemo(() => !isScreenL ? {...styles.value, ...styles.value_1200} : styles.value, [width]);
    const ImgStyle = useMemo(() => !isScreenL ? styles.img_1200 : styles.img, [width]);

    return (
        <View style={ContainerStyle}>
            <View style={styles.row}>
                <Image style={ImgStyle} source={require('../../../assets/images/avatar-icon.png')}/>
                <Text style={NameStyle}>{teamPlayer.username}</Text>
            </View>
            <Stats type="Убийств:" value={matchStatus !== 'Scheduled' ? teamPlayer.kills.toString() : '0'} />
        </View>
    )
}

export default memo(TeamPlayer, (prevProps, nextProps) => {
    return prevProps.teamPlayer === nextProps.teamPlayer;
});

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#101318',
        borderRadius: 4,
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    container1800: {
        flexDirection: 'column'
    },
    container800: {
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingVertical: 7,
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    img: {
        width: 36,
        height: 36
    },
    img_1200: {
        width: 32,
        height: 32
    },
    value: {
        color: 'white',
        fontFamily: 'InterSemiBold',
        fontSize: 16
    },
    value_1200: {
        fontSize: 14
    }
});