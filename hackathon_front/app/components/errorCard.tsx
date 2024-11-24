import { Link, useNavigate } from '@remix-run/react';
import { Card, CardContent, CardFooter } from './card';
import { Button } from './button';
import { ArrowLeftCircle, Home } from 'lucide-react';

function ErrorCard({
  error,
}: {
  error: {
    status: number;
    statusText: string;
  };
}) {
  const navigate = useNavigate();

  return (
    <Card className="w-1/2">
      <CardContent className="flex flex-col items-center justify-center mb-4">
        <img src="/error.png" alt="Imagen de error" className="w-1/3" />
        <pre className="text-2xl font-light">
          {error.status} - {error.statusText}
        </pre>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-4">
        <Button asChild className="w-32" variant="outline">
          <Link to="/app" className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            Inicio
          </Link>
        </Button>
        <Button
          className="flex items-center gap-2 w-32"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Volver atras
        </Button>
      </CardFooter>
    </Card>
  );
}

export { ErrorCard };
