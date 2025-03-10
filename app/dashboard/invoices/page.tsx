import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';

export default async function Page(props: {
    searchParams?: Promise<{ query: string; page: string }>,
}) {
    const searchParams = await props.searchParams;
    /**
     * <Search> es un componente Client Side Rendering (CSR), por lo que se usa useSearchParams() 
     * para obtener los parámetros de búsqueda de la URL del cliente.
     * <Table> es un componente Server Side Rendering (SSR), que se renderiza en el servidor y
     * se envía al cliente como HTML. Por lo tanto, se usa 'props.searchParams' para obtener los 
     * parámetros de búsqueda de la URL del servidor.
     * Como regla general si se quiere leer los parámetros de búsqueda de la URL en un componente
     * CSR, se debe usar useSearchParams() evitando así regresar al servidor. 
     * Si se quiere leer los parámetros de búsqueda de la URL en un componente SSR, se debe usar
     *  'props.searchParams'.
    */

    // searchParams is an object with two properties: query and page.
    // query is the search term entered by the user.
    // page is the current page number.

    const query = searchParams?.query || '';
    // query is the search term entered by the user.
    // If searchParams is null, query is an empty string.

    const currentPage = Number(searchParams?.page) || 1;
    // currentPage is the current page number.
    // If searchParams is null, currentPage is 1.

    const totalPages = await fetchInvoicesPages(query);
    // totalPages is the total number of pages of invoices.


    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>

            {<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>}


            <div className="mt-5 flex w-full justify-center">
                {<Pagination totalPages={totalPages} />}
            </div>
        </div>
    );
}

/* Suspense is a React component that allows you to suspend rendering while waiting for data to load.
In this case, we are using Suspense to show a loading skeleton while the invoices table is loading.
The key prop on Suspense is used to force the component to re-render when the query or page changes.
This ensures that the table is updated with the new search results when the user enters a new search
term or navigates to a new page. The fallback prop on Suspense is used to show the loading skeleton
while the table is loading.
In this case, we are showing the InvoicesTableSkeleton component as the loading skeleton.
The Table component is rendered inside Suspense, so the loading skeleton is shown while the table is loading.
The Table component is passed the query and currentPage as props.
query is the search term entered by the user. currentPage is the current page number. */
