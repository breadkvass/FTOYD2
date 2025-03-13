import { FC, memo } from "react";
import { View, StyleSheet, Text, Image } from 'react-native';
import { Player } from "src/utils/types";
import Stats from "../stats/stats";

type TeamPlayerProps = {
    teamPlayer: Player;
}

const TeamPlayer: FC<TeamPlayerProps> = ({teamPlayer}) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Image style={styles.img} source={require('../../../assets/images/avatar-icon.png')}/>
                <Text style={styles.value}>{teamPlayer.username}</Text>
            </View>
            <Stats type="Убийств:" value={teamPlayer.kills} />
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