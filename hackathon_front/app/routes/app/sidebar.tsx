import { Link } from '@remix-run/react';
import {
  FileUser,
  GraduationCap,
  PackageSearch,
  Settings,
  SquareChartGantt,
  X,
} from 'lucide-react';
import { SidebarElement } from './sidebarElement';

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex h-full">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/app"
          prefetch="intent"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-10 md:w-10 md:text-base"
        >
          <GraduationCap className="h-6 w-6 transition-all group-hover:scale-110" />
        </Link>
        <SidebarElement to="/app/projects" content="Encontrar proyecto">
          <PackageSearch className="h-6 w-6" />
        </SidebarElement>
        <SidebarElement to="/app/my-projects" content="Mis Proyectos">
          <SquareChartGantt className="h-6 w-6" />
        </SidebarElement>
        <SidebarElement to="/app/my-applications" content="Mis Aplicaciones">
          <FileUser className="h-6 w-6" />
        </SidebarElement>
      </nav>
      {/* <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <SidebarElement to="/web/settings" content="Settings">
          <Settings className="h-6 w-6" />
        </SidebarElement>
      </nav> */}
    </aside>
  );
}
