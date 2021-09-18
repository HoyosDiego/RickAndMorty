
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1 } from './Tab1';
import Icon from 'react-native-vector-icons/Ionicons';
import { Tab2Screen } from './Tab2';
const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (

        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white',
            }}

        >
            <Tab.Screen
                name="HomeScreen"
                component={Tab1}
                options={{
                    tabBarLabel: 'Listado',
                    tabBarIcon: ({ color }) =>
                    (
                        <Icon
                            color={color}
                            size={35}
                            name="list-outline"
                        />
                    )
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={Tab2Screen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) =>
                    (
                        <Icon
                            name="search-outline"
                            color={color}
                            size={35}
                        />
                    )
                }} />
        </Tab.Navigator>
    );
}