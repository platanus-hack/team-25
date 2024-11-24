import { Label } from '@radix-ui/react-dropdown-menu';
import { useFetcher } from '@remix-run/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/dialog';
import { Textarea } from '~/components/textarea';

import { Position } from '~/types';

function PositionDialog({
  id,
  name,
  description,
  vacancies,
  applications_count,
  project_id,
  isOwner,
}: Position & {
  isOwner: boolean;
}) {
  const fetcher = useFetcher({
    key: 'apply',
  });
  const [motivation, setMotivation] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'icon'} className="p-1.5">
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">{name}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>
          <p>
            Vacantes disponibles:{' '}
            <span className="font-medium">{vacancies}</span>
          </p>
          <p>
            Postulados:{' '}
            <span className="font-medium">{applications_count}</span>
          </p>
        </div>
        {!isOwner && (
          <div>
            <Label className="text-lg italic text-muted-foreground font-light">
              Por que quieres postular?
            </Label>
            <Textarea
              id="motivation"
              className="h-32"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
            />
          </div>
        )}
        <DialogFooter className="flex gap-4 justify-start items-start">
          <DialogClose asChild>
            <Button className="w-1/2" variant={'outline'}>
              Cancelar
            </Button>
          </DialogClose>
          {!isOwner && (
            <Button
              className="w-1/2"
              onClick={() => {
                fetcher.submit(
                  {
                    motivation,
                    positionId: id,
                  },
                  {
                    method: 'POST',
                    action: `/app/projects/${project_id}/apply`,
                  }
                );
              }}
            >
              Postular
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { PositionDialog };
