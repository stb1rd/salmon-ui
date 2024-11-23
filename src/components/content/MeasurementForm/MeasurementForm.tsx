import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Link from 'next/link';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { mapFormValuesToApi, MeasurementInputs } from './helpers';
import { SectionMale } from './SectionMale';
import { SectionFemale } from './SectionFemale';
import { SectionCommon } from './SectionCommon';
import { POST_PARAMS, URL_GRADING_POST } from '@/constants';

export const MeasurementForm = () => {
  const methods = useForm<MeasurementInputs>({ defaultValues: { gender: 'unknown' } });
  const { handleSubmit, watch, reset } = methods;
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isSuccessMsgVisible, setIsSuccessMsgVisible] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    retry: 0,
    mutationFn: async (values: MeasurementInputs) => {
      setIsErrorVisible(false);
      setIsSuccessMsgVisible(false);
      const response = await fetch(URL_GRADING_POST, { body: mapFormValuesToApi(values), ...POST_PARAMS });
      if (response.status !== 200) {
        const json = await response.json();
        throw new Error(json.error);
      }
    },
    onError: (error) => {
      console.error(error);
      setIsErrorVisible(true);
    },
    onSuccess: () => {
      setIsErrorVisible(false);
      setIsSuccessMsgVisible(true);
      queryClient.invalidateQueries({ queryKey: ['log'] });
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((values) => mutate(values))}>
        <h2 className="text-3xl">Оценка показателей</h2>
        <SectionCommon />
        {watch('gender') === 'male' && <SectionMale />}
        {watch('gender') === 'female' && <SectionFemale />}
        {false && (
          <div className="mt-4 flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="checkbox" />
              <h2 className="text-l">Отбор в племенное ядро</h2>
            </div>
          </div>
        )}
        <div className="mt-12 flex gap-4 flex-col items-start">
          {isErrorVisible && (
            <div className="toast">
              <div role="alert" className="alert alert-error bg-red-600 text-white">
                <ErrorOutlineIcon fontSize="small" />
                <span>
                  <strong>Ошибка</strong> при сохранении данных, попробуйте еще раз
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-warning btn-outline btn-square"
                  onClick={() => setIsErrorVisible(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          )}
          {isSuccessMsgVisible && (
            <div className="toast">
              <div className="flex flex-col gap-1 items-start">
                <div className="alert bg-green-600 text-white w-auto pr-8">
                  <DoneIcon />
                  <strong>Оценка сохранена</strong>
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost btn-square"
                    onClick={() => setIsSuccessMsgVisible(false)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </div>
          )}
          <p>
            После сохранения можно отредактировать и отправить ее повторно, либо{' '}
            <button
              type="button"
              className="btn-link"
              onClick={() => {
                reset();
                setIsSuccessMsgVisible(false);
              }}
            >
              сбросить все поля
            </button>
            , либо открыть{' '}
            <Link className="btn-link" href="/log">
              таблицу с оценками
            </Link>
          </p>
          <div className="flex gap-12 items-center">
            <button type="submit" className="btn btn-primary btn-lg btn-wide" disabled={isPending}>
              {isPending && <span className="loading loading-spinner" />}
              {!isPending && 'Сохранить'}
            </button>
            {isSuccess && (
              <Link className="btn-link" href="/log">
                Открыть таблицу с оценками
              </Link>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
