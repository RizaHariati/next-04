import getAllUsers from "@/lib/getAllUsers";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { PostType, UsersType } from "@/type";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

type Params = {
  params: { userId: string };
};

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const gettingUser: Promise<UsersType> = getUser(userId);
  const userData = await gettingUser;
  return {
    title: userData.name,
    description: `Detailed page of ${userData.name}`,
  };
}
export default async function SingleUser({ params: { userId } }: Params) {
  const gettingUser: Promise<UsersType> = getUser(userId);

  const gettingPosts: Promise<PostType[]> = getUserPosts(userId);
  const [singleUser, posts] = await Promise.all([gettingUser, gettingPosts]);

  const aboutUser = (
    <div>
      <h1>About User</h1>
      <div>
        <h2>{singleUser.name}</h2>
        <p>phone: {singleUser.phone}</p>
        <p>website: {singleUser.website}</p>
        <p>email: {singleUser.email}</p>
        <p>city: {singleUser.address.city}</p>
      </div>
    </div>
  );

  const userPost = (
    <div className="mt-5">
      <h2>{`${singleUser.name}'s work :`}</h2>
      {posts.map((post) => {
        return (
          <Link key={post.id} href={`users/${userId}/post/${post.id}`}>
            <p className="capitalize hover:font-bold hover:text-slate-950 transition-all">
              {post.title}
            </p>
          </Link>
        );
      })}
    </div>
  );
  return (
    <div>
      {aboutUser}
      {userPost}
    </div>
  );
}

export async function generateStaticParams() {
  const gettingUser: Promise<UsersType[]> = getAllUsers();
  const userData = await gettingUser;
  return userData.map((user) => ({
    userId: user.id.toString(),
  }));
}

// menggunakan generateStaticParams pages akan dibuild SEMUA di server.
// dalam jumlah besar bisa jadi akan agak lebih lama untuk diloading
// bisa diatasi dengan loading page. Ingat ini otomatis akan force cache
// artinya setiap masuk page ini, akan dibuild semuanya, berulang2

// generateStaticParams bisa mengembalikan array of objects karena kalau hanya satu itu namanya page doang
