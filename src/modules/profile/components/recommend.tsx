import { IBackendProfile } from '@/shared/types/user';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Recommendations = ({ user }: { user: IBackendProfile }) => {
  const { t } = useTranslation('profile');
  const [showRecs, setShowRecs] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex flex-col gap-2 p-4 px-12 bg-secondary
                rounded-lg w-fit z-[1] cursor-pointer"
      >
        <img
          src={import.meta.env.BASE_URL + 'img/BrujulaWhite.svg'}
          alt=""
          className="max-h-[4rem]"
        />
        <h4 className="text-white text-center">...</h4>
      </div>
      <div
        className={[
          'bg-black bg-opacity-20 p-4 w-full',
          'rounded-lg flex flex-row gap-8 items-center',
          // auth.isLoggedIn && auth.getUserEmail() != user.email && 'pt-8 -mt-4',
        ].join(' ')}
      >
        <img
          src={import.meta.env.BASE_URL + 'img/LogoBlue.svg'}
          alt=""
          className="max-h-[4rem]"
        />
        <h5 className="text-2xl">{user.recommendationsCount}</h5>
        <div className="flex flex-col gap-4">
          <h4 className="font-normal text-base">
            {t('Brújulas de recomendación')}
          </h4>
          {!!user.recommendations &&
            (showRecs ? (
              <div
                className="cursor-pointer text-primary"
                onClick={() => setShowRecs(false)}
              >
                {t('Ocultar recomendaciones')}
              </div>
            ) : (
              <div
                className="cursor-pointer text-primary"
                onClick={() => setShowRecs(true)}
              >
                {t('Mostrar recomendaciones')}
              </div>
            ))}
        </div>
      </div>
      {!!user.recommendations && showRecs && (
        <div
          className="p-4 bg-black bg-opacity-10 flex flex-col
        gap-4 rounded-md"
        >
          {user.recommendations.map((a) => (
            <Link
              to="/profile/$userId"
              params={{ userId: a.id }}
              className="text-primary"
            >
              {a.fullName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
