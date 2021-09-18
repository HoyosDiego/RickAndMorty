import React from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CharacterCard } from '../components/CharacterCard';
import { FadeInImage } from '../components/FadeInImage';
import { useCharacterPaginated } from '../hooks/useCharacterPaginated';
import { styles } from '../theme/appTheme';


export const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    const { simpleCharacterList, loadCharacteres } = useCharacterPaginated();
    //console.log(simpleCharacterList)
    return (
        <View>
            <Image
                source={require('../assets/rickandmorty.png')}
                style={styles.characterGB}
            />
            <View
                style={{
                    alignItems: 'center'
                }}>
                <FlatList
                    data={simpleCharacterList}
                    keyExtractor={(character) => character.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}

                    // Header
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: +20
                        }}>Rick And Morty</Text>
                    )}

                    renderItem={({ item }) => (<CharacterCard character={item} />)}

                    //infinite scroll
                    onEndReached={loadCharacteres}
                    onEndReachedThreshold={0.4}
                    ListFooterComponent={
                        <ActivityIndicator
                            style={{ height: 100 }}
                            size={20}
                            color="grey" />
                    }
                />
            </View>
        </View>
    )

}