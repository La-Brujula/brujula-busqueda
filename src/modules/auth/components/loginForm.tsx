import { useCallback, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { useAuth } from '@/shared/providers/authProvider';
import { Link, useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { BackendResponse } from '@/shared/services/backendFetcher';
import Input from '@/shared/components/input';

export const LoginForm = () => {
  const { t } = useTranslation('auth');
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(['login']);
  const [errorMsg, setErrorMsg] = useState('');

  const onError = (err: AxiosError) => {
    const serviceError = err.response.data as BackendResponse<null>;
    if (serviceError.isSuccess === true) return;

    setLoading(false);
    switch (serviceError.error.errorCode) {
      case 'AE01':
        setErrorMsg(
          t('No se encontró una cuenta con ese correo y contraseña.')
        );
        break;
      case 'AE02':
        setErrorMsg(
          t('No se encontró una cuenta con ese correo y contraseña.')
        );
        break;
      case 'AE03':
        setErrorMsg(
          t('No se encontró una cuenta con ese correo y contraseña.')
        );
        break;
      default:
        setErrorMsg(t('Ocurrió un error.'));
        console.error(err);
        break;
    }
  };

  const attemptLogin = useCallback(
    async (values: FieldValues) => {
      if (loading) return;
      if (!values.email || !values.password) return;
      setLoading(true);
      login(values.email, values.password)
        .then((res) =>
          navigate({
            to: '/profile/$userId',
            params: { userId: res.account.ProfileId },
            resetScroll: true,
          })
        )
        .catch(onError)
        .finally(() => setLoading(false));
    },
    [setLoading, login, navigate]
  );

  return (
    <>
      <form
        className="flex flex-col gap-4 lg:gap-8 justify-center items-center max-w-xs w-full mx-auto"
        onSubmit={handleSubmit(attemptLogin)}
      >
        <Input
          type="email"
          fieldName="email"
          label={t('email')}
          register={register}
          placeholder={t('ejemplo@labrujula.com')}
          autoComplete="email"
        />
        <Input
          type="password"
          fieldName="password"
          label={t('password')}
          register={register}
          placeholder={t('password')}
          autoComplete="password"
        />
        {errorMsg === '' ? <></> : <p style={{ color: 'red' }}>{errorMsg}</p>}
        {!loading ? (
          <input
            type="submit"
            className="max-w-xs mx-auto mt-2 lg:mt-8 bg-primary"
            onClick={attemptLogin}
            value={t('Inicia sesión')}
          />
        ) : (
          <LoadingSpinner />
        )}
      </form>
      <div className="flex flex-col gap-2 mt-4 text-primary">
        <Link
          to="/auth/signup"
          className="max-w-xs mx-auto mt-2 bg-secondary px-4 py-2 text-white rounded-md"
          resetScroll
        >
          {t('createUser')}
        </Link>
        <Link
          to="/auth/passwordReset"
          resetScroll
        >
          {t('forgotPassword')}
        </Link>
      </div>
    </>
  );
};
