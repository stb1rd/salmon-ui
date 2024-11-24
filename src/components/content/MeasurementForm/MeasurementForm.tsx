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
import { labelsByNamePathDict, POST_PARAMS, URL_GRADING_POST } from '@/constants';
import { round } from '@/components/utils/round';

export const MeasurementForm = () => {
  const methods = useForm<MeasurementInputs>({ defaultValues: { gender: 'unknown' } });
  const { handleSubmit, watch, reset } = methods;
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isSuccessMsgVisible, setIsSuccessMsgVisible] = useState(false);
  const [apiSuggestions, setApiSuggestions] = useState<string[]>([]);

  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    retry: 0,
    mutationFn: async (values: MeasurementInputs) => {
      setApiSuggestions([]);
      setIsErrorVisible(false);
      setIsSuccessMsgVisible(false);
      const response = await fetch(URL_GRADING_POST, { body: mapFormValuesToApi(values), ...POST_PARAMS });
      const json = await response.json();
      if (response.status !== 200) {
        throw new Error(json.error);
      }
      if (response.status === 200 && json.report.report.length) {
        const reports = json.report.report.map(
          (reportItem: { fieldName: string; message: string; value: number }) =>
            `Обратите внимание на поле ${labelsByNamePathDict.get(
              reportItem.fieldName
            )} – ${reportItem.message.toLowerCase()} при значении ${round(reportItem.value)}`
        );
        setApiSuggestions(reports);
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
            <div className="toast toast-top top-16 toast-center min-w-px w-11/12 md:toast-end md:toast-bottom md:w-auto">
              <div role="alert" className="alert alert-error bg-red-600 text-white whitespace-pre-wrap">
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
            <div className="toast toast-top top-16 toast-center min-w-px w-full md:toast-end md:toast-bottom md:w-auto">
              <div className="flex flex-col gap-1 items-start">
                <div className="alert bg-green-600 text-white w-full md:w-auto pr-8 grid-flow-col">
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
          <p className="md:hidden block">
            После сохранения можно отредактировать и отправить оценку повторно, либо{' '}
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
            ,
          </p>
          <p className="md:hidden block mt-4">
            либо открыть{' '}
            <Link className="btn-link" href="/log">
              таблицу с оценками
            </Link>
          </p>
          <p className="hidden md:block">
            После сохранения можно отредактировать и отправить оценку повторно, либо{' '}
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
          {apiSuggestions.map((x) => (
            <p>{x}</p>
          ))}
          <div className="flex gap-12 items-center w-full">
            <button type="submit" className="btn btn-primary btn-lg w-full md:btn-wide" disabled={isPending}>
              {isPending && <span className="loading loading-spinner" />}
              {!isPending && 'Сохранить'}
            </button>
            {isSuccess && (
              <Link className="btn-link hidden md:block" href="/log">
                Открыть таблицу с оценками
              </Link>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
