import { FC, memo } from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import { Team } from "src/utils/types";
import TeamPlayer from "./teamPlayer/teamPlayer";
import Stats from "./stats/stats";

type TeamCardProps = {
    team: Team;
}

const TeamCard: FC<TeamCardProps> = ({team}) => {

    return (
        <View style={styles.info}>
            <FlatList
                data={team.players}
                numColumns={3}
                horizontal={false}
                columnWrapperStyle={{gap: 8}}
                keyExtractor={(player, ind) => `${team.name}_${player.username}_${ind}`}
                renderItem={(player) => <TeamPlayer teamPlayer={player.item}/>}
            />
            <View style={styles.stats}>
                <Stats type='Points:' value={team.points} flexNum={1} sign={team.points > 0 ? '+' : ''} />
                <Stats type='Место:' value={team.place} flexNum={1} />
                <Stats type='Всего убийств:' value={team.total_kills} flexNum={1} />
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
        gap: 8
    },
    stats: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 14,
        backgroundColor: '#101318',
        borderRadius: 4
    }
});