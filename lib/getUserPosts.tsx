import { PostType } from "@/type";

export default async function getUserPosts(
  userId: string
): Promise<PostType[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    { cache: "force-cache" }
  );

  // `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  //   { cache: "force-cache" }; adalah default
  if (!res.ok) {
    throw new Error("Fetching data Failed");
  }
  const data = await res.json();
  return data;
}
