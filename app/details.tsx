import { useLocalSearchParams, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function Details() {
  const params = useLocalSearchParams();
  const name = params.name as string;

  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPokemon();
  }, []);

  async function fetchPokemon() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch details");
      }

      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      setError("Failed to load Pokémon details.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!pokemon) return null;

  function formatStatName(name: string) {
  return name
    .split("-")
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

  return (
    <>
      <Stack.Screen options={{ title: name }} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />

        <Text style={styles.title}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>

        <Text style={styles.subtitle}>
          Height: {pokemon.height}
        </Text>

        <Text style={styles.subtitle}>
          Weight: {pokemon.weight}
        </Text>

        <Text style={styles.section}>Types:</Text>
        {pokemon.types.map((t: any) => (
          <Text key={t.type.name} style={styles.type}>
            • {t.type.name}
          </Text>
        ))}

        <Text style={styles.section}>Stats:</Text>
        {pokemon.stats.map((stat: any) => (
          <View key={stat.stat.name} style={{ marginVertical: 6 }}>
  <Text style={styles.statName}>
    {formatStatName(stat.stat.name)}: {stat.base_stat}
  </Text>

    <View
      style={{
        height: 8,
        backgroundColor: "#ddd",
        borderRadius: 4,
        overflow: "hidden",
        marginTop: 4,
      }}
    >
      <View
        style={{
          height: 8,
          width: `${stat.base_stat / 2}%`,
          backgroundColor: "#4CAF50",
        }}
      />
    </View>
  </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 4,
  },
  section: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  type: {
    fontSize: 16,
    marginVertical: 2,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  statName: {
    textTransform: "capitalize",
  },
});