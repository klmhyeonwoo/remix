import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Fragment } from "react";

type TLoaderData = {
  status: number;
  message: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  console.log("Action 실행");
  const body = await request.formData();
  const name = body.get("name");
  console.log(body, name);
  return redirect("/test");
};
export const loader: LoaderFunction = ({ request, params }) => {
  console.log("이 로더 함수는 해당 터미널에서만 실행이 됩니다.");

  const cookie = request.headers.get("Cookie");
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  // console.log(cookie, url, query);

  // const body = JSON.stringify({
  //   status: 200,
  //   message: "Hello World",
  // });
  //
  // return new Response(body, {
  //   headers: {
  //     "Content-Type": "applictaion/json",
  //   },
  // });

  // 위의 주석 처리가 아래 리턴문을 풀어놓은 형태이다, 리믹스에서는 아래와 같이 줄여서 표현 가능
  return json<TLoaderData>({
    status: 200,
    message: "Hello World",
  });
};

export default function Index() {
  const initialData = useLoaderData<TLoaderData>();
  return (
    <Fragment>
      <p> {JSON.stringify(initialData)} </p>
      <Form method="post">
        <input type="text" placeholder="아무 내용이나 입력해보삼" name="name" />
        <button type="submit"> 전송 </button>
      </Form>
    </Fragment>
  );
}
