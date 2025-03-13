import { FlatListIndicator } from "@fanchenbao/react-native-scroll-indicator"
import { FC, useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { Match } from "src/utils/types";
import MatchCard from "../matchCard/matchCard";

type FlatListMatchesProps = {
    data: Match[]
}

const FlatListMatches: FC<FlatListMatchesProps> = ({data}) => {
    const [ dynamicHeight, setDynamicHeight ] = useState<number>();
    const { height, width } = Dimensions.get('window');
    
    useEffect(() => {
        setDynamicHeight(height * 0.8)
    }, [height])

    return (
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
            containerStyle={{height: dynamicHeight}}
        />
    )
}

export default FlatListMatches;