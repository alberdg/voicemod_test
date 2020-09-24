import React, { createContext, useState } from 'react';



export const PasswordContext = createContext({
  password: '',
  repeatPassword: '',
  passwordSuccessMessage: '',
  passwordErrorMessage: '',
  loading: false,
  setLoading: (loading: boolean) : void => {},
  setPassword: (password: string) : void => {},
  setRepeatPassword: (repeatPassword: string) : void => {},
  setPasswordSuccessMessage: (successMessage: string) : void => {},
  setPasswordErrorMessage: (errorMessage: string) : void => {},
});

/**
 * Password context responsible for holding password data
 * @function
 * @param children Children component
 * @returns element Password context provider element
 */
const PasswordContextProvider = ({ children }: { children: JSX.Element }) => {
  const [ password, setPassword ] = useState<string>('');
  const [ repeatPassword, setRepeatPassword ] = useState<string>('');
  const [ passwordErrorMessage, setPasswordErrorMessage ] = useState<string>('');
  const [ passwordSuccessMessage, setPasswordSuccessMessage ] = useState<string>('');
  const [ loading, setLoading ] = useState<boolean>(false);


  return (
    <PasswordContext.Provider value={{
      password, setPassword,
      repeatPassword, setRepeatPassword,
      passwordSuccessMessage, setPasswordSuccessMessage,
      passwordErrorMessage, setPasswordErrorMessage,
      loading, setLoading,
    }}>
      {children}
    </PasswordContext.Provider>
  )

}
export default PasswordContextProvider;
