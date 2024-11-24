import { Skeleton } from '~/components/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/table';
import { Application } from '~/types';
import { ApplicationRow } from './applications-row';

function ApplicationsTable({ applications }: { applications: Application[] }) {
  return (
    <Table className="border-t no-scrollbar">
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead>Rol</TableHead>
          <TableHead>Motivacion</TableHead>
          <TableHead>Tiempo desde postulacion</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.length > 0 &&
          applications.map((application) => (
            <ApplicationRow key={application.id} {...application} />
          ))}
      </TableBody>
      {applications.length === 0 && (
        <TableCaption className="pb-4">
          No hay vacantes disponibles
        </TableCaption>
      )}
    </Table>
  );
}

function ApplicationsTableSkeleton() {
  return (
    <Table className="border-t">
      <TableBody>
        {[...Array(10)].map((_, index) => (
          <TableRow key={index}>
            {Array.from({ length: 6 }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton className="h-8" key={index} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { ApplicationsTable, ApplicationsTableSkeleton };
