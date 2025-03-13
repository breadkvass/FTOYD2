import { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing, Dimensions  } from 'react-native';
import { FlatListIndicator } from '@fanchenbao/react-native-scroll-indicator';
import { getMatches } from 'src/utils/api';
import { MatchesContext } from 'src/utils/matchesContext';
import { MatchStatus } from 'src/utils/types';
import SelectDropdown from 'react-native-select-dropdown';
import MatchCard from '../matchCard/matchCard';
import AlertIcon from '../icons/alertIcon';
import Skeleton from '../skeleton/skeleton';
import RefreshIcon from '../icons/refreshIcon';
import ArrowDownIcon from '../icons/arrowDownIcon';
import ArrowUpIcon from '../icons/arrowUpIcon';

type FilterItem = {
    label: string;
    value: string;
}

const MainTable = () => {
    const {
        state: { matches, isLoading, isError},
        actions: {setMatches, setIsLoading, setIsError}
    } = useContext(MatchesContext);
    const [ filter, setFilter ] = useState<MatchStatus | ''>('')
    const [ dynamicHeight, setDynamicHeight ] = useState<number>();
    const [ dynamicWidth, setDynamicWidth ] = useState<number>();
    const [ isPickerHovered, setIsPickerHovered ] = useState(false);
    const [ isPickerItemHovered, setIsPickerItemHovered ] = useState('');
    const [ isPickerItemPressed, setIsPickerItemPressed ] = useState('');
    
    const spinValue = useRef(new Animated.Value(0)).current;
    let animation: Animated.CompositeAnimation | null = null;

    const filtredMatches = filter ? matches.filter((match) => match.status === filter) : matches;

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

    const filters: FilterItem[] = [
        {label: 'Все статусы', value: ''},
        {label: 'Match preparing', value: 'Scheduled'},
        {label: 'Live', value: 'Ongoing'},
        {label: 'Finished', value: 'Finished'},
    ]

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.title}>Match Tracker</Text>
                <SelectDropdown
                    data={filters}
                    onSelect={(selectedItem) => setFilter(selectedItem.value)}
                    renderButton={(selectedItem, isPickerOpen) => {
                        return (
                            <View
                                style={
                                    isPickerOpen ? (
                                         {...styles.picker, ...styles.dropdownButtonOpen}
                                    ) : (
                                        isPickerHovered ? (
                                            {...styles.picker, ...styles.dropdownButtonHover} 
                                        ) : (
                                            styles.picker
                                        )
                                    )
                                }
                                onPointerEnter={() => setIsPickerHovered(true)}
                                onPointerLeave={() => setIsPickerHovered(false)}
                            >
                                <Text style={
                                    (!isPickerHovered || !isPickerOpen) ? (
                                        styles.dropdownButtonTxtStyle
                                    ) : (
                                        {...styles.dropdownButtonTxtStyle, ...styles.dropdownButtonTextHover}
                                    )
                                }>
                                    {(selectedItem && selectedItem.label) || 'Все статусы'}
                                </Text>
                                {!isPickerOpen ?
                                    <ArrowDownIcon color={isPickerHovered ? 'white' : '#B4B5B6'} />
                                    :
                                    <ArrowUpIcon />
                                }
                            </View>
                        );
                    }}
                    renderItem={(item: FilterItem) => {
                        return (
                            <View
                                style={
                                    (isPickerItemHovered === item.value) ? (
                                        {...styles.dropdownItemStyle, ...styles.dropdownItemHover}
                                    ) : (
                                        (isPickerItemPressed === item.value) ? (
                                            {...styles.dropdownItemStyle, ...styles.dropdownItemPressed}
                                        ) : (
                                            styles.dropdownItemStyle
                                        )
                                    )
                                }
                                onPointerEnter={() => setIsPickerItemHovered(item.value)}
                                onPointerLeave={() => setIsPickerItemHovered('')}
                                onPointerDown={() => setIsPickerItemPressed(item.value)}
                                onPointerUp={() => {
                                    setIsPickerItemPressed('');
                                    setIsPickerHovered(false)
                                }}
                            >
                                <Text style={
                                    (isPickerItemHovered === item.value || isPickerItemPressed === item.value) ? (
                                        {...styles.dropdownItemTxtStyle, ...styles.dropdownButtonTextHover}
                                    ) : (
                                        styles.dropdownItemTxtStyle
                                    )
                                }>
                                    {item.label}
                                </Text>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
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
    picker: {
        marginRight: 'auto',
        marginLeft: 24,
        width: 190,
        backgroundColor: '#0B0E12',
        padding: 16,
        borderWidth: 0,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownButtonHover: {
        backgroundColor: '#0F1318'
    },
    dropdownButtonOpen: {
        backgroundColor: '#0B0E12',
        borderColor: '#171D25',
        borderWidth: 1
    },
    dropdownButtonTxtStyle: {
        color: '#B4B5B6',
        fontFamily: 'InterMed',
        fontSize: 16,
    },
    dropdownButtonTextHover: {
        color: 'white'
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#0F1318',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        backgroundColor: '#0F1318',
        padding: 12,
    },
    dropdownItemHover: {
        backgroundColor: '#11161D',
    },
    dropdownItemPressed: {
        backgroundColor: '#0D1115'
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'InterMed',
        color: '#B4B5B6',
    },
    dropdownItemTxtHover: {
        color: 'white'
    },
    dropdownItemIconStyleHover: {
        color: 'white'
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