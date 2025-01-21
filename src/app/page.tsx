import Link from "next/link";
import { clearConfigCache } from "prettier";
import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const allBlogs = await api.post.getAllBlogs();
  console.log(allBlogs);

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App Blog
          </h1>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allBlogs.map((blog) => (
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                key={blog.id}
                href={`/blog/${blog.id}`}
              >
                <h3 className="text-2xl font-bold">{blog.title}</h3>
                <div className="text-lg">{blog.description}</div>
                <span className="text-base text-gray-400">
                  {blog.createdAt.toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>

          {/* <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>
          <LatestPost /> */}

          <div className="mt-12 text-center">
            <Link
              href={"/postBlog"}
              className="rounded-md bg-[hsl(280,100%,70%)] px-6 py-2 font-medium"
            >
              POST
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
