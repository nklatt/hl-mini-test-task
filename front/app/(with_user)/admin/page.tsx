import { ButtonLink } from "@/components/ButtonLink";
import { H2 } from "@/components/Headings";

export default function AdminPage() {
  return (
    <div>
      <H2>Admin</H2>
      <ButtonLink href="/admin/courses">Courses</ButtonLink>
    </div>
  );
}
