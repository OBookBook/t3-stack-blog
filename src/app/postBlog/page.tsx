"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const PostBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const discriptionRef = useRef<HTMLTextAreaElement>(null);

  // [文法] const { mutate: postBlog } = api.post.postBlog.useMutation({
  const postBlog = api.post.postBlog.useMutation({
    onSuccess: () => {
      if (titleRef.current) titleRef.current.value = "";
      if (discriptionRef.current) discriptionRef.current.value = "";
      router.push("/");
      router.refresh();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postBlog.mutate({
      title: titleRef.current?.value ?? "",
      description: discriptionRef.current?.value ?? "",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">T3</span> App Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-800"
              htmlFor="title"
            >
              タイトル
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="title"
              type="text"
              placeholder="タイトルを入力"
              ref={titleRef}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-800"
              htmlFor="description"
            >
              説明
            </label>
            <textarea
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="description"
              placeholder="説明を入力"
              ref={discriptionRef}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700 focus:outline-none"
              type="submit"
            >
              投稿する
            </button>
            <Link
              href="/"
              className="inline-block align-baseline text-sm font-bold text-orange-500 hover:text-orange-800"
            >
              キャンセル
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PostBlog;
