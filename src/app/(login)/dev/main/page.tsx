"use client";

import React from "react";

import Insider from "@/provider/insider";

import Menu from "../menu";

const Outing = () => {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Menu />
      <Insider>
        <article className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">디미고인 Oauth 개발 이용 안내</h1>
          <article className={[
            "flex flex-row gap-2 bg-white rounded border border-text/10 p-5",
            loading ? "loading_background" : "",
          ].join(" ")}>
            <p className="text-text/50 w-full text-center">기능 추가 예정입니다.</p>
          </article>
        </article>
      </Insider>
    </>
  );
};

export default Outing;