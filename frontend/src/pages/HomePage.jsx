import { useEffect, useState } from "react";
import ClienteCard from "../components/ClienteCard";
import Loading from "../components/Loading";
import FilterBar from "../components/FilterBar";
import ClienteForm from "../components/ClienteForm";
import useFilter from "../hooks/useFilter";

const HomePage = () => {
  const [clientes, setClientes] = useState([]);
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [clienteEdit, setClienteEdit] = useState(null);

  const { query, setQuery, filtered } = useFilter(clientes);

  const getClientes = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/clientes");
      const data = await res.json();
      setClientes(data.data);

      const per = await fetch("http://localhost:3000/api/personajes");
      const perData = await per.json();
      setPersonajes(perData.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/cliente/remove/${id}`, {
      method: "DELETE",
    });
    getClientes();
  };

  const handleResolve = async (id) => {
    await fetch(`http://localhost:3000/api/cliente/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: "resuelto" }),
    });
    getClientes();
  };

  const handleEdit = (cliente) => {
    setClienteEdit(cliente);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    if (clienteEdit) {
      await fetch(
        `http://localhost:3000/api/cliente/update/${clienteEdit.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
    } else {
      await fetch("http://localhost:3000/api/cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    setShowForm(false);
    setClienteEdit(null);
    getClientes();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-pink-500/30">
      {/* decoracion de fondo*/}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />

      <main className="relative max-w-6xl mx-auto px-4 py-12">
        {/* encabezado */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Smiling Friends{" "}
              <span className="text-yellow-400 font-normal text-3xl">=)</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-md">
              Panel de control para la gestión de clientes y resolución de
              crisis emocionales.
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(true);
              setClienteEdit(null);
            }}
            className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20"
          >
            <span className="mr-2 text-xl">+</span>
            Registrar Caso
          </button>
        </header>

        {/* barra de herrmientas*/}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-center gap-4 shadow-xl">
          <div className="w-full">
            <FilterBar query={query} onChange={setQuery} />
          </div>
        </div>

        {/* area del contenido*/}
        <section className="relative min-h-[400px]">
          {error ? (
            <div className="flex flex-col items-center justify-center py-20 bg-red-500/5 border border-red-500/20 rounded-3xl">
              <div className="text-red-400 text-5xl mb-4">⚠</div>
              <h3 className="text-xl font-semibold text-red-200">
                Error de conexión
              </h3>
              <p className="text-red-400/70">
                No se pudo conectar con la API de Smiling Friends.
              </p>
              <button
                onClick={getClientes}
                className="mt-4 text-sm underline hover:text-red-200"
              >
                Reintentar
              </button>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loading />
              <p className="mt-4 text-slate-500 animate-pulse">
                Consultando archivos...
              </p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              <ClienteCard
                data={filtered}
                onDelete={handleDelete}
                onResolve={handleResolve}
                onEdit={handleEdit}
              />
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
              <p className="text-slate-500 text-lg">
                No se encontraron clientes.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl transform transition-all animate-in zoom-in-95 duration-200">
            <ClienteForm
              personajes={personajes}
              cliente={clienteEdit}
              onSubmit={handleSubmit}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
