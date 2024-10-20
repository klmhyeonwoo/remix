import { json, LoaderFunction } from "@remix-run/node";
import { useLocation, useParams } from "@remix-run/react";
import { useEffect } from "react";

export const loader: LoaderFunction = async ({ params }) => {
  const { postId } = params;
  let result;
  await fetch(`https://jsonplaceholder.typicode.com/todos/${postId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      result = data;
    });
  // console.log("게시글 아이디 : ", postId, result);
  return json({
    status: 200,
    message: postId,
  });
};
export default function DyanamicNested() {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return <div> hi, there </div>;
}
