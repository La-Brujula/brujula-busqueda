/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router';

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as SearchIndexImport } from './routes/search/index';
import { Route as SearchLabelImport } from './routes/search/$label';
import { Route as ProfileEditImport } from './routes/profile/_edit';
import { Route as ProfileUserIdImport } from './routes/profile/$userId';
import { Route as AuthNewPasswordImport } from './routes/auth/new-password';

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')();
const GuidesIndexLazyImport = createFileRoute('/guides/')();
const ContactIndexLazyImport = createFileRoute('/contact/')();
const AboutIndexLazyImport = createFileRoute('/about/')();
const SearchCategoryLazyImport = createFileRoute('/search/category')();
const AuthSignupLazyImport = createFileRoute('/auth/signup')();
const AuthResetPasswordLazyImport = createFileRoute('/auth/reset-password')();
const AuthLogoutLazyImport = createFileRoute('/auth/logout')();
const AuthLoginLazyImport = createFileRoute('/auth/login')();
const AuthDeleteAccountLazyImport = createFileRoute('/auth/delete-account')();
const ProfileEditSummaryLazyImport = createFileRoute(
  '/profile/_edit/summary'
)();
const ProfileEditStandOutLazyImport = createFileRoute(
  '/profile/_edit/stand-out'
)();
const ProfileEditContactLazyImport = createFileRoute(
  '/profile/_edit/contact'
)();
const ProfileEditCharacteristicsLazyImport = createFileRoute(
  '/profile/_edit/characteristics'
)();
const ProfileEditBasicLazyImport = createFileRoute('/profile/_edit/basic')();
const ProfileEditAreasLazyImport = createFileRoute('/profile/_edit/areas')();

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route));

const GuidesIndexLazyRoute = GuidesIndexLazyImport.update({
  path: '/guides/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/guides/index.lazy').then((d) => d.Route));

const ContactIndexLazyRoute = ContactIndexLazyImport.update({
  path: '/contact/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/contact/index.lazy').then((d) => d.Route)
);

const AboutIndexLazyRoute = AboutIndexLazyImport.update({
  path: '/about/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about/index.lazy').then((d) => d.Route));

const SearchIndexRoute = SearchIndexImport.update({
  path: '/search/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/search/index.lazy').then((d) => d.Route));

const SearchCategoryLazyRoute = SearchCategoryLazyImport.update({
  path: '/search/category',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/search/category.lazy').then((d) => d.Route)
);

const AuthSignupLazyRoute = AuthSignupLazyImport.update({
  path: '/auth/signup',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/signup.lazy').then((d) => d.Route));

const AuthResetPasswordLazyRoute = AuthResetPasswordLazyImport.update({
  path: '/auth/reset-password',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/reset-password.lazy').then((d) => d.Route)
);

const AuthLogoutLazyRoute = AuthLogoutLazyImport.update({
  path: '/auth/logout',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/logout.lazy').then((d) => d.Route));

const AuthLoginLazyRoute = AuthLoginLazyImport.update({
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/login.lazy').then((d) => d.Route));

const AuthDeleteAccountLazyRoute = AuthDeleteAccountLazyImport.update({
  path: '/auth/delete-account',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/delete-account.lazy').then((d) => d.Route)
);

const SearchLabelRoute = SearchLabelImport.update({
  path: '/search/$label',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/search/$label.lazy').then((d) => d.Route)
);

const ProfileEditRoute = ProfileEditImport.update({
  path: '/profile/edit',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/profile/_edit.lazy').then((d) => d.Route)
);

const ProfileUserIdRoute = ProfileUserIdImport.update({
  path: '/profile/$userId',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/profile/$userId.lazy').then((d) => d.Route)
);

const AuthNewPasswordRoute = AuthNewPasswordImport.update({
  path: '/auth/new-password',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/new-password.lazy').then((d) => d.Route)
);

const ProfileEditSummaryLazyRoute = ProfileEditSummaryLazyImport.update({
  path: '/summary',
  getParentRoute: () => ProfileEditRoute,
} as any).lazy(() =>
  import('./routes/profile/_edit/summary.lazy').then((d) => d.Route)
);

const ProfileEditStandOutLazyRoute = ProfileEditStandOutLazyImport.update({
  path: '/stand-out',
  getParentRoute: () => ProfileEditRoute,
} as any).lazy(() =>
  import('./routes/profile/_edit/stand-out.lazy').then((d) => d.Route)
);

const ProfileEditContactLazyRoute = ProfileEditContactLazyImport.update({
  path: '/contact',
  getParentRoute: () => ProfileEditRoute,
} as any).lazy(() =>
  import('./routes/profile/_edit/contact.lazy').then((d) => d.Route)
);

const ProfileEditCharacteristicsLazyRoute =
  ProfileEditCharacteristicsLazyImport.update({
    path: '/characteristics',
    getParentRoute: () => ProfileEditRoute,
  } as any).lazy(() =>
    import('./routes/profile/_edit/characteristics.lazy').then((d) => d.Route)
  );

const ProfileEditBasicLazyRoute = ProfileEditBasicLazyImport.update({
  path: '/basic',
  getParentRoute: () => ProfileEditRoute,
} as any).lazy(() =>
  import('./routes/profile/_edit/basic.lazy').then((d) => d.Route)
);

const ProfileEditAreasLazyRoute = ProfileEditAreasLazyImport.update({
  path: '/areas',
  getParentRoute: () => ProfileEditRoute,
} as any).lazy(() =>
  import('./routes/profile/_edit/areas.lazy').then((d) => d.Route)
);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/new-password': {
      preLoaderRoute: typeof AuthNewPasswordImport;
      parentRoute: typeof rootRoute;
    };
    '/profile/$userId': {
      preLoaderRoute: typeof ProfileUserIdImport;
      parentRoute: typeof rootRoute;
    };
    '/profile/_edit': {
      preLoaderRoute: typeof ProfileEditImport;
      parentRoute: typeof rootRoute;
    };
    '/search/$label': {
      preLoaderRoute: typeof SearchLabelImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/delete-account': {
      preLoaderRoute: typeof AuthDeleteAccountLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/login': {
      preLoaderRoute: typeof AuthLoginLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/logout': {
      preLoaderRoute: typeof AuthLogoutLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/reset-password': {
      preLoaderRoute: typeof AuthResetPasswordLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/signup': {
      preLoaderRoute: typeof AuthSignupLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/search/category': {
      preLoaderRoute: typeof SearchCategoryLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/search/': {
      preLoaderRoute: typeof SearchIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/about/': {
      preLoaderRoute: typeof AboutIndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/contact/': {
      preLoaderRoute: typeof ContactIndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/guides/': {
      preLoaderRoute: typeof GuidesIndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    '/profile/_edit/areas': {
      preLoaderRoute: typeof ProfileEditAreasLazyImport;
      parentRoute: typeof ProfileEditImport;
    };
    '/profile/_edit/basic': {
      preLoaderRoute: typeof ProfileEditBasicLazyImport;
      parentRoute: typeof ProfileEditImport;
    };
    '/profile/_edit/characteristics': {
      preLoaderRoute: typeof ProfileEditCharacteristicsLazyImport;
      parentRoute: typeof ProfileEditImport;
    };
    '/profile/_edit/contact': {
      preLoaderRoute: typeof ProfileEditContactLazyImport;
      parentRoute: typeof ProfileEditImport;
    };
    '/profile/_edit/stand-out': {
      preLoaderRoute: typeof ProfileEditStandOutLazyImport;
      parentRoute: typeof ProfileEditImport;
    };
    '/profile/_edit/summary': {
      preLoaderRoute: typeof ProfileEditSummaryLazyImport;
      parentRoute: typeof ProfileEditImport;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AuthNewPasswordRoute,
  ProfileUserIdRoute,
  ProfileEditRoute.addChildren([
    ProfileEditAreasLazyRoute,
    ProfileEditBasicLazyRoute,
    ProfileEditCharacteristicsLazyRoute,
    ProfileEditContactLazyRoute,
    ProfileEditStandOutLazyRoute,
    ProfileEditSummaryLazyRoute,
  ]),
  SearchLabelRoute,
  AuthDeleteAccountLazyRoute,
  AuthLoginLazyRoute,
  AuthLogoutLazyRoute,
  AuthResetPasswordLazyRoute,
  AuthSignupLazyRoute,
  SearchCategoryLazyRoute,
  SearchIndexRoute,
  AboutIndexLazyRoute,
  ContactIndexLazyRoute,
  GuidesIndexLazyRoute,
]);

/* prettier-ignore-end */
