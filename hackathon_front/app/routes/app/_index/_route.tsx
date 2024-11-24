import { Link } from '@remix-run/react';
import { Button } from '~/components/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/card';

export default function Page() {
  return (
    // center the card in the middle of the screen

    <div className="absolute inset-0 flex items-center justify-center">
      <Card>
        <CardHeader className="text-center">
          <img src="/logo.svg" alt="Elephorum" className="w-52 mx-auto" />

          <CardTitle className="text-6xl text-primary">Elephorum</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p className="text-center w-2/3">
            Comienza a interactuar con la comunidad unviersitaria mas grande de
            latinoamerica. Encuentra proyectos, colaboradores y mucho mas.
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-4 w-full ">
          <Button asChild className="w-1/5">
            <Link to="./my-projects">Mis proyectos</Link>
          </Button>
          <Button asChild className="w-1/5">
            <Link to="./projects">Encontrar proyectos</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
