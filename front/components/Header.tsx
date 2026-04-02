import Link from "next/link";

import type { UserTokenV2 } from "@/hl-common/api/UserToken";
import { role } from "@/hl-common/PrismaEnums";

export default function Header({ user }: { user?: UserTokenV2 }) {
  return (
    <nav className="bg-white shadow-sm mb-6 px-4 py-3 flex items-center justify-between">
      <Link href="/courses" className="text-lg font-bold text-blue-600">
        Mini HealthLearn
      </Link>
      <div className="flex gap-4 items-center text-sm">
        <Link href="/courses" className="text-blue-500 hover:text-blue-800">
          Courses
        </Link>
        {user?.role === role.admin && (
          <Link
            href="/admin/courses"
            className="text-blue-500 hover:text-blue-800"
          >
            Admin
          </Link>
        )}
        <LogoutButton />
      </div>
    </nav>
  );
}

function LogoutButton() {
  return (
    <Link href="/logout" className="text-gray-500 hover:text-gray-800">
      Logout
    </Link>
  );
}
