import BlogHeader from "@/components/BlogHeader";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React from "react";
import { getBlogDetail } from "../../../server/blogs";
import parse from "html-react-parser";
import "./id.module.css";
const BlogDetail: NextPage = ({
  blogData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { author, html, createdAt, title } = blogData;
  return (
    <section className="layout">
      <div className="max-w-[50%]">
        <h1 className="text-center my-10 text-[2rem] font-bold"> {title} </h1>
        <div className="flex justify-center mb-4">
          <BlogHeader createdAt={createdAt} author={author} />
        </div>
        <div className="customBlog">{parse(html)}</div>
      </div>
    </section>
  );
};

export default BlogDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const route: string[] | string | undefined = context.query.id;
  const id: number = Number(route);
  let blogDetail = await getBlogDetail(id);

  return {
    props: {
      blogData: blogDetail,
    },
  };
};
