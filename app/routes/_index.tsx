import { css } from "@emotion/react";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import { blogParser, feedResponseType, useApiParseBlog } from "@/api/parser.ts";
import FeeedLogo from "@/assets/feeed-black.svg?react";
import FeeedBox from "@/assets/feeed-box.png";
import ArticleCard from "@/component/common/ArticleCard.tsx";
import { loadingFade } from "@/style/keyframes.ts";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

export interface feedProps {
  title: string;
  link: string;
  date: string;
  writer: string;
}

export const loader: LoaderFunction = async () => {
  const feedLoaderData = await blogParser();
  return json({ feedLoaderData });
};

export default function Main() {
  const { feedLoaderData } = useLoaderData<typeof loader>();
  const { data, isSuccess, isLoading } = useApiParseBlog({ initialData: feedLoaderData as feedResponseType });
  const [feedData, setFeedData] = useState<feedProps[]>([]);
  function convertDate(dateText: string) {
    // 원본 날짜 텍스트
    // 날짜 포맷 분석
    const dateParts = dateText.split(" ");
    const month = dateParts[0];
    const day = dateParts[1].replace(",", "");
    const year = dateParts[2];

    // 월 이름을 숫자로 변환
    const monthMap: { [index: string]: number } = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };
    const monthNumber = monthMap[month];

    // 새 포맷으로 변환
    const newDateText = `${year}년 ${monthNumber}월 ${day}일`;
    return newDateText;
  }

  useEffect(() => {
    if (isSuccess) {
      const feed: feedProps[] = [];
      Object.keys(data).forEach((i) => {
        feed.push({
          date: convertDate(data[i].date),
          title: data[i].title,
          link: data[i].link,
          writer: data[i].writer,
        });
      });
      setFeedData(feed);
    }
  }, [isSuccess]);

  return (
    <section
      css={css`
        max-width: 130rem;
        width: 100%;
        height: 100%;

        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 0 auto;

        @media screen and (max-width: 1024px) {
          /* 타블렛 가로 */
          grid-template-columns: 1fr;
        }
        @media screen and (max-width: 899px) {
          /* 모바일 가로, 타블렛 세로 */
          grid-template-columns: 1fr;
        }

        @media screen and (max-width: 599px) {
          /* 모바일 세로 */
          grid-template-columns: 1fr;
        }
      `}
    >
      <article
        css={css`
          position: relative;
        `}
      >
        <img
          src={FeeedBox}
          css={css`
            width: 18rem;
            height: auto;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 60%;

            @media screen and (max-width: 1024px) {
              /* 타블렛 가로 */
              margin-bottom: 20rem;
            }
            @media screen and (max-width: 899px) {
              /* 모바일 가로, 타블렛 세로 */
              width: 13rem;
            }
          `}
        />
        <FeeedLogo
          css={css`
            width: 16rem;
            height: auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            @media screen and (max-width: 899px) {
              /* 모바일 가로, 타블렛 세로 */
              width: 11rem;
            }
          `}
        />
        <div
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            transform: translate(-50%, -50%);
            margin-top: 13rem;

            display: flex;
            flex-direction: column;
            row-gap: 1rem;
            text-align: center;

            @media screen and (max-width: 899px) {
              /* 모바일 가로, 타블렛 세로 */
              margin-top: 11rem;
            }
          `}
        >
          <div>
            <span
              css={css`
                color: ${DESIGN_SYSTEM_COLOR.kreamBlack};
              `}
            >
              현재
              <span
                css={css`
                  color: ${DESIGN_SYSTEM_COLOR.blue500};
                  font-weight: 500;
                `}
              >
                {" 10명"}
              </span>
              의 개발자들이 피드에 블로그를 등록했어요
            </span>
          </div>
          <div
            css={css`
              span {
                font-weight: 400;
                color: ${DESIGN_SYSTEM_COLOR.grey400};
              }
            `}
          >
            <span
              css={css`
                cursor: pointer;
              `}
              onClick={() => window.open("https://ripe-launch-04b.notion.site/feeed-0232a8f9d9724a4ea9bc244c1eeba78b?pvs=4")}
            >
              블로그 등록 방법이 궁금하신가요?
            </span>
          </div>
        </div>
      </article>
      <article
        css={css`
          position: relative;
        `}
      >
        <div
          css={css`
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 4rem;
            box-sizing: border-box;

            @media screen and (max-width: 1024px) {
              /* 모바일 세로 */
              padding: 1.3rem;
            }
          `}
        >
          <div
            css={css`
              display: grid;
              flex-direction: column;
              row-gap: 2rem;

              @media screen and (max-width: 899px) {
                /* 모바일 가로, 타블렛 세로 */
                row-gap: 0rem;
              }
            `}
          >
            <span
              css={css`
                color: ${DESIGN_SYSTEM_COLOR.grey500};
              `}
            >
              게시된 테크 아티클
            </span>
            <div
              css={css`
                display: grid;
                grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
                row-gap: 2rem;
                column-gap: 2rem;
                padding: 2rem 0 2rem 0;
                overflow-y: auto;
                height: calc(100vh - 2rem);
                position: relative;
              `}
            >
              {isLoading && (
                <FeeedLogo
                  css={css`
                    animation: ${loadingFade} 2s infinite;
                    filter: opacity(0.4) grayscale(1);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 13rem;
                    height: auto;
                  `}
                />
              )}
              {feedData.map((feed) => {
                return <ArticleCard key={feed.link} title={feed.title} link={feed.link} date={feed.date} writer={feed.writer} />;
              })}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
