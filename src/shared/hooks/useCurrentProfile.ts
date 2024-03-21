import { useAuth } from '../providers/authProvider';
import { useProfile } from './useUser';

export function useCurrentProfile() {
  const { isLoggedIn, account } = useAuth(['isLoggedIn', 'account']);
  if (!isLoggedIn) throw Error('Not logged in');
  return useProfile(account.ProfileId);
}
