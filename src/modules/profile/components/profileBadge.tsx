import { IBackendProfile } from '@/shared/types/user';
import ErrorMessage from '@shared/components/errorMessage';
import { getTitle } from '@shared/utils/areaUtils';
import { useTranslation } from 'react-i18next';

export const ProfileBadge = ({ user }: { user: IBackendProfile }) => {
  const { t } = useTranslation('profile');
  return !!user ? (
    <div className="flex flex-row gap-6 max-w-xs mx-auto items-center">
      {!!user.profilePictureUrl ? (
        <img
          src={user.profilePictureUrl}
          alt={`${user.nickname || user.fullName} profile picture`}
          className="size-20 rounded-full shrink-0 row-span-2 object-cover
          object-center"
        />
      ) : (
        <img
          src={
            user.type == 'moral'
              ? '/guias/fotoDePerfil/casita.jpg'
              : '/guias/fotoDePerfil/Monito.jpg'
          }
          alt="ImagenPreminada"
          className="size-20 rounded-full bg-white shrink-0 row-span-2
          object-cover object-center"
          loading="eager"
        />
      )}
      <div className="flex flex-col gap-1 text-left">
        <h3 className="text-md font-normal">
          {user.nickname
            ? user.nickname
            : user.fullName
              ? user.fullName
              : user.primaryEmail}
        </h3>
        {user.primaryActivity !== undefined && (
          <p className="text-sm">
            {getTitle(user.primaryActivity, user.gender)}
          </p>
        )}
      </div>
    </div>
  ) : (
    <ErrorMessage message={t('No User')} />
  );
};
