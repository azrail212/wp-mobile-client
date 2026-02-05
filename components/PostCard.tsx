import React from "react";
import { Pressable, Text } from "react-native";

type PostCardProps = {
  title: string;
  excerpt: string;
  onPress: () => void;
};

const PostCard = ({ title, excerpt, onPress }: PostCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 8,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: "#eee",
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 6,
          color: "#111",
        }}
        numberOfLines={3}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          lineHeight: 20,
          color: "#555",
        }}
        numberOfLines={3}
      >
        {excerpt}
      </Text>
    </Pressable>
  );
};

export default PostCard;
