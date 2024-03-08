import { IBackendProfile } from '@/shared/types/user';
import ErrorMessage from '@shared/components/errorMessage';
import { getTitle } from '@shared/utils/areaUtils';
import { useTranslation } from 'react-i18next';

export const ProfileHeader = ({ user }: { user: IBackendProfile }) => {
  const { t } = useTranslation('user');

  return !!user ? (
    <div className="max-w-2xl mx-auto w-full">
      <div className="flex flex-col gap-2 mx-auto xl:ml-0 items-center max-w-xs">
        {!!user.coverPictureUrl ? (
          <img
            src={user.coverPictureUrl || ''}
            alt=""
            className="absolute left-0 -z-10 bg-black bg-opacity-20 w-full
            h-48 object-cover object-center"
          />
        ) : (
          <div
            className="absolute left-0 -z-10 bg-primary bg-opacity-20
          w-full h-48"
          />
        )}
        <div className="mt-8">
          {!!user.profilePictureUrl ? (
            <img
              src={user.profilePictureUrl}
              alt={`${user.fullName} profile picture`}
              className="size-48 bg-blue rounded-[50%] object-cover object-center"
              loading="eager"
            />
          ) : (
            <img
              src={
                user.type == 'moral'
                  ? '/guias/fotoDePerfil/casita.jpg'
                  : '/guias/fotoDePerfil/Monito.jpg'
              }
              alt="ImagenPreminada"
              className="size-48 bg-white rounded-[50%] object-cover object-center"
              loading="eager"
            />
          )}
        </div>
        {!!user.headline && (
          <p className="relative text-center italic text-sm mb-2">
            {user.headline}
          </p>
        )}
        <div className="flex flex-col gap-1 text-center relative">
          <h3 className="text-md font-normal">
            {user.nickname ? user.nickname : user.fullName}
          </h3>
          {[
            user.primaryActivity,
            user.secondaryActivity,
            user.thirdActivity,
          ].map(
            (activity) =>
              !!activity && (
                <p
                  className="text-sm"
                  key={activity}
                >
                  {getTitle(activity, user.gender)}
                </p>
              )
          )}
          <p className="text-xs">{user.location}</p>
        </div>
      </div>
    </div>
  ) : (
    <ErrorMessage message={t('No se encontró el usuario')} />
  );
};
