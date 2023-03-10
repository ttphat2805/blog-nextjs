import { IBlogDetail, IBlogPost } from "@/types/blogType";
import { disscussionGraphQL, disscussionGraphQLDetail } from "./graphql";

const API_URL = "https://api.github.com/graphql";
const GH_ACCESS_TOKEN = process.env.TOKEN_GITHUB;
const DISCUSSION_CATEGORY_ID = process.env.DISCUSSION_CATEGORY_ID;

export async function getBlogs(): Promise<IBlogPost[]> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: disscussionGraphQL(DISCUSSION_CATEGORY_ID),
    }),
  });

  let res = await response.json();
  const discussions = res.data?.repository.discussions.nodes;
  const posts = discussions?.map((discussion: any) => {
    const {
      title,
      author,
      createdAt,
      number: id,
      bodyHTML: html,
      bodyText,
      labels,
      url: discussionUrl,
    } = discussion;

    const url = `/blog/${id}`;
    const {
      url: authorUrl,
      login: authorName,
      avatarUrl: authorAvatar,
    } = author;

    const tags: string[] = labels.nodes.map((tag: { name: string }) => {
      return tag.name;
    });

    const post = {
      id,
      url,
      discussionUrl,
      title,
      createdAt,
      html,
      bodyText,
      tags,
      author: { url: authorUrl, name: authorName, avatar: authorAvatar },
    };

    return post;
  });
  return posts;
}

export async function getBlogDetail(blogId: number): Promise<IBlogDetail> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: disscussionGraphQLDetail(blogId),
    }),
  });

  let res = await response.json();
  const discussion = res.data?.repository.discussion;

  const {
    author: { url: authorUrl, login: authorName, avatarUrl: authorAvatar },
    createdAt,
    title,
    bodyHTML: html,
  } = discussion;

  const detail = {
    author: { url: authorUrl, name: authorName, avatar: authorAvatar },
    createdAt,
    title,
    html,
  };

  return detail;
}
