import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export default async function Account() {
  const session = await getServerSession(authOptions);
  if (session?.user?.name)
    return (
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        <Link
          className="p-2text-sm group -m-2 flex items-center font-medium text-gray-700 hover:text-gray-800"
          href="/profile"
        >
          <UserIcon
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {session.user.name}
          </span>
        </Link>
      </div>
    );
  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      <Link
        className="text-sm font-medium text-gray-700 hover:text-gray-800"
        href="/auth/signin"
      >
        Sign in
      </Link>
      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      <Link
        className="text-sm font-medium text-gray-700 hover:text-gray-800"
        href="/auth/signin"
      >
        Create account
      </Link>
    </div>
  );
}
