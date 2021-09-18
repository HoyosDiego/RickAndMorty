import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { characterApi } from "../api/characterApi";
import { useCharacter } from "../hooks/useCharacter";
import { CharacterFull } from "../interfaces/characterInterfaces";
import { FadeInImage } from "./FadeInImage";

interface Props {
    character: CharacterFull;
}

export const CharacterDeatils = ({ character }: Props) => {
    const { top } = useSafeAreaInsets();
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                ...StyleSheet.absoluteFillObject,
            }}>
            <View style={{
                ...styles.container,
                marginTop: 370
            }}>
                <Text style={{ ...styles.title }}>Name</Text>
                <Text>{character.name}
                </Text>
            </View>
            <View style={{ ...styles.container }}>
                <Text style={{ ...styles.title }}>Status</Text>
                <Text >{character.status}
                </Text>
            </View >
            <View style={{ ...styles.container }}>
                <Text style={{ ...styles.title }}>Gender</Text>
                <Text >{character.gender}
                </Text>
            </View >
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <FadeInImage
                    uri={character.image}
                    style={styles.characterImage}
                />
            </ScrollView>
            <View style={{ ...styles.container }}>
                <Text style={{ ...styles.title }}>Species</Text>
                <Text >{character.species}
                </Text>
            </View >
            <View style={{ ...styles.container }}>
                <Text style={{ ...styles.title }}>Created</Text>
                <Text >{character.created}
                </Text>
            </View >
            <View
            >{
                    character.episode.map((r) => {
                        const resp = characterApi.get<CharacterFull>('https://rickandmortyapi.com/api/character/1')
                        console.log(character)

                    })
                }
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 15
    },
    characterImage: {
        width: 100,
        height: 100,
        left: 10,
        marginTop: 10
    }

});