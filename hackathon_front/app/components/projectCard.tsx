import { Project } from '~/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';
import { Link } from '@remix-run/react';
import { Button } from './button';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from './skeleton';

function ProjectCard({ id, name, description, categories }: Project) {
  if (description.length > 100) {
    description = description.slice(0, 250) + '...';
  }
  return (
    <Card className=" flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-start items-end">
        <div className="flex flex-row-reverse gap-2">
          {categories.map((category) => (
            <span
              key={category.name}
              className="bg-muted text-muted-foreground px-4 py-2 rounded-lg text-sm"
            >
              {category.name}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link
            to={`/app/projects/${id}`}
            className="flex items-center justify-center gap-2"
          >
            Ver proyecto <ChevronRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProjectCardSkeleton() {
  return (
    <Card className="h-64 flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-xl">
          <Skeleton className="w-1/2 h-12" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-full h-4 mb-1" />
          <Skeleton className="w-full h-4 mb-1" />
          <Skeleton className="w-3/4 h-4" />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Skeleton className="w-1/4 h-9" />
      </CardFooter>
    </Card>
  );
}

export { ProjectCard, ProjectCardSkeleton };
