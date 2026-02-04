import Screen from "@/components/Screen";
import { fetchPosts, Post } from "@/lib/posts";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Text } from "react-native";

export default function Home() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  });

  if (loading) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <Text style={{ marginVertical: 8 }}></Text>
        )}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {item.title.rendered}
          </Text>
        )}
      ></FlatList>
      <Button title="Go to Debug" onPress={() => router.push("/(app)/debug")} />
    </Screen>
  );
}
