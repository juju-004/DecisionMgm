"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useContext, useState, useTransition } from "react";
import { toast } from "sonner";
import { UserContext } from "../../../hooks/Context";

export const metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignInViewPage() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const [loading, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    startTransition(() => {
      setLoad(true);
      setUser(email);
      router.push(`/dashboard`);
      toast.success("Signed In Successfully!");
    });
  };

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Decision Support System <br /> for Environmental Protection
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This software helps track weather conditions as well as
              natural hazards and warns on how to be safe.&rdquo;
            </p>
            <footer className="text-sm">&copy; All rights reserved</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <form onSubmit={onSubmit} className="w-full space-y-2">
            <div className="mb-2 space-y-2 lg:mb-0">
              <Input
                type="email"
                placeholder="Enter your email..."
                disabled={loading}
                value={email}
                required
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div className="mb-4 space-y-2 lg:mb-0">
              <Input
                type="password"
                placeholder="Enter your password..."
                disabled={loading}
                value={password}
                required
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button disabled={loading} className="ml-auto w-full" type="submit">
              {load ? "Signing in" : "Continue"}
            </Button>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
