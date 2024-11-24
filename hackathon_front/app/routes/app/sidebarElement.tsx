import { Link, useLocation } from '@remix-run/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/tooltip';

type SidebarElementProps = {
  children?: React.ReactNode;
  to: string;
  content: string;
};

function SidebarElement({ children, to, content }: SidebarElementProps) {
  const location = useLocation();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            prefetch="intent"
            className={
              'flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-10 md:w-10 ' +
              (location.pathname === to
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground')
            }
          >
            {children}
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-secondary text-secondary-foreground"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { SidebarElement };
