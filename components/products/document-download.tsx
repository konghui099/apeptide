interface Document {
  type: "COA" | "SDS" | "TDS";
  label: string;
  downloadUrl: string;
}

interface DocumentDownloadProps {
  documents: Document[];
}

const documentIcons: Record<string, string> = {
  COA: "Certificate of Analysis",
  SDS: "Safety Data Sheet",
  TDS: "Technical Data Sheet",
};

const documentColors: Record<string, string> = {
  COA: "bg-emerald-600 hover:bg-emerald-700",
  SDS: "bg-amber-600 hover:bg-amber-700",
  TDS: "bg-sky-600 hover:bg-sky-700",
};

export default function DocumentDownload({ documents }: DocumentDownloadProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {documents.map((doc) => (
        <a
          key={doc.type}
          href={doc.downloadUrl}
          download
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-colors ${documentColors[doc.type]}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {doc.label || documentIcons[doc.type]}
        </a>
      ))}
    </div>
  );
}
