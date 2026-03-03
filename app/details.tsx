import { useLocalSearchParams, Stack } from "expo-router";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";

export default function Details() {
    
    const params = useLocalSearchParams()
    console.log(params)

  return (
    <>
      <Stack.Screen options={{title: params.name as string}} />
        <ScrollView
            contentContainerStyle={{
                gap: 16,
                padding: 16
            }}
        >
            <Text>{params.name}</Text>
        </ScrollView>
    </>
  );
}
 