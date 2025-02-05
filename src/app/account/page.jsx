import { auth } from "@/lib/auth";

export const metadata = {
  title: "Account",
};

async function Page() {
  const session = await auth();

  const firstName = session.user.name.split(" ").at(0);
  return (
    <div>
      <h2>Welcome, {firstName}</h2>
    </div>
  );
}

export default Page;
