export default function DisplayName({
  first,
  last,
}: {
  first: string;
  last: string;
}) {
  return (
    <span>
      {first} {last}
    </span>
  );
}
