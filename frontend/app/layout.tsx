import type { Metadata } from "next";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CartButton, Account } from "@/app/components";
import { PropsWithChildren, FC } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Generated by create next app",
  title: "Create Next App",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <div className="bg-white">
        <header className="relative bg-white">
          <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            Get free delivery on orders over $100
          </p>

          <nav
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            aria-label="Top"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link href="/">
                    <span className="sr-only">Your Company</span>
                    <img
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      className="h-8 w-auto"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="ml-auto flex items-center">
                  <Account />

                  {/* Search */}
                  <div className="flex lg:ml-6">
                    <a
                      className="p-2 text-gray-400 hover:text-gray-500"
                      href="#"
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                  <CartButton />
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </body>
  </html>
);

export default RootLayout;
