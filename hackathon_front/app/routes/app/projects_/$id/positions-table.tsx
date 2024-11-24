import { Skeleton } from '~/components/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '~/components/table';
import { Position } from '~/types';
import { PositionRow } from './position-row';

function PositionsTable({
  positions,
  isOwner,
}: {
  positions: Position[];
  isOwner: boolean;
}) {
  const filteredPositions = positions;

  return (
    <Table className="border-t no-scrollbar">
      <TableBody>
        {filteredPositions.length > 0 &&
          filteredPositions.map((position) => (
            <PositionRow key={position.id} {...position} isOwner={isOwner} />
          ))}
      </TableBody>
      {filteredPositions.length === 0 && (
        <TableCaption className="pb-4">
          {isOwner
            ? 'No has creado posiciones en este proyecto.'
            : 'No hay posiciones disponibles en este proyecto.'}
        </TableCaption>
      )}
    </Table>
  );
}

function PositionsTableSkeleton() {
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

export { PositionsTable, PositionsTableSkeleton };
