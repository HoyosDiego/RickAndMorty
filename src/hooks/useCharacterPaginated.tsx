import { useEffect, useRef, useState } from "react";
import { characterApi } from "../api/characterApi";
import { CharacterPaginateResponse, Result, SimpleCharacter } from "../interfaces/characterInterfaces";


export const useCharacterPaginated = () => {
    const [isLoading, setisLoading] = useState(true);
    const [simpleCharacterList, setsimpleCharacterList] = useState<SimpleCharacter[]>([]);
    const nextPageUrl = useRef('https://rickandmortyapi.com/api/character?limit=1200')

    const loadCharacteres = async () => {
        setisLoading(true);
        const resp = await characterApi.get<CharacterPaginateResponse>(nextPageUrl.current);
        nextPageUrl.current = resp.data.info.next;
        mapCharacterList(resp.data.results);
    }

    const mapCharacterList = (characterList: Result[]) => {

        const newCharacterList: SimpleCharacter[] = characterList.map(({ name, url }) => {

            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 1];
            const picture = `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`;
 
            return { id, picture, name }
        });
        setsimpleCharacterList([...simpleCharacterList, ...newCharacterList])
        setisLoading(false)
    }

    //Charging characteres
    useEffect(() => {
        loadCharacteres();

    }, [])

    return {
        isLoading,
        simpleCharacterList,
        loadCharacteres
    }

}