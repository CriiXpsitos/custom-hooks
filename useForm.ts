import { ChangeEvent, useCallback, useState } from "react";

// Definir el hook con tipado genérico
export const useForm = <T extends Record<string, unknown>>(initialForm: T) => {
  const [formState, setFormState] = useState<T>(initialForm);

  const onInputChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormState(prevFormState => ({
      ...prevFormState,
      [target.name]: target.value,
    }));
  }, []);

  const onResetForm = () => setFormState(initialForm);
  

  return {
    formState, // Mantener el objeto completo si es necesario
    onInputChange,
    onResetForm
  };
};