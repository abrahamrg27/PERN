/*import { sumar } from "./server.ts";

console.log("desde index.ts");

console.log("si llego el cambio");
//sumar();*/

// Importas el servidor que creaste en el otro archivo
import server from './server'; // (Asegúrate de que la ruta y extensión sean las correctas)

const port = Number(process.env.PORT) || 4000;

server.listen(port, () => {
    console.log(`rest api on port ${port}`);
    console.log("escuchando desde la ruta");
    console.log(`localhost:${port}`);
});