import { emailVerification } from "@/lib/action/user.action";
import EmailVerification from "@/modules/verify/EmailVerification";

type SearchParams = { [key: string]: string | string[] | undefined };

async function fetchVerifyEmail<T>(body: any): Promise<T | null> {
  return (await emailVerification({ body })) as Promise<T>;
}

export default async function EmailVerifications(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const token = searchParams?.token as string;
  let status: "loading" | "success" | "error" = "loading";

  if (token) {
    const response = await fetchVerifyEmail({ email_verify_token: token });
    const { success } = response as { success: boolean };
    if (success) {
      status = "success";
    } else {
      status = "error";
    }
  }
  return <EmailVerification token={token} status={status} />;
}
