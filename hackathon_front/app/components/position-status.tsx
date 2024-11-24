import { Badge } from './badge';
import type { ApplicationStatus } from '~/types';

type PositionStatusProps = {
  status: ApplicationStatus;
};

const statusClasses = {
  pending: 'bg-yellow-300 text-foreground hover:bg-yellow-400',
  declined: '',
  accepted: 'bg-emerald-500 hover:bg-emerald-600',
  rejected: 'bg-red-600 hover:bg-red-700',
};

function PositionStatus({ status }: PositionStatusProps) {
  return <Badge className={statusClasses[status]}>{status}</Badge>;
}

export { PositionStatus };
