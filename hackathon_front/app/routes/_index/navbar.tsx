import { Form, Link } from '@remix-run/react';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Form method="post" action="/auth/auth0">
        <button className="bg-slate-300 px-10 py-2">Login</button>
      </Form>
      <Form action="/auth/auth0?screen_hint=signup" method="post">
        <button>Register with Auth0</button>
      </Form>
    </nav>
  );
}

export { Navbar };
