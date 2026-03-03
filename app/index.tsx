import { useEffect, useState, memo } from "react";
import { Link } from "expo-router";
import { FlatList, Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";


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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPokemons();
  }, []);


  const onRefresh = async () => {
  setRefreshing(true);
  await fetchPokemons();
  setRefreshing(false);
  };
async function fetchPokemons(isRefresh = false) {
  try {
    setLoading(true);
    setError(null);

    if (!isRefresh) setLoading(true);

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=20`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon: any) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();

        return {
          name: pokemon.name,
          image: details.sprites.front_default,
          imageBack: details.sprites.back_default,
          types: details.types,
        };
      })
    );

    setPokemons(detailedPokemons);
  } catch (err) {
    console.log(err);
    setError("Failed to load Pokémon.");
  } finally {
    setLoading(false);
    if (!isRefresh) setLoading(false);
  }
}

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
  <FlatList
    data={pokemons}
    keyExtractor={(item) => item.name}
    contentContainerStyle={{
      padding: 16,
      // gap: 16
    }}
    renderItem={({ item }) => (
      <PokemonCard pokemon={item} />
    )}
    refreshing={refreshing}
    onRefresh={onRefresh}
    ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
  />
);
}

const PokemonCard = memo(({ pokemon }: { pokemon: Pokemon }) => {
  const primaryType = pokemon.types?.[0]?.type
    ?.name as keyof typeof colorsByType;

  const backgroundColor =
    primaryType && colorsByType[primaryType]
      ? colorsByType[primaryType] + "50"
      : "#eee";

  return (
    <Link
      href={{
        pathname: "/details",
        params: { name: pokemon.name },
      }}
      style={{
        backgroundColor,
        padding: 20,
        borderRadius: 20,
      }}
    >
      <View>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.type}>
          {primaryType ?? "unknown"}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: pokemon.image }}
            style={{ width: 150, height: 150 }}
          />
          <Image
            source={{ uri: pokemon.imageBack }}
            style={{ width: 150, height: 150 }}
          />
        </View>
      </View>
    </Link>
  );
});

PokemonCard.displayName = "PokemonCard";



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