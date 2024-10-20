import { PropsWithChildren } from "react";

export default function Button({ children, ...props }: PropsWithChildren) {
  return <button {...props}>{children}</button>;
}
