import {useRouter} from 'next/router';
import { useState, useEffect } from 'react';

const Details = () => {
    const {
        query : {id}
    } = useRouter();

    const [pokemon, setPokemon] = useState([]); 
    useEffect(() => {
        const getPokemon = async () => {
        const url = `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
        const response = await fetch(url);
        setPokemon(await response.json());
        }

        if(id) {
            getPokemon();
        }

    },[id]);
    
    if(!pokemon) {
        return null 
    }

    return (
        <div> 
            <h3>{pokemon.name}</h3>
            <p>{pokemon?.type?.slice(0,2).join(",")}</p>
            <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
            />
        </div>
    )   
};

export default Details; 
