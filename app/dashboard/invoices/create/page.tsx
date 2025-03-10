import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
    // Fetch customers data: esta función se encarga de obtener los datos de los clientes, 
    // en este caso, se está utilizando una función asincrónica.


    const customers = await fetchCustomers();
    // customers: es un array que contiene los datos de los clientes.
    // fetchCustomers: es una función que se encarga de obtener los datos de los clientes.

    return (
        <main>
            <Breadcrumbs
                // Breadcrumbs: es un componente que se encarga de mostrar la ruta de navegación.
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Create Invoice',
                        href: '/dashboard/invoices/create',
                        active: true,
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}