//lista de pjs
const personajes = [
  {
    id: 1,
    nombre: "Charlie",
    imagen: "/img/trabajadores/charlie.png",
  },
  {
    id: 2,
    nombre: "Pim",
    imagen: "/img/trabajadores/pim.png",
  },
  {
    id: 3,
    nombre: "Alan",
    imagen: "/img/trabajadores/alan.png",
  },
  {
    id: 4,
    nombre: "Glep",
    imagen: "/img/trabajadores/glep.png",
  },
];

// para prueba
// obt tdos
export const getPersonajes = (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: "Personajes obtenidos",
    data: personajes,
  });
};

//obtener por id
export const getPersonajeById = (req, res) => {
  const { personajeId } = req.params;

  const personaje = personajes.find((p) => p.id == personajeId);

  if (!personaje) {
    return res.status(404).json({
      ok: false,
      msg: "Personaje no encontrado",
    });
  }

  return res.status(200).json({
    ok: true,
    msg: "Personaje encontrado",
    data: personaje,
  });
};
