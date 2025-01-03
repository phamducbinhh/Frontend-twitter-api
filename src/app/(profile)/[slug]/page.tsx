import { getUserProfile } from "@/lib/action/user.action";
import ProfileModule from "@/modules/profile";
import { notFound } from "next/navigation";

async function fetchProfile<T>(slug: string): Promise<T | null> {
  return (await getUserProfile({ name: slug })) as Promise<T>;
}

export default async function GameProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) return notFound();

  const profile = await fetchProfile(slug);

  return <ProfileModule data={profile} />;
}
