import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CharacterScreen } from '../screens/CharacterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SimpleCharacter } from '../interfaces/characterInterfaces';

export type RootStackParams = {
    HomeScreen: undefined;
    CharacterScreen: { simpleCharacter: SimpleCharacter, color: string }
}

const Stack = createNativeStackNavigator<RootStackParams>();

export const Tab1 = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: 'white' }
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CharacterScreen" component={CharacterScreen} />
        </Stack.Navigator>
    );
}
