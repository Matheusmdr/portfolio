import { useSession } from "next-auth/react";
import { UserNav } from "./components/UserNav";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AdminHeader() {
  const { data } = useSession();
  return (
    <div className="border-b bg-white dark:bg-black">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserNav user={data?.user} />
        </div>
      </div>
    </div>
  );
}
