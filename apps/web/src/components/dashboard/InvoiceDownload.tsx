"use client";

import { couplePeople } from "@/components/dashboard/BiodataSheet";
import { invoicePdf } from "@/lib/invoice-pdf";
import "./invoice-download.css";

export function InvoiceDownload() {
  function download() {
    const blob = invoicePdf(couplePeople.map((person) => person.name));
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.pdf";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="invoice-download">
      <button type="button" onClick={download}>Unduh invoice</button>
      <p>PDF dibuat di peramban dan tidak dikirim. Nilai belum terhubung.</p>
    </div>
  );
}
