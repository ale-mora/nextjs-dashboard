'use client';
// 'use cliente' is a directive to use the client-side version of the file.
// This file is shared between the client and the server, but the client-side version
// is the one that is used in the browser. Con ello puedes usar hooks y componentes (event listeners, etc.)
// que solo funcionan en el cliente.

// Este componente es un input de busqueda que se renderiza en la barra de navegacion.
// El input de busqueda permite a los usuarios buscar productos en la tienda.
// El componente recibe un placeholder como prop que se muestra en el input de busqueda.
// Cuando el usuario escribe en el input de busqueda, el componente actualiza el query parameter en la URL con el nuevo valor.
// El componente usa el searchParams hook para obtener los query parameters de la URL.
// El componente usa el pathname hook para obtener la ruta actual.
// El componente usa el useRouter hook para navegar a una nueva URL.
// El componente usa el handleSearch function para actualizar el query parameter en la URL.
// El componente usa el onChange event handler para detectar cambios en el input de busqueda.
// El componente usa el defaultValue prop para establecer el valor inicial del input de busqueda.
// El componente usa el MagnifyingGlassIcon para mostrar un icono de lupa en el input de busqueda.
// Permite que la URL se actualice con el nuevo valor de busqueda cuando el usuario escribe en el input de busqueda, sin recargar la pagina.
// Esto significa que el usuario puede buscar productos sin perder el estado de la pagina y sin tener que recargar la pagina.


import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


export default function Search({ placeholder }: { placeholder: string }) {

  const searchParams = useSearchParams();
  // useSearchParams is a custom hook that returns the query parameters in the URL as an object.
  // It is used to get the query parameters from the URL.

  const pathname = usePathname();
  // usePathname is a custom hook that returns the current pathname of the URL.
  // It is used to get the current path of the URL.

  const { replace } = useRouter();
  // useRouter is a custom hook that returns the router object.
  // It is used to navigate to a new URL.


  // Esta función actualiza el query parameter en la URL con el nuevo valor.
  /* function handleSearch(term: string) {
    console.log(`Searching for: ${term}`);
    // Aqui se actualiza la url en cada cambio del input de busqueda con el nuevo valor.
    // sin embargo, si se tiene una base de datos con muchos datos, se puede usar un debounce
    // para no hacer tantas peticiones. debounce es una técnica que se utiliza para limitar la frecuencia
    // con la que se ejecuta una función. Se puede usar para limitar la frecuencia con la que se actualiza
    // la URL en este caso.
   

    const params = new URLSearchParams(searchParams);
    /**
     * URLSearchParams is a built-in JavaScript class that provides an easy way to work with query parameters in a URL.
     * It allows you to get, set, and delete query parameters in a URL.
     * In this case, we are creating a new URLSearchParams object from the searchParams hook.
     * The searchParams hook returns the query parameters in the URL as an object.
     * We then use the set method of the URLSearchParams object to set the query parameter to the new value.
     * If the term is empty, we delete the query parameter from the URL.
    if (term) {
      params.set('query', term)
      // set() method sets the value of the specified search parameter to the given value. 'query' is the key and term is the value.
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    // replace() method replaces the current URL with a new URL. It takes a string as an argument.
    // The new URL is constructed by combining the current pathname with the query parameters.
  }
  */
  // ...// ...


  // Inside the Search Component...
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return ( // Aqui se renderiza el input de busqueda
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input // This is the search input field
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => { handleSearch(e.target.value) }}
        /** On the input field, we have an onChange event handler, written as an arrow function.
         * 'e' is the event object that is passed to the event handler.
         * e.target is the input field itself.
         * e.target.value is the value of the input field.
         * The onChange event handler is called whenever the value of the input field changes.
         * The event handler calls the handleSearch function with the new value of the input field.
         * The handleSearch function updates the query parameter in the URL with the new value.
         */
        // This is the event handler for the search input field (listener).
        defaultValue={searchParams.get('query')?.toString()}
      // defaultValue prop is used to set the initial value of the input field.
      // It gets the value of the query parameter from the URL and sets it as the initial value of the input field.
      /**
       * defaultValue vs. value:
       * defaultValue is used to set the initial value of the input field.
       * value is used to set the value of the input field.
       * defaultValue is used when you want to set the initial value of the input field.
       * value is used when you want to set the value of the input field.
       * If you're using state to manage the value of an input, you'd use the value attribute to make it a controlled component. 
       * This means React would manage the input's state.cvHowever, since you're not using state, you can use defaultValue. 
       * This means the native input will manage its own state. This is okay since you're saving the search query to the URL instead of state.
       */
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
