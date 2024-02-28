import { Container } from '@/shared/layout/container';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <Container>
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  ),
});
