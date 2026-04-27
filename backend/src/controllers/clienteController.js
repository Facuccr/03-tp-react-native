import { Cliente } from "../models/cliente.js";

// crear cliente
export const createCliente = async (req, res) => {
  try {
    const { nombre, problema } = req.body;

    if (!nombre || !problema) {
      return res.status(400).json({
        ok: false,
        msg: "Nombre y problema son obligatorios",
      });
    }

    const newCliente = await Cliente.create(req.body);

    return res.status(201).json({
      ok: true,
      msg: "cliente creado con exito",
      data: newCliente,
    });
  } catch (err) {
    console.error("Error creando cliente", err);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// listar clientes
export const getClientes = async (req, res) => {
  try {
    const { estado } = req.query;

    const where = estado ? { estado } : {};

    const clientes = await Cliente.findAll({
      where,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return res.status(200).json({
      ok: true,
      msg: "clientes encontrados:",
      data: clientes,
    });
  } catch (err) {
    console.error("Error trayendo clientes", err);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// obt cliente por id
export const getClienteById = async (req, res) => {
  try {
    const { clienteId } = req.params;

    const cliente = await Cliente.findByPk(clienteId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!cliente) {
      return res.status(404).json({
        ok: false,
        msg: "Cliente no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "Cliente encontrado",
      data: cliente,
    });
  } catch (err) {
    console.error("Error trayendo cliente", err);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

//act cliente
export const updateCliente = async (req, res) => {
  try {
    const { clienteId } = req.params;

    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      return res.status(404).json({
        ok: false,
        msg: "Cliente no encontrado",
      });
    }

    await Cliente.update(req.body, { where: { id: clienteId } });

    const updatedCliente = await Cliente.findByPk(clienteId);

    return res.status(200).json({
      ok: true,
      msg: "Cliente actualizado con éxito",
      data: updatedCliente,
    });
  } catch (err) {
    console.error("Error actualizando cliente", err);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// eliminar cliente
export const removeCliente = async (req, res) => {
  try {
    const { clienteId } = req.params;

    const cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      return res.status(404).json({
        ok: false,
        msg: "Cliente no encontrado",
      });
    }

    await Cliente.destroy({ where: { id: clienteId } });

    return res.status(410).json({
      ok: true,
      msg: "Cliente eliminado de la base de datos",
    });
  } catch (err) {
    console.error("Error eliminando cliente", err);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
