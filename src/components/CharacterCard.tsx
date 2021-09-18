import { Dimensions, Image, ImageBackgroundBase, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { SimpleCharacter } from "../interfaces/characterInterfaces"
import { FadeInImage } from "./FadeInImage";
import ImageColors from "react-native-image-colors";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;

interface Props {
    character: SimpleCharacter;
}
export const CharacterCard = ({ character }: Props) => {

    const [bgColor, setBgColor] = useState('green');
    const isMounted = useRef(true);
    const navigation = useNavigation();
    useEffect(() => {
        ImageColors.getColors(character.picture, { fallback: 'green' })
            .then(colors => {
                if (!isMounted.current) return;

                if (colors.platform === 'ios') {
                    setBgColor(colors.primary || 'green')
                } else if (colors.platform === 'android') {
                    setBgColor(colors.dominant || 'green')
                }
            });

        return () => {
            isMounted.current = false;
        }
    }, [])


    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={
                () => navigation.navigate('CharacterScreen', {
                    simpleCharacter: character,
                    color: bgColor
                })}
        >
            <View
                style={{
                    ...styles.cardContainer,
                    width: windowWidth * 0.4,
                    backgroundColor: bgColor
                }}>
                <View>
                    <Text
                        style={{
                            ...styles.name
                        }}>
                        {character.name}
                        {'\n#' + character.id}
                    </Text>
                </View>
                <Image
                    source={require('../assets/rickandmorty1.jpg')}
                    style={styles.character}
                />

                <FadeInImage
                    uri={character.picture}
                    style={styles.characterImage}
                />

            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        //backgroundColor: 'green',
        height: 140,
        width: 160,
        marginBottom: 25,
        borderRadius: 15
    },
    name: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 4
    },
    character: {
        width: 70,
        height: 70,
        left: -10,
        position: 'absolute',
        top: 75,
        opacity: 0.5,
        overflow: 'hidden',
        borderRadius: 50
    },
    characterImage: {
        width: 130,
        height: 105,
        position: 'absolute',
        right: -2,
        bottom: -2,
        borderRadius: 30
    }
});