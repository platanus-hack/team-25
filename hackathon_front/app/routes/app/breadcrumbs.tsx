import { Link, useLocation } from '@remix-run/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/breadcrumb';

const pathsMap = {
  'my-projects': 'Mis proyectos',
  projects: 'Proyectos',
  new: 'Nuevo',
  'my-applications': 'Mis postulaciones',
} as {
  [key: string]: string;
};

function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.slice(1).split('/'); // removes /app from the path

  if (paths.length <= 1) {
    return <div />;
  }

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {paths.map((path, index) => {
          if (index === paths.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage key={index}>
                  {pathsMap[path] || path.at(0)!.toUpperCase() + path.slice(1)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return (
            <>
              <BreadcrumbItem key={index + path}>
                <BreadcrumbLink asChild>
                  <Link to={'/' + paths.slice(0, index + 1).join('/')}>
                    {pathsMap[path] ||
                      path.at(0)!.toUpperCase() + path.slice(1)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export { Breadcrumbs };
