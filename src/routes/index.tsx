import { createFileRoute } from '@tanstack/react-router';
import { searchSchema } from '../modules/search/types/searchParams';

export const Route = createFileRoute('/')({
  validateSearch: (search) => searchSchema.parse(search),
});
