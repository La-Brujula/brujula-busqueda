import { Container } from '@/shared/layout/container';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Navbar } from '@/shared/navigation/navbar';
import { Footer } from '@/shared/navigation/footer';

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
      {import.meta.env.DEV && (
        <>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </>
      )}
    </>
  ),
});
