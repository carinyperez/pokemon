import Head from 'next/head'
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'; 
import {useState} from 'react';
import Link from 'next/link';

export default function Home({pokemon}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h1 style={{color: 'blue'}}>Pokemon List</h1>
      <div>
          {
            pokemon?.slice(0,10).map((pokemon) => (
              <div key={pokemon.id}>
               <Link href={`/pokemon/${pokemon.id}`}>
                <h3>{pokemon.name}</h3>
               </Link>
              </div> 
            ))
          }
        </div>
    </div>
  )
}

// returns an object with props, sends it to the react component which them renders them 

export const getStaticProps = async () => {
  const response = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");

  return {
    props: {
      pokemon: await response.json()
    }
  }

}