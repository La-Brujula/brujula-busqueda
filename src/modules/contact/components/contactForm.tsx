import Input from '@shared/components/input';
import { Container } from '@shared/layout/container';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type ContactForm = {
  subject: string;
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const { t } = useTranslation('contact');
  const { register, handleSubmit } = useForm<ContactForm>({
    defaultValues: {
      subject: '',
      name: '',
      email: '',
      message: '',
    },
  });

  return (
    <Container bg="light">
      <h2 className="text-left mb-8">{t('Fomulario de contacto')}</h2>
      <form
        onSubmit={handleSubmit(() => {})}
        className="flex flex-col gap-4"
      >
        <Input
          fieldName="subject"
          label={t('Asunto')}
          type="text"
          register={register}
          divClass="text-left text-primary"
          inputClass="border border-primary rounded-md
          text-black max-w-md bg-transparent"
        />
        <Input
          fieldName="name"
          label={t('Nombre')}
          type="text"
          register={register}
          autoComplete="name"
          divClass="text-left text-primary"
          inputClass="border border-primary rounded-md
          text-black max-w-md bg-transparent"
        />
        <Input
          fieldName="email"
          label={t('Correo electrónico')}
          type="email"
          register={register}
          autoComplete="email"
          divClass="text-left text-primary"
          inputClass="border border-primary rounded-md
          text-black max-w-md bg-transparent"
        />
        <Input
          fieldName="message"
          label={t('Mensaje')}
          type="textarea"
          register={register}
          divClass="text-left text-primary"
          inputClass="border border-primary rounded-md
          text-black bg-transparent focus:h-64 p-2
          transition-all"
        />
        <input
          type="submit"
          value={t('Enviar')}
          className="bg-secondary w-fit self-center"
        />
      </form>
    </Container>
  );
}