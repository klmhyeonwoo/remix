import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { feedProps } from "@/types/feed";

export interface feedResponseType {
  [key: string]: {
    date: string;
    link: string;
    title: string;
    writer: string;
  };
}

export const blogParser = () => {
  const res = axios.get("https://raw.githubusercontent.com/klmhyeonwoo/klmhyeonwoo/main/data/feed.json").then((res) => res.data as feedResponseType);
  return res;
};

export const useApiParseBlog = ({ initialData }: { initialData: feedResponseType }) => {
  return useQuery({ queryKey: ["blog"], queryFn: () => blogParser(), initialData: initialData });
};
