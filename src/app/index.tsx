import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MainTable from 'src/components/mainTable/mainTable';
import { MatchesContextProvider } from 'src/utils/matchesContext';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          TacticSansBoldIt: require('../assets/fonts/TacticSansBoldIt.ttf'),
          TacticSansReg: require('../assets/fonts/TacticSansReg.ttf'),
          InterMed: require('../assets/fonts/InterMed.ttf'),
          InterSemiBold: require('../assets/fonts/InterSemiBold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <MatchesContextProvider>
         <View style={styles.body}>
           <MainTable />
         </View>
       </MatchesContextProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    marginHorizontal: 0,
    marginVertical: 'auto',
    display: 'flex',
    backgroundColor: '#06080C',
    color: 'white',
    minHeight: '100%'
  }
});
