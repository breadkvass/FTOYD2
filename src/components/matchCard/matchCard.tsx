import { FC, useEffect, useMemo, useRef, memo } from "react";
import { View, StyleSheet, Text, Animated, Easing } from "react-native";
import { Match } from "../../utils/types";
import Command from "./command/command";

type MatchCardProps = {
  match: Match;
};

const MatchCard: FC<MatchCardProps> = ({ match }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const statusStyle = useMemo(() => {
    switch (match.status) {
      case "Finished":
        return styles.finished;
      case "Ongoing":
        return styles.ongoing;
      case "Scheduled":
        return styles.scheduled;
    }
  }, [match.status]);

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

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [match.status]);

  return (
    <View style={styles.card}>
      <Command commandName={match.awayTeam.name} isReverse={false} />
      <View style={styles.result}>
        <View style={styles.scoreContainer}>
            <Animated.Text style={[styles.score, { opacity: fadeAnim }]}>
                {`${match.awayScore} : ${match.homeScore}`}
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
  );
};

export default memo(MatchCard, (prevProps, nextProps) => prevProps.match === nextProps.match);

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
    paddingVertical: 16,
    backgroundColor: "#0B0E12",
    borderRadius: 4,
    height: 87,
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
  status: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
    fontFamily: "InterSemiBold",
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
});
