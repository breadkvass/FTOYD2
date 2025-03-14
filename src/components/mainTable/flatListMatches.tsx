import { FlatListIndicator } from "@fanchenbao/react-native-scroll-indicator"
import { FC, useMemo } from "react";
import { View, FlatList } from "react-native";
import { Match } from "src/utils/types";
import { useResize } from "src/hooks/useResize";
import MatchCard from "../matchCard/matchCard";

type FlatListMatchesProps = {
    data: Match[]
}

const FlatListMatches: FC<FlatListMatchesProps> = ({data}) => {
    const { height, isScreenS } = useResize();

    const flatListIndicatorHeight = useMemo(() => height * 0.8, [height])

    return (
        isScreenS ?
            <FlatListIndicator
                flatListProps={{
                    ItemSeparatorComponent: () => <View style={{height: 12}} />,
                    data: data,
                    renderItem: (match) => data && <MatchCard match={match.item}/>,
                    keyExtractor: (match) => match.title,
                    scrollEnabled: true
                }}
                horizontal={false}
                position={120}
                indStyle={{width: 5, backgroundColor: '#101318'}}
                containerStyle={{height: flatListIndicatorHeight}}
            /> :
            <FlatList 
                ItemSeparatorComponent={() => <View style={{height: 12}} />}
                data={data}
                renderItem={(match) => data && <MatchCard match={match.item}/>}
                keyExtractor={(match) => match.title}
            />
    )
}

export default FlatListMatches;