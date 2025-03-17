import { FC, memo, useMemo } from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import { useResize } from "src/hooks/useResize";
import { MatchStatus, Team } from "src/utils/types";
import TeamPlayer from "./teamPlayer/teamPlayer";
import Stats from "./stats/stats";

type TeamCardProps = {
    team: Team;
    matchStatus: MatchStatus;
}

const TeamCard: FC<TeamCardProps> = ({team, matchStatus}) => {
    const { width, isScreenXS, isScreenS, isScreenM } = useResize();

    const infoStyle = useMemo(() => !isScreenM ? styles.info1000 : styles.info, [width]);
    const dividerStyle = useMemo(() => !isScreenS ? styles.divider800 : styles.divider, [width]);
    const statsStyle = useMemo(() => !isScreenXS ? {...styles.stats, ...styles.stats450} : styles.stats, [width] )

    const setValue = (value: number, res: string) => matchStatus !== 'Scheduled' ? value.toString() : res;
    
    const Divider = () => <View style={dividerStyle} />

    return (
        <View style={infoStyle}>
            <FlatList
                data={team.players}
                numColumns={3}
                horizontal={false}
                columnWrapperStyle={{gap: 8}}
                keyExtractor={(player, ind) => `${team.name}_${player.username}_${ind}`}
                renderItem={(player) => <TeamPlayer teamPlayer={player.item} matchStatus={matchStatus} />}
            />
            <View style={statsStyle}>
                <Stats type='Points:' value={setValue(team.points, '0')} flexNum={1} sign={team.points > 0 ? '+' : ''} />
                <Divider />
                <Stats type='Место:' value={setValue(team.place, '?')} flexNum={1} />
                <Divider />
                <Stats type='Всего убийств:' value={setValue(team.total_kills, '0')} flexNum={1} />
            </View>
        </View>
    )
}

export default memo(TeamCard, (prevProps, nextProps) => {
    return prevProps.team === nextProps.team;
});

const styles = StyleSheet.create({
    info: {
        flex: 1,
        flexDirection: 'column',
        gap: 8,
    },
    info1000: {
        width: '100%',
        flexDirection: 'column',
        gap: 8
    },
    stats: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 14,
        backgroundColor: '#101318',
        borderRadius: 4
    },
    stats450: {
        paddingHorizontal: 12,
        alignItems: 'flex-start'
    },
    divider: {
        width: 1,
        height: 16,
        backgroundColor: '#141A21'
    },
    divider800: {
        width: 1,
        height: 13,
        backgroundColor: '#141A21'
    }
});