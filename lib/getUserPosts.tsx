import { PostType } from "@/type";

export default async function getUserPosts(
  userId: string
): Promise<PostType[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    { cache: "force-cache" }
  );

  // `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  //   { cache: "force-cache" }; adalah default, jadi begitu cache data,
  // ya udah data itu selamanya yang dipakai

  // `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  //   { cache: "no-store" }; berarti data ga ada yang disimpan, begitu
  // masuk lagi ke page, fetch diulang lagi (ini bisa bikin berat dan
  // rugi kalo datanya sama)

  // `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  //   { next: {revalidate : 60}}; ISR = Incremental Static Regeneration
  // metode ini untuk SSG maupun SSR (baik di client maupun di Server)
  // satuannya dalam detik. Jadi dalam metode ini, harus nunggu 60 detik dulu
  // baru dia fetch ulang. Kalo ada data yang diubah sebelum 60 detik, dia akan
  // pakai data yang lama.

  // if (!res.ok) {
  //   throw new Error("Fetching data Failed");
  // } ini untuk error yang normal

  if (!res.ok) {
    undefined;
  }
  // ini untuk page kalau mau pakai noFound() dari next/Navigation

  const data = await res.json();
  return data;
}
