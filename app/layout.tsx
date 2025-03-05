// Componentes importados:

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

/*
Este archivo define una estructura (layout) compartida entre múltiples páginas dentro de la misma carpeta.
Es útil para elementos comunes como barras de navegación, pies de página o diseños que no cambian al navegar entre páginas.
Recibe un children prop, que es el contenido de las páginas (como page.tsx) que se renderizan dentro del layout. 
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  className={`${inter.className}} antialiased`}>{children}</body>
    </html>
  );
}