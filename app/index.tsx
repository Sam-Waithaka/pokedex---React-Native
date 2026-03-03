import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";

interface Pokemon{
  name: string,
  image: string
  imageBack: string
  types: PokemonType[]
}

interface PokemonType {
  type: {
    name: string, 
    url: string
  }
}

const colorsByType = {
  bug: '#A6B91A',
  dark: '#705746',
  dragon: '#6F35FC',
  electric: '#F7D02C',
  fairy: '#D685AD',
  fighting: '#C22E28',
  fire: '#EE8130',
  flying: '#A98FF3',
  ghost: '#735797',
  grass: '#7AC74C',
  ground: '#E2BF65',
  ice: '#96D9D6',
  normal: '#A8A77A',
  poison: '#A33EA1',
  psychic: '#F95587',
  rock: '#B6A136',
  steel: '#B7B7CE',
  water: '#6390F0',
  stellar: '#40B5A5' // Also represented as a rainbow/multicolor aura
};


export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  console.log(JSON.stringify(pokemons[0], null, 2))

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=20`,
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any)=>{
          const res = await fetch(pokemon.url)
          const details = await res.json()

          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types
          }
        })
      )

      setPokemons(detailedPokemons);
      console.log(detailedPokemons);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16
      }}
    >
      {pokemons.map((pokemon) => (
        <Link key={pokemon.name}
          href={{
            pathname: "/details",
            params: {name: pokemon.name}
          }}
          style={{
          // @ts-ignore
          backgroundColor: colorsByType[pokemon.types[0].type.name] + 50,
          padding: 20,
          borderRadius: 20
        }}
        >
          <View>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
          <View style={{
            flexDirection: 'row'
          }}>
            <Image 
              source={{uri: pokemon.image}}
              style={{width: 150, height: 150}}
            />
            <Image 
              source={{uri: pokemon.imageBack}}
              style={{width: 150, height: 150}}
            />
          </View>
        </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center'
  }
})