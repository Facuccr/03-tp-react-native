import { useState, useEffect } from "react";

export default function ClienteForm({
  onSubmit,
  personajes,
  cliente,
  onClose,
}) {
  const [form, setForm] = useState({
    nombre: "",
    problema: "",
    estado: "pendiente",
    direccion: "",
    trabajador: "",
    imagen: "",
  });

  useEffect(() => {
    if (cliente) setForm(cliente);
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-in fade-in duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl space-y-6 transform animate-in zoom-in-95 duration-200"
      >
        {/* header */}
        <div className="text-center mb-2">
          <h2 className="text-3xl font-black text-white tracking-tight">
            {cliente ? "Editar Registro" : "Nuevo Cliente"}
          </h2>
          <p className="text-slate-400 text-sm">Completa los datos del caso</p>
        </div>

        <div className="space-y-4">
          {/* INPUTS*/}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
              Nombre del Cliente
            </label>
            <input
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-600"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Desmond"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
              Descripción del Problema
            </label>
            <textarea
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-600 min-h-[80px]"
              name="problema"
              value={form.problema}
              onChange={handleChange}
              placeholder="¿Por qué no puede sonreír?"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
                Estado
              </label>
              <select
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all cursor-pointer"
                name="estado"
                value={form.estado}
                onChange={handleChange}
              >
                <option value="pendiente"> Pendiente</option>
                <option value="en_proceso"> En proceso</option>
                <option value="resuelto"> Resuelto</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
                Ubicación
              </label>
              <input
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-600"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Dirección"
              />
            </div>
          </div>

          {/* asignacion de trabajadores */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-3 ml-1 text-center">
              Asignar Especialista de Smiling Friends
            </label>
            <div className="flex justify-center gap-4 py-2">
              {personajes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    setForm({ ...form, trabajador: t.imagen, imagen: t.imagen })
                  }
                  className={`relative group transition-all duration-300 ${
                    form.trabajador === t.imagen
                      ? "scale-110"
                      : "grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={t.imagen}
                    alt={t.nombre}
                    className={`w-14 h-14 rounded-2xl object-cover border-2 shadow-lg transition-all ${
                      form.trabajador === t.imagen
                        ? "border-blue-500 ring-4 ring-blue-500/20"
                        : "border-slate-700"
                    }`}
                  />
                  {form.trabajador === t.imagen && (
                    <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full p-0.5">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/*botones de accion */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/30 transition-all active:scale-95"
          >
            {cliente ? "Guardar Cambios" : "Asignar trabajo"}
          </button>
        </div>
      </form>
    </div>
  );
}
