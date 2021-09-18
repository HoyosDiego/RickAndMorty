import { useEffect, useState } from "react"
import { characterApi } from "../api/characterApi"
import { CharacterFull } from "../interfaces/characterInterfaces"


export const useCharacter = (id: string) => {
    const [isLoading, setIsLoading] = useState(true)
    const [character, setCharacter] = useState<CharacterFull>({} as CharacterFull)

    const loadCharacter = async () => {
        const resp = await characterApi.get<CharacterFull>(`https://rickandmortyapi.com/api/character/${id}`)
        setCharacter(resp.data);
        setIsLoading(false)
    }
    

    useEffect(() => {
        loadCharacter();
    }, [])

    return {
        isLoading,
        character
    }
}