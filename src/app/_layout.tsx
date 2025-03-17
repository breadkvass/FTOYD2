import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>          
  );
};

export default Layout;
