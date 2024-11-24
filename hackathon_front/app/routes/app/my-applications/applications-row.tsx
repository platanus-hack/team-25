import { Form, Link } from '@remix-run/react';
import { Search, Trash2 } from 'lucide-react';
import { Button } from '~/components/button';
import { PositionStatus } from '~/components/position-status';
import { TableCell, TableRow } from '~/components/table';
import { Application } from '~/types';

function ApplicationRow({
  id,
  motivation,
  position,
  created_at,
  status,
}: Application) {
  const differenceInDays = Math.floor(
    (new Date().getTime() - new Date(created_at).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <TableRow>
      <TableCell>{position.name}</TableCell>
      <TableCell>{motivation}</TableCell>
      <TableCell>{differenceInDays}</TableCell>
      <TableCell>
        <PositionStatus status={status} />
      </TableCell>
      <TableCell className="text-end w-10">
        <Button variant={'link'}>
          <Link
            to={`/app/projects/${position.project_id}`}
            className="flex items-center gap-2 justify-center"
          >
            Ver proyecto <Search />
          </Link>
        </Button>
      </TableCell>
      <TableCell className="text-end w-10">
        {status === 'pending' && (
          <Form method="post">
            <input type="hidden" name="applicationId" value={id} />
            <Button size="icon" variant={'destructive'}>
              <Trash2 />
            </Button>
          </Form>
        )}
      </TableCell>
    </TableRow>
  );
}

export { ApplicationRow };
