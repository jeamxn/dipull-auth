import { ObjectId } from "mongodb";

export type ClientData = {
  name: string;
  redirect: string[];
}

export type ClientDataDB = ClientData & {
  _id: ObjectId;
}