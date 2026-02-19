interface DataTableProps {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export function DataTable({ caption, headers, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border border-black/10 text-body-sm">
        {caption && (
          <caption className="text-caption text-[#4a555e] text-left mb-2">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-black/[0.03]">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left py-3 px-4 text-body-sm font-semibold text-black border-b border-black/10"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-black/5">
              {row.map((cell, j) => (
                <td key={j} className="py-3 px-4 text-[#4a555e]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
