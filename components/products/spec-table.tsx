interface SpecItem {
  label: string;
  value: string;
}

interface SpecTableProps {
  specs: SpecItem[];
}

export default function SpecTable({ specs }: SpecTableProps) {
  return (
    <div className="w-full overflow-hidden border border-slate-200 rounded-lg">
      <table className="w-full">
        <tbody>
          {specs.map((spec, index) => (
            <tr
              key={spec.label}
              className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}
            >
              <td className="px-4 py-3 text-sm font-medium text-slate-700 border-r border-slate-200">
                {spec.label}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
