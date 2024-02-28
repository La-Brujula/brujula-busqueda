import { UserCard } from './userCard';
import { UserDTO } from '../hooks/useSearch';

export const UsersList = ({ users }: { users?: UserDTO[] }) => {
  return users != undefined && users.length > 0 ? (
    <div className="divide-y-2 divide-black divide-opacity-40 space-y-4">
      {users.map((e) => (
        <UserCard
          user={e}
          key={e.primaryEmail}
        />
      ))}
    </div>
  ) : (
    <p>Sin resultados</p>
  );
};
