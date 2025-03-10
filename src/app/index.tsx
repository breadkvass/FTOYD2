import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MainTable from 'src/components/mainTable/mainTable';
import { MatchesContextProvider } from 'src/utils/matchesContext';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const App = () => {
  const [font, setFont] = useState(false);

  const fonts = async () => await Font.loadAsync({
    TacticSansBoldIt: require('../assets/fonts/TacticSansBoldIt.ttf'),
    TacticSansReg: require('../assets/fonts/TacticSansReg.ttf'),
    InterMed: require('../assets/fonts/InterMed.ttf'),
    InterSemiBold: require('../assets/fonts/InterSemiBold.ttf'),
  });

  if(font) {
    return (
      <MatchesContextProvider>
        <View style={styles.body}>
          <MainTable />
        </View>
      </MatchesContextProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={fonts}
        onError={err => console.log(err)}
        onFinish={() => setFont(true)}
      />
    )
  }
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
