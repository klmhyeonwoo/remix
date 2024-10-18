import { css } from "@emotion/react";

import { feedProps } from "@/app/main";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

export default function ArticleCard({ date, link, title, writer }: feedProps) {
  return (
    <article
      css={css`
        background-color: ${DESIGN_SYSTEM_COLOR.greyBackground};
        border-radius: 1.1rem;
        padding: 2rem;
        cursor: pointer;
        color: ${DESIGN_SYSTEM_COLOR.grey800};
        transition: 0.4s all;
        min-height: 12rem;

        display: flex;
        flex-direction: column;

        &:hover {
          transform: translateY(-1rem);
          background-color: ${DESIGN_SYSTEM_COLOR.kreamBlack};
          color: white;
        }
      `}
      onClick={() => window.open(link)}
    >
      <div
        css={css`
          font-size: 1.5rem;
          font-weight: 500;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          line-height: 2.3rem;
        `}
      >
        {title}
      </div>
      <div
        css={css`
          margin-top: auto;
          display: flex;
          flex-direction: column;
          row-gap: 1rem;
        `}
      >
        <div
          css={css`
            font-size: 1.3rem;
          `}
        >
          {writer}
        </div>
        <div
          css={css`
            font-size: 1.3rem;
            font-weight: 400;
          `}
        >
          {date}
        </div>
      </div>
    </article>
  );
}
