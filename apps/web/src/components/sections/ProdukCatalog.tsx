"use client";

import { useDeferredValue, useId, useMemo, useRef, useState } from "react";
import { CatalogCard } from "@/components/sections/CatalogCard";
import type { CatalogProduct } from "@/lib/catalog-format";

export function ProdukCatalog({ products }: { products: CatalogProduct[] }) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const needle = deferredQuery.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!needle) return products;
    return products.filter((item) => matchesProduct(item, needle));
  }, [needle, products]);

  const countLabel = new Intl.NumberFormat("id-ID").format(filtered.length);

  function openSearch() {
    inputRef.current?.focus();
  }

  return (
    <div className="produk-catalog">
      <form
        className="produk-search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          openSearch();
        }}
      >
        <label className="produk-search-field" htmlFor={inputId}>
          <span className="produk-search-label">Cari produk</span>
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            name="q"
            value={query}
            placeholder="Nama, venue, kategori, atau jumlah tamu"
            autoComplete="off"
            enterKeyHint="search"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button type="submit" className="produk-search-button">
          Cari
        </button>
      </form>

      <p className="produk-search-status" aria-live="polite">
        {needle
          ? filtered.length > 0
            ? `${countLabel} paket cocok dengan “${deferredQuery.trim()}”.`
            : `Tidak ada paket untuk “${deferredQuery.trim()}”.`
          : null}
      </p>

      {filtered.length > 0 ? (
        <ul className="catalog-grid" aria-label="Hasil katalog produk">
          {filtered.map((item) => (
            <li key={item.slug}>
              <CatalogCard item={item} />
            </li>
          ))}
        </ul>
      ) : needle ? (
        <p className="produk-search-empty">
          Coba kata lain, misalnya hotel, lamaran, atau jumlah tamu.
        </p>
      ) : null}
    </div>
  );
}

function matchesProduct(item: CatalogProduct, needle: string) {
  const haystack = [
    item.name,
    item.category,
    item.description ?? "",
    item.pax ? `${item.pax} pax` : "",
    item.paxAkad ? `${item.paxAkad} pax` : "",
    ...item.includes,
  ]
    .join(" ")
    .toLowerCase();

  return needle.split(/\s+/).every((part) => haystack.includes(part));
}
