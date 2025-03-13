import { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Dimensions  } from 'react-native';
import { getMatches } from 'src/utils/api';
import { MatchesContext } from 'src/utils/matchesContext';
import { MatchStatus } from 'src/utils/types';
import { animate } from 'src/utils/utils';
import AlertIcon from '../icons/alertIcon';
import Skeleton from '../skeleton/skeleton';
import RefreshIcon from '../icons/refreshIcon';
import FilterPicker from '../filterPicker/filterPicker';
import FlatListMatches from './flatListMatches';

const MainTable = () => {
    const {
        state: { matches, isLoading, isError},
        actions: {setMatches, setIsLoading, setIsError}
    } = useContext(MatchesContext);
    const [ filter, setFilter ] = useState<MatchStatus | ''>('');
    
    const spinValue = useRef(new Animated.Value(0)).current;

    const filtredMatches = filter ? matches.filter((match) => match.status === filter) : matches;

    const { height, width } = Dimensions.get('window');

    useEffect(() => {
        animate(isLoading, spinValue);
    }, [isLoading]);

    useEffect(() => {
        getAllMatches();
    }, [])

    const getAllMatches = () => {
        setIsLoading(true);
        getMatches()
            .then(data => setMatches(data.data.matches))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    const onRefresh = () => getAllMatches();
 
    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.title}>Match Tracker</Text>
                <FilterPicker setFilterHandler={(selectedItem) => setFilter(selectedItem)}/>
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
            {isLoading ? <Skeleton length={6} /> : <FlatListMatches data={filtredMatches}/>}
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
    }
});

export default MainTable;