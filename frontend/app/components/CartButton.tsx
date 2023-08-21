import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

async function getCartCount() {
  const session = await getServerSession(authOptions);
  if (session) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    if (!res.ok) throw new Error(`${res.status}: Failed to fetch cart count`);
    const data = await res.json();
    return data.page.totalElements;
  }
  return 0;
}

export default async function CartButton() {
  const cartCount = await getCartCount();
  return (
    <div className="ml-4 flow-root lg:ml-6">
      <a className="group -m-2 flex items-center p-2" href="#">
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {cartCount}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </a>
    </div>
  );
}
