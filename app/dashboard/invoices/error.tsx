'use client';
// Debe ser un archivo de cliente para que funcione en el navegador.
// Componente error sirve para manejar y mostrar errores en la aplicación.
// Se muestra un mensaje de error y un botón para intentar recuperarse del error.

import { useEffect } from 'react';

export default function Error({
    // Propiedad 'error' es un objeto que contiene información sobre el error. Es una Instancia del objeto de JS "Error.
    // Propiedad 'reset' es una función que se llama para intentar recuperarse del error.
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center">Se cayó el sistema wn!</h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    );
}

/**
El código seleccionado es un componente funcional de React escrito en TypeScript. Este componente se llama `Error` y está diseñado para 
manejar y mostrar errores en una interfaz de usuario. El componente comienza con la declaración `'use client';`, que es una directiva
específica de Next.js para indicar que este archivo debe ser tratado como un componente del lado del cliente. Luego, se importa el 
hook `useEffect` de React, que se utiliza para manejar efectos secundarios en componentes funcionales.

El componente `Error` recibe dos props: `error` y `reset`. La prop `error` es un objeto de tipo `Error` que puede tener una propiedad
opcional `digest`. La prop `reset` es una función que se utiliza para intentar recuperar el estado de la aplicación.

Dentro del hook `useEffect`, se registra el error en la consola del navegador cada vez que el valor de `error` cambia. 
Esto es útil para el seguimiento y la depuración de errores. El componente retorna un elemento `main` que contiene un mensaje de
error y un botón. El mensaje de error es un encabezado (`h2`) que dice "Something went wrong!". El botón tiene algunas clases de 
Tailwind CSS para el estilo y un evento `onClick` que llama a la función `reset` cuando se hace clic en él. Esto permite al usuario
intentar recuperar el estado de la aplicación re-renderizando la ruta de las facturas.

En resumen, este componente `Error` proporciona una interfaz de usuario básica para manejar errores, mostrando un mensaje y permitiendo 
al usuario intentar una recuperación mediante un botón.
*/