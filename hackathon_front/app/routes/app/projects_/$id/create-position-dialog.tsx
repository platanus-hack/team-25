import { Label } from '@radix-ui/react-dropdown-menu';
import { useFetcher } from '@remix-run/react';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/dialog';
import { Input } from '~/components/input';
import { Textarea } from '~/components/textarea';

function CreatePositionDialog({ project_id }: { project_id: number }) {
  const fetcher = useFetcher({
    key: 'apply',
  });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [vacancies, setVacancies] = useState(0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Crear rol <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Crear Rol</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Rol</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <Label>Descripción</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <Label>Vacantes</Label>
          <Input
            id="vacancies"
            type="number"
            value={vacancies}
            onChange={(e) => setVacancies(+e.target.value)}
            className="input"
          />
        </div>
        <DialogFooter className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button variant={'outline'}>Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                setDescription('');
                setName('');
                setVacancies(0);
                fetcher.submit(
                  {
                    name,
                    description,
                    vacancies,
                  },
                  {
                    method: 'POST',
                    action: `/app/projects/${project_id}`,
                  }
                );
              }}
            >
              Crear
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { CreatePositionDialog };
