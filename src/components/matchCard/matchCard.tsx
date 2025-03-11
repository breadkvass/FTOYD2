import { FC, useEffect, useState, memo } from 'react';
import { View, StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import { Match } from '../../utils/types';
import Command from './command/command';

type MatchCardProps = {
    match: Match;
}

const MatchCard: FC<MatchCardProps> = ({match}) => {
    const [ status, setStatus ] = useState('');
    const [ statusStyle, setStatusStyle ] = useState<StyleProp<TextStyle>>();
    const matchStatus = match.status;

    useEffect(() => {
        switch (matchStatus) {
            case 'Finished':
                setStatusStyle({...styles.status, ...styles.finished});
                setStatus('Finished')
                break;
            case 'Ongoing':
                setStatusStyle({...styles.status, ...styles.ongoing});
                setStatus('Live')
                break;
            case 'Scheduled':
                setStatusStyle({...styles.status, ...styles.scheduled});
                setStatus('Match preparing')
                break;
        }
    }, [match.status])

    return (
        <View style={styles.card}>
            <Command commandName={match.awayTeam.name} isReverse={false}/>
            <View style={styles.result}>
                <Text style={styles.score}>{match.awayScore + ' : ' + match.homeScore}</Text>
                <Text style={statusStyle}>{status}</Text>
            </View>
            <Command commandName={match.homeTeam.name} isReverse/>
        </View>
    )
}

export default memo(MatchCard, (prevProps, nextProps) => {
    return prevProps.match === nextProps.match;
});

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 36,
        paddingVertical: 16,
        backgroundColor: '#0B0E12',
        borderRadius: 4,
        height: 87
    },
    result: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    score: {
        fontSize: 20,
        fontWeight: 600,
        color: 'white',
        fontFamily: 'InterSemiBold'
    },
    status: {
        fontSize: 12,
        fontWeight: 600,
        borderRadius: 4,
        color: 'white',
        fontFamily: 'InterSemiBold'
    },
    scheduled: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: '#EB6402',
    },
    finished: {
        paddingHorizontal: 21,
        paddingVertical: 6,
        backgroundColor: '#EB0237',
    },
    ongoing: {
        paddingHorizontal: 34,
        paddingVertical: 6,
        backgroundColor: '#43AD28',
    }
  });

