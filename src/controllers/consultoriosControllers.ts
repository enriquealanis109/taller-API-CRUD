import type { Response, Request } from "express";
import { type Consultorios, consultorios } from "../data/consultorios.ts";

let idCounter = consultorios.length > 0 ? Math.max(...consultorios.map(c => c.id ?? 0)) + 1 : 1;

export function traerTodosLosConsultorios(req: Request, res: Response) {
  return res.status(200).json({
    ok: true,
    mensaje: "La lista de todos los consultorios",
    data: consultorios,
  });
}

export function traerUnConsultorio(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let consultorioEncontrado = consultorios.find(
    (e: Consultorios) => e.id === idBuscado,
  );

  if (!consultorioEncontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: "CONSULTORIO NO ENCONTRADO O NO EXISTE",
    });
  }
  
  return res.status(200).json({
    ok: true,
    mensaje: "El consultorio fue encontrado con exito",
    data: consultorioEncontrado,
  });
}

export function crearConsultorio(req: Request, res: Response) {
  const { numeroSala, piso, activo, tipoAtencion } = req.body;

  const nuevoConsultorio: Consultorios = {
    id: idCounter++,
    numeroSala,
    piso,
    activo,
    tipoAtencion,
  };

  consultorios.push(nuevoConsultorio);

  return res.status(201).json({
    ok: true,
    mensaje: "Consultorio creado con éxito",
    data: nuevoConsultorio,
  });
}

export function actualizarConsultorio(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let indiceEncontrado = consultorios.findIndex(
    (c: Consultorios) => c.id === idBuscado
  );

  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "El consultorio que deseas actualizar NO EXISTE",
    });
  }

  const { numeroSala, piso, activo, tipoAtencion } = req.body;
  const actual = consultorios[indiceEncontrado];

  consultorios[indiceEncontrado] = {
    id: idBuscado,
    numeroSala: numeroSala ?? actual?.numeroSala,
    piso: piso ?? actual?.piso,
    activo: activo ?? actual?.activo,
    tipoAtencion: tipoAtencion ?? actual?.tipoAtencion,
  };

  return res.status(200).json({
    ok: true,
    mensaje: "Consultorio actualizado con éxito",
    data: consultorios[indiceEncontrado],
  });
}

export function eliminarConsultorio(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let indiceEncontrado = consultorios.findIndex(
    (c: Consultorios) => c.id === idBuscado
  );

  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "El consultorio que deseas eliminar NO EXISTE",
    });
  }

  consultorios.splice(indiceEncontrado, 1);

  return res.status(200).json({
    ok: true,
    mensaje: "Consultorio eliminado con éxito",
  });
}