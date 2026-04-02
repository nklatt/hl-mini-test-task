import Header from "@/components/Header";
import { requireUserTokenFromCookies } from "@/utils/getUserToken";

export default async function WithUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userToken = await requireUserTokenFromCookies();

  return (
    <div>
      <Header user={userToken} />
      <div className="max-w-4xl mx-auto px-4 pb-6">{children}</div>
    </div>
  );
}
