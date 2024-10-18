import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface feedResponseType {
  [key: string]: {
    date: string;
    link: string;
    title: string;
    writer: string;
  };
}

export const useApiParseBlog = () => {
  const blogParser = () => {
    const res = axios
      .get("https://raw.githubusercontent.com/klmhyeonwoo/klmhyeonwoo/main/data/feed.json")
      .then((res) => res.data as feedResponseType);
    return res;
  };

  return useQuery({ queryKey: ["blog"], queryFn: () => blogParser() });
};
