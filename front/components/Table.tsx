import classNames from "classnames";
import type { ReactNode } from "react";

export default function Table({
  headers,
  rows,
  className,
}: {
  headers: string[];
  rows: {
    id: number | string;
    className?: string;
    cells: ReactNode[];
  }[];
  className?: string;
}) {
  return (
    <div className={classNames(className, "overflow-x-auto")}>
      <table className="min-w-full text-left text-sm table-fixed">
        <thead className="border-b-2">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-3 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={classNames("border-b last:border-b-0", row.className)}
            >
              {row.cells.map((cell, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: table cells are positional
                <td key={idx} className="whitespace-nowrap px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr className="bg-gray-100">
              <td colSpan={headers.length} className="px-6 py-3 text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
