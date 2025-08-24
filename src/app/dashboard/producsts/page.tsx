"use client";
import { useEffect, useState } from "react";
import BarcodeScannerModal from "@/components/BarcodeModal";

interface Product {
  id: number;
  name: string;
  code: string;
  price: string;
  stock: string;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    price: "",
    stock: "",
    category: "",
  });
  const [open, setOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // cargar productos con token
  useEffect(() => {
    async function loadProducts() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showMessage("⚠️ No has iniciado sesión");
          return;
        }

        const res = await fetch("/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          showMessage("❌ No autorizado o error al cargar productos");
          return;
        }

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        showMessage("❌ Error de conexión con el servidor");
      }
    }

    loadProducts();
  }, []);

  // guardar producto nuevo
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showMessage("⚠️ No tienes sesión activa");
        return;
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const { product } = await res.json();
        setProducts([product, ...products]);
        setForm({ name: "", code: "", price: "", stock: "", category: "" });
        setOpen(false);
        showMessage("✅ Producto creado con éxito");
      } else {
        const data = await res.json();
        showMessage(data.error || "❌ Error al guardar producto");
      }
    } catch (err) {
      console.error(err);
      showMessage("❌ Error de conexión");
    }
  }

  // helper mensajes
  function showMessage(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }

  // 🔎 lógica para filtrar productos (si no hay productos, devuelve [])
  const filteredProducts = (products || []).filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* mensaje flotante */}
      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      {/* buscador */}
      <input
        type="text"
        placeholder="Buscar por nombre, código o categoría..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full text-zinc-900 border p-3 rounded-lg mb-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* botón abrir formulario */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        {open ? "Cerrar formulario" : "➕ Crear Producto"}
      </button>

      {/* formulario */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[900px] mt-4" : "max-h-0"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-4 border mt-2"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ej: Coca Cola"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Código
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Escanéalo o escríbelo"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="flex-1 border p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              />
              <button
                type="button"
                onClick={() => setScannerOpen(true)}
                className="bg-purple-600 text-white px-4 rounded-md hover:bg-purple-700 transition"
              >
                📷 Escanear
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              placeholder="0"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <input
              type="text"
              placeholder="Ej: Bebidas"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition font-semibold"
          >
            Guardar Producto
          </button>
        </form>
      </div>

      {/* lista filtrada de productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500">Código: {product.code}</p>
              <p className="text-sm text-gray-700">💲 {product.price}</p>
              <p className="text-sm text-gray-700">
                📦 {product.stock} unidades
              </p>
              <p className="text-xs text-gray-400">
                Categoría: {product.category}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">No se encontraron productos.</p>
      )}

      {/* modal escáner */}
      <BarcodeScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={async (code) => {
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              showMessage("⚠️ No has iniciado sesión");
              return;
            }

            const res = await fetch(`/api/products?code=${code}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            if (res.ok && data.product) {
              const updateRes = await fetch(
                `/api/products/${data.product.id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ stock: data.product.stock + 1 }),
                }
              );

              if (updateRes.ok) {
                const updated = await updateRes.json();
                setProducts((prev) =>
                  prev.map((p) => (p.id === updated.id ? updated : p))
                );
                showMessage(
                  `✅ Stock de ${updated.name} actualizado → ${updated.stock}`
                );
              }
            } else {
              setForm((prev) => ({ ...prev, code }));
              setOpen(true);
              showMessage("⚠️ Producto no encontrado, completa el formulario.");
            }
          } catch (err) {
            console.error(err);
            showMessage("❌ Error al escanear producto");
          }
        }}
      />
    </div>
  );
}
