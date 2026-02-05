import { apiGet } from "./api";

export type Post = {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export function fetchPosts() {
  return apiGet<Post[]>("/wp/v2/posts");
}
export function fetchPost(id: number) {
  return apiGet<Post>(`/wp/v2/posts/${id}`);
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}
