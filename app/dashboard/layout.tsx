// Importa componente llamado SideNav.
import SideNav from '@/app/ui/dashboard/sidenav';

export const experimental = true;
/*
  Layout: Es quien comparte UI (User Interface) a través de múltiples páginas. 
  Recibe "children" como argumento, que representa el contenido 
  que se renderiza dentro del layout. El componente hijo ("children") puede ser
  una página ("page.tsx") u otro layout. Eb este caso, las carpetas dentro de
  esta carpeta, serán automáticamente anidadas a este layout.
*/

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}