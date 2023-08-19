import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]/route";

async function getData() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Not Logged in");
  const res = await fetch(`${process.env.API_ENDPOINT}/carts`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">{JSON.stringify(data)}</code>
        </p>
      </div>
    </main>
  );
}
