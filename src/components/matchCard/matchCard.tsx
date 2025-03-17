import { FC, useEffect, useMemo, useRef, memo, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Match } from '../../utils/types';
import { animateScore } from 'src/utils/utils';
import { useResize } from 'src/hooks/useResize';
import Command from './command/command';
import TeamCard from '../teamCard/teamCard';
import ChevronDownIcon from '../icons/chevronDownIcon';
import ChevronUpIcon from '../icons/chevronUpIcon';

type MatchCardProps = {
  match: Match;
};

const MatchCard: FC<MatchCardProps> = ({ match }) => {
  const [isFullInfo, setIsFullInfo] = useState(false);
  const { width, isScreenM } = useResize();
  
  const fadeAwayAnim = useRef(new Animated.Value(1)).current;
  const fadeHomeAnim = useRef(new Animated.Value(1)).current;
  
  const [displayedAwayScore, setDisplayedAwayScore] = useState(match.awayScore);
  const [displayedHomeScore, setDisplayedHomeScore] = useState(match.homeScore);

  useEffect(() => {
    animateScore(fadeAwayAnim, setDisplayedAwayScore, match.awayScore);
  }, [match.awayScore]);

  useEffect(() => {
    animateScore(fadeHomeAnim, setDisplayedHomeScore, match.homeScore);
  }, [match.homeScore]);

  const statusTypeStyle = useMemo(() => {
    switch (match.status) {
      case 'Finished':
        return styles.finished;
      case 'Ongoing':
        return styles.ongoing;
      case 'Scheduled':
        return styles.scheduled;
      default:
        return {};
    }
  }, [match.status]);

  const scoreStyle = useMemo(() => !isScreenM ? [ styles.score, styles.score1000 ] : styles.score, [width]);
  const statusStyle = useMemo(() => !isScreenM ? [ statusTypeStyle, styles.status1000 ] : statusTypeStyle, [width]);
  const rowStyle = useMemo(() => !isScreenM ? [ styles.row, styles.row1000 ] : styles.row, [width]);
  const cardStyle = useMemo(() => !isScreenM ? [ styles.card, styles.card1000 ] : styles.card, [width]);
  const teamsStyle = useMemo(() => !isScreenM ? [ styles.teams, styles.teams1000 ] : styles.teams, [width]);
  const fullStyle = useMemo(() => !isScreenM ? [ styles.full, styles.full1000 ] : styles.full, [width]);
  const scoreGap = !isScreenM ? 12 : 18;

  const Chevron = () => (
    <TouchableOpacity onPress={() => setIsFullInfo(!isFullInfo)}>
      {!isFullInfo ? <ChevronDownIcon /> : <ChevronUpIcon />}
    </TouchableOpacity>
  );

  const Divider = () => (
    <View style={styles.divider}>
      <Text style={styles.vs}>VS</Text>
    </View>
  );

  const statusText = useMemo(() => {
    switch (match.status) {
      case 'Finished':
        return 'Finished';
      case 'Ongoing':
        return 'Live';
      case 'Scheduled':
        return 'Match preparing';
      default:
        return '';
    }
  }, [match.status]);

  return (
    <View style={fullStyle}>
      <View style={rowStyle}>
        <View style={cardStyle}>
          <Command commandName={match.awayTeam.name} isReverse={false} />
          <View style={styles.result}>
            <View>
              <Animated.Text style={[scoreStyle, { opacity: fadeAwayAnim, right: scoreGap }]}>
                {match.status !== 'Scheduled' ? displayedAwayScore : '0'}
              </Animated.Text>
              <Text style={[scoreStyle, {position: 'relative'}]}> : </Text>
              <Animated.Text style={[scoreStyle, { opacity: fadeHomeAnim, left: scoreGap }]}>
                {match.status !== 'Scheduled' ? displayedHomeScore : '0'}
              </Animated.Text>
            </View>
            <View style={statusStyle}>
              <Text style={styles.status}>{statusText}</Text>
            </View>
          </View>
          <Command commandName={match.homeTeam.name} isReverse />
        </View>
        {isScreenM && <Chevron />}
      </View>
      {isFullInfo && (
        <View style={teamsStyle}>
          <TeamCard team={match.awayTeam} matchStatus={match.status} />
          {!isScreenM && <Divider />}
          <TeamCard team={match.homeTeam} matchStatus={match.status} />
        </View>
      )}
      {!isScreenM && <Chevron />}
    </View>
  );
};

export default memo(MatchCard, (prevProps) => {
  return (
    prevProps.match.status === 'Finished' ||
    prevProps.match.status === 'Scheduled'
  );
});

const styles = StyleSheet.create({
  full: {
    backgroundColor: '#0B0E12',
    flex: 1,
  },
  full1000: {
    padding: 8,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    justifyContent: 'space-between',
    width: '100%'
  },
  row1000: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: 0
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: 55,
    flex: 1,
  },
  card1000: {
    height: 44,
    width: '100%',
  },
  result: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  score: {
    fontSize: 20,
    fontWeight: 600,
    color: 'white',
    fontFamily: 'InterSemiBold',
    position: 'absolute'
  },
  score1000: {
    fontSize: 14,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'InterSemiBold',
    marginHorizontal: 'auto',
    textAlign: 'center',
  },
  scheduled: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#EB6402',
  },
  finished: {
    borderRadius: 4,
    paddingHorizontal: 21,
    paddingVertical: 6,
    backgroundColor: '#EB0237',
  },
  ongoing: {
    borderRadius: 4,
    paddingHorizontal: 34,
    paddingVertical: 6,
    backgroundColor: '#43AD28',
  },
  status1000: {
    width: 70,
    paddingHorizontal: 0,
    paddingVertical: 4,
  },
  teams: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    gap: 32,
  },
  teams1000: {
    flexDirection: 'column',
    gap: 18.5,
    padding: 5.5,
    width: '100%'
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#13181F',
    position: 'relative'
  },
  vs: {
    color: '#313A47',
    fontFamily: 'InterSemiBold',
    fontSize: 14,
    marginHorizontal: 'auto',
    paddingHorizontal: 10,
    backgroundColor: '#0B0E12',
    marginTop: -8
  }
});
