import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { getMatches } from 'src/utils/api';
import { MatchesContext } from 'src/utils/matchesContext';
import { MatchStatus } from 'src/utils/types';
import { animate } from 'src/utils/utils';
import { useResize } from 'src/hooks/useResize';
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
    const { width, isScreenS, isScreenL } = useResize();
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animate(isLoading, spinValue);
    }, [isLoading]);

    useEffect(() => getAllMatches(), [])
    
    // стили элементов в зависимости от ширины экрана
    const mainStyle = useMemo(() => !isScreenS ? {...styles.main, ...styles.main800} : styles.main, [width]);
    const headerStyle = useMemo(() => !isScreenS ? {...styles.header, ...styles.header800} : styles.header, [width]);
    const errorStyle = useMemo(() => !isScreenS ? {...styles.error, ...styles.error800} : styles.error, [width]);
    const refreshButtonStyle = useMemo(() => !isScreenS ? {...styles.refreshButton, ...styles.refreshButton800} : styles.refreshButton, [width]);

    const rightHeaderPartStyle = useMemo(() => {
        return (!isScreenS ? {...styles.rightHeaderPart, ...styles.rightHeaderPart800}
            : (!isScreenL ? {...styles.rightHeaderPart, ...styles.rightHeaderPart1200} : styles.rightHeaderPart))
    }, [width]);

    const leftHeaderPartStyle = useMemo(() => {
        return (!isScreenS ? {...styles.leftHeaderPart, ...styles.leftHeaderPart800}
            : (!isScreenL ? ({...styles.leftHeaderPart, ...styles.leftHeaderPart1200}) : (styles.leftHeaderPart)))
    }, [width]);

    // отфильтрованные матчи
    const filtredMatches = useMemo(() => filter ? matches.filter((match) => match.status === filter) : matches, [matches]);

    const getAllMatches = () => {
        setIsLoading(true);
        getMatches()
            .then(data => setMatches(data.data.matches))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    const onRefresh = () => {
        setIsError(false);
        getAllMatches();
    }
 
    return (
        <View style={mainStyle}>
            <View style={headerStyle}>
                <View style={leftHeaderPartStyle}>
                    <Text style={styles.title}>Match Tracker</Text>
                    <FilterPicker setFilterHandler={(selectedItem) => setFilter(selectedItem)}/>
                </View>
                <View style={rightHeaderPartStyle}>
                    {isError && 
                        <View style={errorStyle}>
                            <AlertIcon />
                            <Text style={styles.errorText}>Ошибка: не удалось загрузить информацию</Text>
                        </View>
                    }
                    <TouchableOpacity style={refreshButtonStyle} onPress={() => onRefresh()}>
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
        minHeight: '100%'
    },
    main800: {
        padding: 0,
        paddingTop: 32,
        paddingHorizontal: 16
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    header800: {
        flexDirection: 'column',
        gap: 10,
        width: '100%'
    },
    title: {
      fontSize: 32,
      lineHeight: 32,
      color: 'white',
      fontFamily: 'TacticSansBoldIt',
      minWidth: 160,
      maxWidth: 290 
    },
    leftHeaderPart: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24
    },
    leftHeaderPart1200: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    },
    leftHeaderPart1000: {
        flexDirection: 'column',
        gap: 14,
    },
    leftHeaderPart800: {
        flexDirection: 'column',
        gap: 14,
        width: "100%"
    },
    rightHeaderPart: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginLeft: 24,
        zIndex: 2,
        position: 'absolute',
        right: 0
    },
    rightHeaderPart1200: {
        flexDirection: 'column-reverse',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginLeft: 0,
        alignSelf: 'flex-end'
    },
    rightHeaderPart800: {
        flexDirection: 'column-reverse',
        width: "100%",
        position: 'relative',
        marginLeft: 0,
    },
    error: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F1318',
        borderRadius: 4,
        gap: 10,
        paddingVertical: 17,
        paddingHorizontal: 24,
        height: 56
    },
    error800: {
        width: '100%',
        justifyContent: 'center'
    },
    errorText: {
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
    refreshButton800: {
        width: '100%'
    },
    refreshText: {
        fontFamily: 'InterSemiBold',
        fontSize: 18,
        fontWeight: 600,
        color: 'white'
    },
});

export default MainTable;