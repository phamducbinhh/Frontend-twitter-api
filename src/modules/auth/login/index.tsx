"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import { useToast } from "@/hooks/use-toast";
import { useLoginMutation } from "@/queries/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema xác thực với zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginModule() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginMutation = useLoginMutation();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await loginMutation.mutateAsync(data);
      const { status, data: responseData } = response;

      if (status === HttpStatusCode.Ok) {
        router.push("/");
        toast({
          description: "Login successfully",
        });
      } else {
        const errorMessage = responseData?.message;
        toast({
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              className="w-full bg-black border-zinc-700 text-white"
              disabled={isLoading}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>

            <Button
              variant="outline"
              className="w-full bg-black border-zinc-700 text-white"
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
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {/* Email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email" className="text-zinc-400">
                      Email or username
                    </Label>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        className="bg-black border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password" className="text-zinc-400">
                      Password
                    </Label>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        disabled={isLoading}
                        className="bg-black border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button */}
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
          </Form>

          <Link href={"/forgot-password"}>
            <Button
              variant="link"
              className="w-full text-blue-500 hover:text-blue-600"
              disabled={isLoading}
            >
              Forgot password?
            </Button>
          </Link>

          <p className="text-zinc-400 text-center">
            Don&apos;t have an account?{" "}
            <Link href={"/register"}>
              <Button
                variant="link"
                className="text-blue-500 hover:text-blue-600 p-0"
                disabled={isLoading}
              >
                Sign up
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
