import { ResetPasswordModule } from "@/modules/reset-password";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function ResetPasswordPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const token = searchParams?.token as string;
  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password below to reset your password
          </p>
        </div>
        <ResetPasswordModule token={token} />
      </div>
    </div>
  );
}
