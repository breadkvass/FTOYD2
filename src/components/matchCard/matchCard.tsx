import { FC, useEffect, useMemo, useRef, memo, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from "react-native";
import { Match } from "../../utils/types";
import { useResize } from "src/hooks/useResize";
import Command from "./command/command";
import TeamCard from "../teamCard/teamCard";
import ChevronDownIcon from "../icons/chevronDownIcon";
import ChevronUpIcon from "../icons/chevronUpIcon";

type MatchCardProps = {
  match: Match;
};

const MatchCard: FC<MatchCardProps> = ({ match }) => {
  const [ isFullInfo, setIsFullInfo ] = useState(false);
  const { width, isScreenM, isScreenL } = useResize();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [match.status]);

  const statusTypeStyle = useMemo(() => {
    switch (match.status) {
      case "Finished":
        return styles.finished;
      case "Ongoing":
        return styles.ongoing;
      case "Scheduled":
        return styles.scheduled;
    }
  }, [match.status]);
  
  const scoreStyle = useMemo(() => !isScreenM ? {...styles.score, ...styles.score1000} : styles.score, [width]);
  const statusStyle = useMemo(() => !isScreenM ? {...statusTypeStyle, ...styles.status1000} : statusTypeStyle, [width]);
  const rowStyle = useMemo(() => !isScreenM ? {...styles.row, ...styles.row1000} : styles.row, [width]);
  const cardStyle = useMemo(() => !isScreenM ? {...styles.card, ...styles.card1000} : styles.card, [width]);
  const teamsStyle = useMemo(() => !isScreenM ? {...styles.teams, ...styles.teams1000} : styles.teams, [width]);
  const fullStyle = useMemo(() => !isScreenM ? {...styles.full, ...styles.full1000} : styles.full, [width]);

  const Chevron = () => {
    return (
      <TouchableOpacity onPress={() => setIsFullInfo(!isFullInfo)}>
        {!isFullInfo ? <ChevronDownIcon /> :  <ChevronUpIcon />}
      </TouchableOpacity>
    )
  }

  const Divider = () => {
    return (
      <View style={styles.divider}>
        <Text style={styles.vs}>vs</Text>
      </View>
    )
  }

  const statusText = useMemo(() => {
    switch (match.status) {
      case "Finished":
        return "Finished";
      case "Ongoing":
        return "Live";
      case "Scheduled":
        return "Match preparing";
      default:
        return "";
    }
  }, [match.status]);

  return (
    <View style={fullStyle}>
      <View style={rowStyle}>
        <View style={cardStyle}>
          <Command commandName={match.awayTeam.name} isReverse={false} />
          <View style={styles.result}>
              <View style={styles.scoreContainer}>
                  <Animated.Text style={[scoreStyle, { opacity: fadeAnim }]}>
                      {match.status !== 'Scheduled' ? `${match.awayScore} : ${match.homeScore}` : '0 : 0'}
                  </Animated.Text>
              </View>
              <View style={statusStyle}>
                  <Animated.Text style={[styles.status, { opacity: fadeAnim }]}>
                      {statusText}
                  </Animated.Text>
              </View>
          </View>
          <Command commandName={match.homeTeam.name} isReverse />
        </View>
        {isScreenM && <Chevron />}
      </View>
      {isFullInfo &&
        <View style={teamsStyle}>
          <TeamCard team={match.awayTeam} matchStatus={match.status} />
          {!isScreenM && <Divider />}
          <TeamCard team={match.homeTeam} matchStatus={match.status} />
        </View>
      }
      {!isScreenM && <Chevron />}
    </View>
  );
};

export default memo(MatchCard, (prevProps, nextProps) => {
  return (
    ((prevProps.match.status === 'Finished') || (prevProps.match.status === 'Scheduled')) &&
    ((prevProps.match.awayScore === nextProps.match.awayScore) ||
    (prevProps.match.homeScore === nextProps.match.homeScore) ||
    (prevProps.match.status === nextProps.match.status))
  )
});

const styles = StyleSheet.create({
  full: {
    backgroundColor: "#0B0E12",
    flex: 1,
  },
  full1000: {
    padding: 8,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    height: 87,
    flex: 1,
  },
  card1000: {
    height: 44,
    width: '100%',
  },
  result: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  score: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    fontFamily: "InterSemiBold",
  },
  score1000: {
    fontSize: 14
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
    fontFamily: "InterSemiBold",
    marginHorizontal: 'auto',
    textAlign: 'center'
  },
  scheduled: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "#EB6402",
  },
  finished: {
    borderRadius: 4,
    paddingHorizontal: 21,
    paddingVertical: 6,
    backgroundColor: "#EB0237",
  },
  ongoing: {
    borderRadius: 4,
    paddingHorizontal: 34,
    paddingVertical: 6,
    backgroundColor: "#43AD28",
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
    position: 'absolute',
    left: '48%',
    top: -10,
    backgroundColor: '#0B0E12',
    paddingHorizontal: 10
  }
});
