import { TableCell, TableRow } from '~/components/table';
import { Position } from '~/types';
import { PositionDialog } from './position-dialog';

type PositionRowProps = Position & {
  isOwner: boolean;
};

function PositionRow({
  name,
  applications_count,
  vacancies,
  description,
  id,
  project_id,
  isOwner,
  has_vacancies_left,
}: PositionRowProps) {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell className="text-end w-10">
        {((!isOwner && has_vacancies_left) || isOwner) && (
          <PositionDialog
            name={name}
            applications_count={applications_count}
            vacancies={vacancies}
            description={description}
            id={id}
            project_id={project_id}
            created_at={''}
            updated_at={''}
            isOwner={isOwner}
            has_vacancies_left={has_vacancies_left}
          />
        )}
      </TableCell>
    </TableRow>
  );
}

export { PositionRow };
