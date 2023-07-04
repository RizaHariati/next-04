import getAllUsers from "@/lib/getAllUsers";
import { UsersType } from "@/type";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Users Page",
  description: "this is the list of all users",
};

export default async function UsersIndex() {
  const gettingUser: Promise<UsersType[]> = getAllUsers();
  const userData = await gettingUser;

  const userList = (
    <div className="mt-5">
      {userData.map((user: UsersType) => {
        return (
          <div key={user.id}>
            <Link href={`/users/${user.id}`}>
              <p>{user.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
  return (
    <div className=" max-w-2xl mx-auto bg-stone-300 h-full rounded-md p-10">
      <h1>Users Index</h1>
      {userList}
    </div>
  );
}
