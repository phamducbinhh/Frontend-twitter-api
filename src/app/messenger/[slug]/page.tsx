import MessengerModule from "@/modules/chat";

type Params = Promise<{ slug: string }>;
type SearchParams = { [key: string]: string | string[] | undefined };
export default async function ChatMessengerPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const { receiver_id } = await searchParams;

  return <MessengerModule slug={slug} receiver_id={receiver_id} />;
}
