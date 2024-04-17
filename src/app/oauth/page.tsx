import { ObjectId } from "mongodb";
import React from "react";

import Insider from "@/provider/insider";
import { connectToDatabase } from "@/utils/db";

import NotFoundClient from "./notFoundClient";
import { ClientDataDB } from "./type";
import UnmatchedRedirectUri from "./unmatchedRedirectUri";

const Oauth = async ({
  searchParams,
}: {
  searchParams: {
    client: string;
    redirect: string;
  };
}) => {
  try{
    const client = await connectToDatabase();
    const clientsCollection = client.db().collection<ClientDataDB>("clients");
    const objcet_id = ObjectId.createFromHexString(searchParams.client);
    const clientData = await clientsCollection.findOne({ _id: objcet_id });
    if(!clientData) {
      return <NotFoundClient client={searchParams.client} />;
    }
    if(!clientData.redirect.includes(searchParams.redirect)) {
      return <UnmatchedRedirectUri redirect={searchParams.redirect} />;
    }

    return (
      <Insider className="flex flex-col items-center justify-center h-[100vh]">
        <div className="bg-white rounded-xl p-6 flex flex-col gap-6 w-full max-w-[26rem]">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-text/50">디미고인 계정 센터로</p>
            <div className="flex flex-row text-xl font-semibold">
              <p className="text-primary">{clientData.name}</p>
              <p>에 로그인</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-text/50">요청한 정보</p>
            <p className="text-base font-medium">식별번호, 이름, 성별, 학번, 사용자 종류</p>
          </div>
          <button className="bg-background py-4 px-5 border border-text/5 rounded flex flex-row items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M18.8334 10.193C18.8334 9.4938 18.7766 8.98359 18.6539 8.4545H10.6701V11.6102H15.3564C15.2619 12.3944 14.7517 13.5754 13.6179 14.369L13.602 14.4747L16.1263 16.4302L16.3012 16.4477C17.9074 14.9643 18.8334 12.7818 18.8334 10.193Z" fill="#4285F4"></path>
              <path d="M10.6701 18.5069C12.9659 18.5069 14.8934 17.751 16.3012 16.4472L13.6179 14.3685C12.8998 14.8693 11.9361 15.2189 10.6701 15.2189C8.4214 15.2189 6.51287 13.7355 5.83254 11.6853L5.73281 11.6937L3.108 13.7251L3.07367 13.8205C4.47199 16.5983 7.34426 18.5069 10.6701 18.5069Z" fill="#34A853"></path>
              <path d="M5.83256 11.6851C5.65305 11.156 5.54916 10.5891 5.54916 10.0033C5.54916 9.41752 5.65305 8.85065 5.82312 8.32156L5.81836 8.20887L3.16065 6.14487L3.07369 6.18623C2.49738 7.33893 2.16669 8.63336 2.16669 10.0033C2.16669 11.3733 2.49738 12.6677 3.07369 13.8204L5.83256 11.6851Z" fill="#FBBC05"></path>
              <path d="M10.6701 4.78796C12.2668 4.78796 13.3439 5.47768 13.958 6.05406L16.3579 3.71088C14.884 2.3409 12.9659 1.5 10.6701 1.5C7.34426 1.5 4.47199 3.40853 3.07367 6.18628L5.82309 8.32161C6.51287 6.27135 8.4214 4.78796 10.6701 4.78796Z" fill="#EB4335"></path>
            </svg>
            <p className="text-sm font-medium">디미고 구글 계정으로 로그인</p>
          </button>
        </div>
      </Insider>
    );
  }
  catch {
    return <NotFoundClient client={searchParams.client} />;
  }
};

export default Oauth;