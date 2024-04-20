"use client";

import Link from "next/link";
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
            <Link 
              href="https://docs.dimigo.net/oauth"
              target="_blank"
              className="w-full"
            >
              <p className="text-primary w-full text-center underline">여기서 개발 문서를 참고해주세요.</p>
            </Link>
          </article>
        </article>
      </Insider>
    </>
  );
};

export default Outing;