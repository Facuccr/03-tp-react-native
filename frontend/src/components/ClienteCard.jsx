export default function ClienteCard({ data, onDelete, onResolve, onEdit }) {
  const getStatusStyles = (estado) => {
    switch (estado) {
      case "resuelto":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "en proceso":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {data.map((c) => (
        <div
          key={c.id}
          className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all duration-300 hover:-translate-y-1"
        >
          {/* header */}
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <h2 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors">
                {c.nombre}
              </h2>
              <div className="flex items-center text-slate-400 text-xs">
                <span className="opacity-70 mr-1 italic">📍 {c.direccion}</span>
              </div>
            </div>

            {c.trabajador && (
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img
                  src={c.trabajador}
                  alt="Asignado"
                  className="relative w-14 h-14 rounded-2xl object-cover border-2 border-slate-700 p-0.5"
                />
              </div>
            )}
          </div>

          {/* area del problema*/}
          <div className="bg-slate-950/50 rounded-xl p-3 mb-4 border border-slate-800/50">
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "{c.problema}"
            </p>
          </div>

          {/* estado*/}
          <div className="flex items-center justify-between mt-auto pt-2">
            <span
              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${getStatusStyles(
                c.estado,
              )}`}
            >
              ● {c.estado}
            </span>

            <div className="flex gap-2">
              {/* boton "resolver"*/}
              <button
                onClick={() => onResolve(c.id)}
                title="Resolver caso"
                className="p-2 bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600 hover:text-white rounded-lg transition-all"
              >
                ✓
              </button>

              {/* boton para editar */}
              <button
                onClick={() => onEdit(c)}
                title="Editar"
                className="p-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white rounded-lg transition-all"
              >
                ✎
              </button>

              {/* boton para eliminar*/}
              <button
                onClick={() => onDelete(c.id)}
                title="Eliminar"
                className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
