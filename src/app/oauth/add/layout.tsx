import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "계정 추가하기 :: 디미고인 계정 센터",
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => children;

export default Layout;