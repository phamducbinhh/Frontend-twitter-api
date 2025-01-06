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
import { useRegisterMutation } from "@/queries/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema xác thực với zod
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(6, "Password must be at least 6 characters"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterModule() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const registerMutation = useRegisterMutation();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      date_of_birth: "",
    },
  });

  const handleSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const response = await registerMutation.mutateAsync(data);
      const { status, data: responseData } = response;

      if (status === HttpStatusCode.Created) {
        router.push("/");
        toast({
          description: "Register successfully",
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
            <h1 className="text-3xl font-bold">Sign Up to X</h1>
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
              {/* Name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name" className="text-zinc-400">
                      Name
                    </Label>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Elon musk"
                        autoCapitalize="none"
                        autoComplete="name"
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

              {/* Confirm password field */}
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="confirm_password" className="text-zinc-400">
                      Confirm password
                    </Label>
                    <FormControl>
                      <Input
                        id="confirm_password"
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

              {/* Date of birth field */}
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="date_of_birth" className="text-zinc-400">
                      Date of birth
                    </Label>
                    <FormControl>
                      <Input
                        id="date_of_birth"
                        type="date"
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
            <Link href={"/login"}>
              <Button
                variant="link"
                className="text-blue-500 hover:text-blue-600 p-0"
                disabled={isLoading}
              >
                Sign in
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
