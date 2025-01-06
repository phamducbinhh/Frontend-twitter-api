import EmailVerification from "@/modules/verify/EmailVerification";

type SearchParams = { [key: string]: string | string[] | undefined };
export default async function EmailVerifications({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const token = searchParams.token as string;
  let status: "loading" | "success" | "error" = "loading";

  try {
    // Giả lập xác minh email (thay bằng API thực tế của bạn)
    if (!token) {
      throw new Error("No verification token provided");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Giả lập xử lý
    status = "success";
  } catch (error) {
    console.error(error);
    status = "error";
  }
  return <EmailVerification token={token} status={status} />;
}
