import { UsersType } from "@/type";

export default async function getUser(userId: string): Promise<UsersType> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  // if (!res.ok) {
  //   throw new Error("Fetching data Failed");
  // }
  if (!res.ok) {
    undefined;
  }
  // ini untuk page kalau mau pakai noFound() dari next/Navigation
  const data = await res.json();
  return data;
}
