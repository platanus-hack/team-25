import { useSearchParams } from '@remix-run/react';
import { Tabs, TabsList, TabsTrigger } from '~/components/tabs';

function ProjectTypeTab() {
  const [, setSearchParams] = useSearchParams();

  return (
    <Tabs defaultValue="received">
      <TabsList>
        <TabsTrigger
          onClick={() => {
            setSearchParams((prev) => {
              prev.delete('type');
              return prev;
            });
          }}
          value="received"
        >
          Dueño
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setSearchParams((prev) => {
              prev.set('type', 'member');
              return prev;
            });
          }}
          value="sent"
        >
          Miembro
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export { ProjectTypeTab };
