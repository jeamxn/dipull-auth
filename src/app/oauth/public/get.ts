import { NextResponse } from "next/server";

const GET = async (
  req: Request,
) => {
  // 헤더 설정
  const new_headers = new Headers();
  new_headers.append("Content-Type", "text/plain; charset=utf-8");

  return new NextResponse(`-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEApCUqT939eBSLGgjRoe/g
+TWA7L4JFTa9SJz4iuMJNnB4FZrLObFfahFPgS2qAszrGH1QJibzhHfbGsAcAUYM
m1IFjSljkbgkop0mr2xh7pTHfo4neKSYSPu/llvyiY/RtR2VelyVSqJegZ9l5qHG
4isRoIXFcGxNIfFmATZlBjKiNnwriBR64BJX82qHExWuSjqO72IZT7ptV3NvcdYw
tJI1+pSWGA6FXUdLhq8w2STXs2uOSz5IfRJ6gyqcQo4cvWjh1T1gcUS3EcLtoLuS
jIr+BmeZi00pNq7eT734ePypfGh0pqXS+sI3TsuCAfSPtRqrqBSscbGBdBO+Vkk5
0daHTzvSwOym2Rb91ki1WL5EQSbCvxI4si8CJStQv2WsliYPKqufdHgMOwn5GP/H
MQvoQ/Zb2mmvDqWjb0LlDtK8NdTjWWIrlVuXqaddN6/bvBKUdXldR7UC0CJwoPCj
hz5d6iC9YL6g5jl+fJv9Gk5BHcNfW7Nq0pgoIuELrIE8XpwwQyjOucigs2OAC+ho
k8WZNHIgWmxdiDlwOPWUxfIiTOPHOA1vU35YGQkA9glb/daJI2a6fbU6cLnp+xmP
nfRlWhoKlGF0qTLDrKca7VjRWPDJwagAdvmktr/kpi4a/cBVgbnZ5KI+XlYnlUI6
AWzeSHot5kj+K7ZlX44h9uMCAwEAAQ==
-----END PUBLIC KEY-----
`, 
  {
    headers: new_headers,
  });
};

export default GET;