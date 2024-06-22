import { ObjectId } from "mongodb";

const clients = [
  {
    "_id": new ObjectId("661f3ae926aa65d7d37f4dbd"),
    "name": "디풀 (개발용)",
    "redirect": [
      "http://localhost:3000/auth"
    ],
    "get": [
      "id",
      "email",
      "gender",
      "name",
      "number",
      "type",
      "profile_image"
    ],
    "owner": "65d0a7932893e7ba99634e08"
  }
];

export default clients;
