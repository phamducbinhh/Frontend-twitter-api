import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";

interface EmailVerificationProps {
  token: string | null;
  status: "loading" | "success" | "error";
}

export default function EmailVerification({ status }: EmailVerificationProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-lg text-center text-muted-foreground">
                Verifying your email address...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-lg text-center text-green-600 font-medium">
                Email verified successfully!
              </p>
              <p className="text-center text-muted-foreground mt-2">
                You can now access all features of your account.
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-12 w-12 text-red-500 mb-4" />
              <p className="text-lg text-center text-red-600 font-medium">
                Verification failed
              </p>
              <p className="text-center text-muted-foreground mt-2">
                The verification link may have expired or is invalid.
              </p>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Link href={status === "success" ? "/" : "/"}>
            <Button variant={status === "error" ? "destructive" : "default"}>
              {status === "success" ? "Go to Dashboard" : "Back to Home"}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
