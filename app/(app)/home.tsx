import PostCard from "@/components/PostCard";
import Screen from "@/components/Screen";
import { fetchPosts, Post, stripHtml } from "@/lib/posts";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList } from "react-native";

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
        renderItem={({ item }) => (
          <PostCard
            title={item.title.rendered}
            excerpt={stripHtml(item.excerpt.rendered)}
            onPress={() =>
              router.push({
                pathname: "/post/[id]",
                params: { id: String(item.id) },
              })
            }
          />
        )}
      ></FlatList>
      <Button title="Go to Debug" onPress={() => router.push("/(app)/debug")} />
    </Screen>
  );
}
