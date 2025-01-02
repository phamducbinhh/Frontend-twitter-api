"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left side with large X logo */}
      <div className="flex-1 items-center justify-center hidden lg:flex">
        <Icons.xLogo className="w-64 h-64 text-white" />
      </div>

      {/* Right side with login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <Icons.xLogo className="w-10 h-10 text-white lg:hidden" />
            <h1 className="text-3xl font-bold">Sign in to X</h1>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full bg-black hover:bg-zinc-900 border-zinc-700 text-white"
              disabled={isLoading}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>

            <Button
              variant="outline"
              className="w-full bg-black hover:bg-zinc-900 border-zinc-700 text-white"
              disabled={isLoading}
            >
              <Icons.apple className="mr-2 h-4 w-4" />
              Sign in with Apple
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-zinc-500">Or</span>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-400">
                  Email or username
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="bg-black border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-400">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  disabled={isLoading}
                  className="bg-black border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-blue-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-zinc-200"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in
              </Button>
            </form>

            <Button
              variant="link"
              className="w-full text-blue-500 hover:text-blue-600"
              disabled={isLoading}
            >
              Forgot password?
            </Button>
          </div>

          <p className="text-zinc-400 text-center">
            Don&apos;t have an account?{" "}
            <Button
              variant="link"
              className="text-blue-500 hover:text-blue-600 p-0"
              disabled={isLoading}
            >
              Sign up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
