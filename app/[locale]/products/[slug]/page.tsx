import MoleculeViewer from "@/components/3d/molecule-viewer";
import SpecTable from "@/components/products/spec-table";
import DocumentDownload from "@/components/products/document-download";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const mockProducts: Record<string, {
  name: string;
  description: string;
  specs: Array<{ label: string; value: string }>;
  documents: Array<{ type: "COA" | "SDS" | "TDS"; label: string; downloadUrl: string }>;
}> = {
  "glp-1-analog": {
    name: "GLP-1 Analog",
    description: "A potent glucagon-like peptide-1 receptor agonist for research use in metabolic studies. This synthetic peptide mimics the incretin hormone GLP-1, playing a crucial role in glucose homeostasis and appetite regulation.",
    specs: [
      { label: "Molecular Formula", value: "C147H226N40O45" },
      { label: "Molecular Weight", value: "3298.6 Da" },
      { label: "Sequence", value: "HAEGTFTSDVSSYLEGQAAKEFIAWLVKGR-NH2" },
      { label: "Purity (HPLC)", value: "≥95%" },
      { label: "Appearance", value: "White to off-white lyophilized powder" },
      { label: "CAS Number", value: "15532-75-9" },
      { label: "Storage", value: "-20°C, protected from light" },
      { label: "Solubility", value: "Water, PBS (pH 7.2)" },
      { label: "Research Grade", value: "For laboratory research only" },
    ],
    documents: [
      { type: "COA", label: "Certificate of Analysis", downloadUrl: "/docs/coa-glp-1-analog.pdf" },
      { type: "SDS", label: "Safety Data Sheet", downloadUrl: "/docs/sds-glp-1-analog.pdf" },
      { type: "TDS", label: "Technical Data Sheet", downloadUrl: "/docs/tds-glp-1-analog.pdf" },
    ],
  },
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = mockProducts[slug];

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
        <p className="text-slate-600">The product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
          <p className="text-slate-600 leading-relaxed">{product.description}</p>
        </div>
        <div>
          <MoleculeViewer />
          <p className="mt-2 text-sm text-slate-500 text-center">
            Interactive 3D structure - drag to rotate, scroll to zoom
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Specifications</h2>
        <SpecTable specs={product.specs} />
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Technical Documents</h2>
        <DocumentDownload documents={product.documents} />
      </div>

      <div className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Literature</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
            <h3 className="font-medium text-slate-900 mb-1">GLP-1 Receptor Pharmacology</h3>
            <p className="text-sm text-slate-600 mb-2">
              Comprehensive review of GLP-1 receptor signaling pathways and therapeutic potential.
            </p>
            <span className="text-xs text-slate-500">Published 2024</span>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
            <h3 className="font-medium text-slate-900 mb-1">Peptide Synthesis Methods</h3>
            <p className="text-sm text-slate-600 mb-2">
              Advanced solid-phase peptide synthesis techniques for high-purity GLP-1 analogs.
            </p>
            <span className="text-xs text-slate-500">Published 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}
