import { useFetcher } from '@remix-run/react';
import { Check, X } from 'lucide-react';
import { Button } from '~/components/button';
import { PositionStatus } from '~/components/position-status';
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
import { Application, Position } from '~/types';

function PostulationsTable({
  applications,
  positions,
  projectId,
}: {
  applications: Application[];
  positions: Position[];
  projectId: number;
}) {
  const positionIndex: Record<number, Position> = {};
  positions.map((position) => {
    positionIndex[position.id] = position;
  });

  const applicationsWithPosition = applications.map((application) => {
    return {
      ...application,
      position: positionIndex[application.position_id],
    } as Application & { position: Position };
  });

  return (
    <Table className="border-t no-scrollbar">
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Motivacion</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-end w-10"></TableHead>
          <TableHead className="text-end w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicationsWithPosition.length > 0 &&
          applicationsWithPosition.map((application) => (
            <PostulationRow
              key={application.id}
              {...application}
              projectId={projectId}
            />
          ))}
      </TableBody>
      {applications.length === 0 && (
        <TableCaption className="pb-4">
          Nadie ha postulado a tu proyecto.
        </TableCaption>
      )}
    </Table>
  );
}

function PostulationsTableSkeleton() {
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

function PostulationRow({
  id,
  person,
  motivation,
  status,
  projectId,
  position,
}: Application & {
  projectId: number;
  position: Position;
}) {
  const rejectFetcher = useFetcher({
    key: 'reject',
  });
  const acceptFetcher = useFetcher({
    key: 'accept',
  });

  return (
    <TableRow>
      <TableCell>{person.name}</TableCell>
      <TableCell>{position.name}</TableCell>
      <TableCell>{motivation}</TableCell>
      <TableCell>
        <PositionStatus status={status} />
      </TableCell>
      {status === 'pending' && (
        <>
          <TableCell className="text-end w-10">
            <rejectFetcher.Form
              method="post"
              action={`/app/projects/${projectId}/postulation`}
            >
              <input type="hidden" name="status" value="rejected" />
              <input type="hidden" name="applicationId" value={id} />
              <Button size="icon" variant={'destructive'}>
                <X />
              </Button>
            </rejectFetcher.Form>
          </TableCell>
          <TableCell className="text-end w-10">
            <acceptFetcher.Form
              method="post"
              action={`/app/projects/${projectId}/postulation`}
            >
              <input type="hidden" name="status" value="accepted" />
              <input type="hidden" name="applicationId" value={id} />
              <Button
                size="icon"
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                <Check />
              </Button>
            </acceptFetcher.Form>
          </TableCell>
        </>
      )}
    </TableRow>
  );
}

export { PostulationsTable, PostulationsTableSkeleton };
