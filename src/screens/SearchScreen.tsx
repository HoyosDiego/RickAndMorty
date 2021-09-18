import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View, } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CharacterCard } from "../components/CharacterCard";
import { Loading } from "../components/Loading";
import { SearchInput } from "../components/SearchInput";
import { useCharacterSearch } from "../hooks/useCharacterSearch";
import { SimpleCharacter } from "../interfaces/characterInterfaces";
import { styles } from "../theme/appTheme";


const screenWidth = Dimensions.get('window').width

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simpleCharacterList } = useCharacterSearch();

    const [characterFiltered, setCharacterFiltered] = useState<SimpleCharacter[]>([])
    const [term, setTerm] = useState('')

    console.log(simpleCharacterList)
    useEffect(() => {
        if (term.length === 0) {
            return setCharacterFiltered([])
        }

        if (isNaN(Number(term))) {
            setCharacterFiltered(

                simpleCharacterList.filter(
                    character => character.name.toLocaleLowerCase()
                        .includes(term.toLocaleLowerCase())
                )
            )
        } else {
            const characterById = simpleCharacterList.find(character => character.id === term)
            setCharacterFiltered(
                (characterById) ? [characterById] : []
            )
        }

    }, [term])

    if (isFetching) {
        return <Loading />
    }
    return (
        <View style={{
            flex: 1,
            marginHorizontal: 20
        }}>
            <SearchInput
                onDebounce={(value) => setTerm(value)}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 60,
                    top: top +10
                }} />

            <FlatList
                data={characterFiltered}
                keyExtractor={(character) => character.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}

                // Header
                ListHeaderComponent={(
                    <Text style={{
                        ...styles.title,
                        ...styles.globalMargin,
                        marginTop: top + 45
                    }}>{term}</Text>
                )}

                renderItem={({ item }) => (<CharacterCard character={item} />)}

            />
        </View>
    )
}
