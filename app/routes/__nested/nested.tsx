import { Link, Outlet, useNavigate } from "@remix-run/react";
import { Fragment, useState } from "react";

export type OutletContextType = {
  value: string;
};

/**
 * Nested Remix Test Routes File
 * If this folder address, Not Working
 * You need change folder route for testing
 * */
export default function Nested() {
  const [value, setValue] = useState("This is Parent Global Value");
  const navigate = useNavigate();

  return (
    <Fragment>
      <p> Hi, There ! This is Nested Parent File </p>
      <Link to={"/nested/1"} prefetch={"none"}>
        Go to Nested 1
      </Link>
      <Link to={"/nested/2"} prefetch={"intent"}>
        Go to Nested 2
      </Link>
      <Link to={"/nested/3"} prefetch={"render"}>
        Go to Nested 3
      </Link>
      <Link to={"/nested/4"} prefetch={"viewport"}>
        Go to Nested 4
      </Link>
      <button onClick={() => navigate("/nested/4")}>Go to Nested 4</button>
      <Outlet context={{ value }} />
    </Fragment>
  );
}
