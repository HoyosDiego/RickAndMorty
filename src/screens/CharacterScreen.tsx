import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { CharacterDeatils } from '../components/CharacterDetails';
import { FadeInImage } from '../components/FadeInImage';
import { useCharacter } from '../hooks/useCharacter';
import { RootStackParams } from '../navigator/Tab1';

interface Props extends NativeStackScreenProps<RootStackParams, 'CharacterScreen'> { };

export const CharacterScreen = ({ navigation, route }: Props) => {

    const { simpleCharacter, color } = route.params;
    const { top } = useSafeAreaInsets();
    const { name, id, picture } = simpleCharacter;
    const { isLoading, character } = useCharacter(id);

    return (
        <View style={{ flex: 1}}>
            <View style={{
                ...styles.headrContainer,
                backgroundColor: color
            }} >
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    activeOpacity={0.6}
                    style={{
                        ...styles.backButton,
                        top: top + 15
                    }}
                >
                    <Icon
                        name='arrow-back-outline'
                        color='white'
                        size={35}
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        ...styles.characterName,
                        top: top + 45
                    }}> {name + '\n'}#{id}
                </Text>

                {/*Image */}
                <Image
                    source={require('../assets/rickandmorty1.jpg')}
                    style={styles.character}
                />
                {/* Picture */}
                <FadeInImage
                    uri={picture}
                    style={{
                        ...styles.characterImage
                    }}
                />
            </View>

            {/**Loading */}
            {
                isLoading
                    ? (
                        <View style={{
                            ...styles.loading
                        }}>
                            <ActivityIndicator
                                color={color}
                                size={20}

                            />
                        </View>
                    ) : <CharacterDeatils character={character} />
            }



        </View >
    )

}

const styles = StyleSheet.create({
    headrContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000
    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    characterName: {
        color: 'black',
        fontSize: 30,
        alignSelf: 'flex-start',
        left: 20
    },
    character: {
        width: 340,
        height: 340,
        bottom: -40,
        opacity: 0.2,
        borderRadius: 200
    },
    characterImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -10,
        borderRadius: 150
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
