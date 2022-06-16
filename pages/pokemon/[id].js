import {useRouter} from 'next/router';
import { useState, useEffect } from 'react';

const Details = ({pokemon}) => {
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


// define a list of paths to be statically generated
export const getStaticPaths = async () => {
    const url = `https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`
    const response = await fetch(url);
    const pokemon = await response.json(); 
    
    return {
        paths: pokemon.map((pokemon) => ({
            params: {id : pokemon.id.toString()}
        })),
        fallback: false
    }
}

export const getStaticProps = async ({params}) => {
    const url = `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
    const response = await fetch(url);

    return {
        props: {
           pokemon: await response.json()
        }
    }

}

export default Details; 
