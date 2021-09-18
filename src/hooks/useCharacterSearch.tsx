import { useEffect, useRef, useState } from "react";
import { characterApi } from "../api/characterApi";
import { CharacterPaginateResponse, Result, SimpleCharacter } from "../interfaces/characterInterfaces";


export const useCharacterSearch = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [simpleCharacterList, setsimpleCharacterList] = useState<SimpleCharacter[]>([]);

    const loadCharacteres = async () => {
        setIsFetching(true);
        const resp = await characterApi.get<CharacterPaginateResponse>('https://rickandmortyapi.com/api/character?limit=100');
        mapCharacterList(resp.data.results);
    }

    const mapCharacterList = (characterList: Result[]) => {

        const newCharacterList: SimpleCharacter[] = characterList.map(({ name, url }) => {

            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 1];
            const picture = `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`;

            return { id, picture, name }
        });
        setsimpleCharacterList(newCharacterList)
        setIsFetching(false)
    }

    //Charging characteres
    useEffect(() => {
        loadCharacteres();

    }, [])

    return {
        isFetching,
        simpleCharacterList
    }

}