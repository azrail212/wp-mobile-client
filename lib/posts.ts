import { apiGet } from "./api";

export type Post = {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
};

export function fetchPosts() {
  return apiGet<Post[]>("/wp/v2/posts");
}
