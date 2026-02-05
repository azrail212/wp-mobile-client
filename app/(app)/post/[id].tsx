import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";

import Screen from "@/components/Screen";
import { fetchPost, Post, stripHtml } from "@/lib/posts";

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchPost(Number(id))
      .then(setPost)
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );
  }

  if (error || !post) {
    return (
      <Screen>
        <Text>{error ?? "Post not found"}</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            marginBottom: 16,
            color: "#111",
          }}
        >
          {post.title.rendered}
        </Text>

        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            color: "#333",
          }}
        >
          {stripHtml(post.content.rendered)}
        </Text>
      </ScrollView>
    </Screen>
  );
}
