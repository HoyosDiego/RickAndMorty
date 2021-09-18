import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CharacterScreen } from "../screens/CharacterScreen";
import { SearchScreen } from "../screens/SearchScreen";
import React from 'react';
import { SimpleCharacter } from "../interfaces/characterInterfaces";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



export type RootStackParams = {
    HomeScreen: undefined;
    CharacterScreen: { simpleCharacter: SimpleCharacter, color: string }
}

const Tab2 = createNativeStackNavigator<RootStackParams>();

export const Tab2Screen = () => {
    return (
        <Tab2.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: 'white' }
            }}
        >
            <Tab2.Screen name="HomeScreen" component={SearchScreen} />
            <Tab2.Screen name="CharacterScreen" component={CharacterScreen} />
        </Tab2.Navigator>
    );
}





