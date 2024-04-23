"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const mainMenu = [
  {
    url: "/",
    name: "정보 수정",
  },
  {
    url: "/dev/main",
    name: "개발자 전용",
  },
];

const Menu = () => {
  const pathname = usePathname();

  React.useEffect(() => {
    const isDarkMode = window.navigator.userAgent.includes("{isDark property}");
    document.documentElement.setAttribute("color-theme", isDarkMode ? "dark" : "light");

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", (e) => {
      document.documentElement.setAttribute("color-theme", e.matches ? "dark" : "light");
    });
    return () => mediaQueryList.removeEventListener("change", () => {});
  }, []);

  return (
    <nav className="px-4 w-full border-b border-text/10 flex flex-row justify-around">
      {
        mainMenu.map((item, index) => {
          const isCurrentPage = pathname.split("/")[1] === item.url.split("/")[1];
          return (
            <Link
              key={index} 
              href={item.url}
              className={[
                "w-full text-center py-3 text-sm font-semibold hover:text-text/100 transition-colors",
                isCurrentPage && pathname.split("/").length === 2 ? "border-b-2 border-primary" : "",
                isCurrentPage ? "text-text/100" : "text-text/40",
              ].join(" ")}
              prefetch={true}
            >
              {item.name}
            </Link>
          );
        })
      }
    </nav>
  );
};

export default Menu;