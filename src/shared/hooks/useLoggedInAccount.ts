import { useAuth } from '../providers/authProvider';

export function useLoggedInAccount() {
  const { account } = useAuth(['account']);
  if (account === null) throw Error('Not logged in');
  return account!;
}
