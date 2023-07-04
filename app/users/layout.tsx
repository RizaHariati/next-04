import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className=" bg-stone-100 h-full min-h-screen w-full w2x p-10">
      {children}
    </div>
  );
};

export default layout;
