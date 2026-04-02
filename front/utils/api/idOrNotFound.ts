import { notFound } from "next/navigation";

export default function idOrNotFound(id: string) {
  const idNumber = Number.parseInt(id, 10);
  if (!idNumber) {
    return notFound();
  }
  return idNumber;
}
