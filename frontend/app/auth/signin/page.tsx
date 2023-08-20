import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";

import SignInButton from "./SignInButton";

export default async function SignIn() {
  const providers = await getProvidersData();
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
        {Object.values(providers).map((provider) => {
          if (provider.name === "Keycloak") {
            provider.name = "Email and Password";
          }
          return (
            <div key={provider.name}>
              <SignInButton provider={provider} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

async function getProvidersData() {
  const session = await getServerSession(authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return providers ?? [];
}
