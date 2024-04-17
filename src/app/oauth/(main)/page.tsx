import { ObjectId } from "mongodb";
import React from "react";

import Insider from "@/provider/insider";
import { connectToDatabase } from "@/utils/db";

import GoogleLoginButton from "./googleLoginButton";
import NotFoundClient from "./notFoundClient";
import { ClientDataDB, ClientGetType } from "./type";
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
    if(!clientData.redirect.includes(searchParams.redirect.split("?")[0])) {
      return <UnmatchedRedirectUri redirect={searchParams.redirect} />;
    }

    return (
      <Insider className="flex flex-col items-center justify-center h-full">
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
            <p className="text-base font-medium">
              {
                clientData.get.length ? clientData.get.map((get, index) => {
                  if(index === 0) return ClientGetType[get];
                  return `, ${ClientGetType[get]}`;
                }) : "없음"
              }
            </p>
          </div>
          <GoogleLoginButton 
            client={searchParams.client}
            redirect={searchParams.redirect} 
          />
        </div>
      </Insider>
    );
  }
  catch {
    return <NotFoundClient client={searchParams.client} />;
  }
};

export default Oauth;