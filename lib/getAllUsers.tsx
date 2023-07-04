import { UsersType } from "@/type";

export default async function getAllUsers(): Promise<UsersType[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Fetching data Failed");
  }
  const data = await res.json();
  return data;
}
