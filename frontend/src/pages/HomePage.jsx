import { useEffect, useState, useCallback } from "react";
import ClienteCard from "../components/ClienteCard";
import Loading from "../components/Loading";
import FilterBar from "../components/FilterBar";
import ClienteForm from "../components/ClienteForm";
import useFilter from "../hooks/useFilter";
import { useClientes } from "../hooks/useClientes";

const HomePage = () => {
  // estado global
  const { clientes, dispatch } = useClientes();

  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [clienteEdit, setClienteEdit] = useState(null);

  const { query, setQuery, filtered } = useFilter(clientes);

  //get
  const getClientes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/clientes");
      const data = await res.json();

      dispatch({ type: "SET_CLIENTES", payload: data.data });

      const per = await fetch("http://localhost:3000/api/personajes");
      const perData = await per.json();
      setPersonajes(perData.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getClientes();
  }, [getClientes]);

  // DELETE
  const handleDelete = useCallback(
    async (id) => {
      await fetch(`http://localhost:3000/api/cliente/remove/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "DELETE_CLIENTE", payload: id });
    },
    [dispatch],
  );

  // RESOLVE
  const handleResolve = useCallback(
    async (id) => {
      const res = await fetch(
        `http://localhost:3000/api/cliente/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado: "resuelto" }),
        },
      );

      const updated = await res.json();

      dispatch({
        type: "UPDATE_CLIENTE",
        payload: updated.data,
      });
    },
    [dispatch],
  );

  // EDIT
  const handleEdit = useCallback((cliente) => {
    setClienteEdit(cliente);
    setShowForm(true);
  }, []);

  // SUBMIT
  const handleSubmit = useCallback(
    async (data) => {
      if (clienteEdit) {
        const res = await fetch(
          `http://localhost:3000/api/cliente/update/${clienteEdit.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
        );

        const updated = await res.json();

        dispatch({
          type: "UPDATE_CLIENTE",
          payload: updated.data,
        });
      } else {
        const res = await fetch("http://localhost:3000/api/cliente", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const nuevo = await res.json();

        dispatch({
          type: "ADD_CLIENTE",
          payload: nuevo.data,
        });
      }

      setShowForm(false);
      setClienteEdit(null);
    },
    [clienteEdit, dispatch],
  );
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-pink-500/30">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />

      <main className="relative max-w-6xl mx-auto px-4 py-12">
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
            className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition"
          >
            <span className="mr-2 text-xl">+</span>
            Registrar Caso
          </button>
        </header>

        {/* filtro*/}
        <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl mb-8">
          <FilterBar query={query} onChange={setQuery} />
        </div>

        <section className="relative min-h-[400px]">
          {error ? (
            <div className="text-center py-20 text-red-400">
              Error de conexión
              <button onClick={getClientes}>Reintentar</button>
            </div>
          ) : loading ? (
            <Loading />
          ) : filtered.length > 0 ? (
            <ClienteCard
              data={filtered}
              onDelete={handleDelete}
              onResolve={handleResolve}
              onEdit={handleEdit}
            />
          ) : (
            <p className="text-center py-20 text-slate-500">No hay clientes</p>
          )}
        </section>
      </main>

      {/* modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
          <ClienteForm
            personajes={personajes}
            cliente={clienteEdit}
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
