import { json, LoaderFunction } from "@remix-run/node";
import { Outlet, useOutletContext } from "@remix-run/react";
import { Fragment } from "react";

import { OutletContextType } from "@/routes/__nested/nested";

export const loader: LoaderFunction = ({ request, params }) => {
  console.log("이 로더 함수는 해당 터미널에서만 실행이 됩니다.");

  const cookie = request.headers.get("Cookie");
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  // 위의 주석 처리가 아래 리턴문을 풀어놓은 형태이다, 리믹스에서는 아래와 같이 줄여서 표현 가능
  return json({
    status: 200,
    message: "Hello World-1",
  });
};
export default function Nested1() {
  const { value } = useOutletContext<OutletContextType>();
  console.log(value);
  return (
    <Fragment>
      <p> This is Child Nested </p>
      {value}
      <Outlet />
    </Fragment>
  );
}
