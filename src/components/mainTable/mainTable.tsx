import { useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Animated, Easing  } from 'react-native';
import { getMatches } from 'src/utils/api';
import { MatchesContext } from 'src/utils/matchesContext';
import MatchCard from '../matchCard/matchCard';
import AlertIcon from '../icons/alertIcon';
import Skeleton from '../skeleton/skeleton';
import RefreshIcon from '../icons/refreshIcon';

const MainTable = () => {
    const {
        state: { matches, isLoading, isError},
        actions: {setMatches, setIsLoading, setIsError}
    } = useContext(MatchesContext);
    const [ dynamicHeight, setDynamicHeight ] = useState<number>();
    const [ dynamicWidth, setDynamicWidth ] = useState<number>();
    
    const spinValue = useRef(new Animated.Value(0)).current;
    let animation: Animated.CompositeAnimation | null = null;
    const { height, width } = Dimensions.get('window');

    useEffect(() => {
        setDynamicHeight(height * 0.8)
    }, [height])

    useEffect(() => {
        setDynamicWidth(width)
    }, [width])


    useEffect(() => {
        if (isLoading) {
          animation = Animated.loop(
            Animated.timing(spinValue, {
              toValue: -1,
              duration: 2000,
              easing: Easing.linear,
              useNativeDriver: false,
            })
          );
          animation.start();
        } else {
          spinValue.setValue(0);
        }
    
        return () => {
          if (animation) {
            animation.stop();
          }
        };
      }, [isLoading]);

    useEffect(() => {
        setIsLoading(true);
        getAllMatches();
    }, [])

    const getAllMatches = () => {
        getMatches()
            .then(data => setMatches(data.data.matches))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    const onRefresh = () => {
        setIsLoading(true);
        getAllMatches();
    }

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.title}>Match Tracker</Text>
                <View style={styles.update}>
                    {isError && 
                        <View style={styles.warning}>
                            <AlertIcon />
                            <Text style={styles.error}>Ошибка: не удалось загрузить информацию</Text>
                        </View>
                    }
                    <TouchableOpacity style={styles.refreshButton} onPress={() => onRefresh()}>
                        <Text style={styles.refreshText}>Обновить</Text>
                        <RefreshIcon spinValue={spinValue} />
                    </TouchableOpacity>
                </View>
            </View>
            {isLoading ? (
                <Skeleton length={6} />
            ) : (
                <FlatListIndicator
                    flatListProps={{
                        ItemSeparatorComponent: () => <View style={{height: 12}} />,
                        data: filtredMatches,
                        renderItem: (match) => matches && <MatchCard match={match.item}/>,
                        keyExtractor: (match) => match.title,
                        scrollEnabled: true
                    }}
                    horizontal={false}
                    position={120}
                    indStyle={{width: 5, backgroundColor: '#101318'}}
                    containerStyle={{height: dynamicHeight}}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: '100%',
        padding: 42,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    title: {
      fontSize: 32,
      lineHeight: 32,
      color: 'white',
      fontFamily: 'TacticSansBoldIt'
    },
    update: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    warning: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F1318',
        borderRadius: 4,
        gap: 10,
        paddingVertical: 17,
        paddingHorizontal: 24
    },
    error: {
        fontSize: 18,
        fontWeight: 500,
        color: 'white',
        fontFamily: 'InterMed'
    },
    refreshButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EB0237',
        borderRadius: 4,
        padding: 15,
        gap: 10,
    },
    refreshText: {
        fontFamily: 'InterSemiBold',
        fontSize: 18,
        fontWeight: 600,
        color: 'white'
    },
    cards: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '100%'
    },

// .refresh:disabled svg path {
//     fill: #787878;
// }


// .refresh:active {
//     background-color: #A01131;
// }

// .refresh:disabled {
//     background-color: #701328;
//     color: #787878;
// }

// .refresh p {
//     font-size: 18px;
//     font-weight: 600;
//     color: white;
// }
});

export default MainTable;