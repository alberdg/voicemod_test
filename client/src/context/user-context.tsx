import React, { createContext, useState } from 'react';



export const UserContext = createContext({
  name: '',
  lastname: '',
  email: '',
  password: '',
  repeatPassword: '',
  country: '',
  telephone: '',
  postcode: '',
  successMessage: '',
  errorMessage: '',
  loading: false,
  validForm: false,
  unauthorized: false,
  setName: (name: string) : void => {},
  setLastname: (lastname: string) : void => {},
  setEmail: (email: string) : void => {},
  setPassword: (password: string) : void => {},
  setRepeatPassword: (repeatPassword: string) : void => {},
  setCountry: (country: string) : void => {},
  setTelephone: (telephone: string) : void => {},
  setPostcode: (postcode: string) : void => {},
  setSuccessMessage: (successMessage: string) : void => {},
  setErrorMessage: (errorMessage: string) : void => {},
  setLoading: (loading: boolean) : void => {},
  setValidForm: (validForm: boolean) : void => {},
  setUnauthorized: (unauthorized: boolean) : void => {}
});

/**
 * User context responsible for holding user data
 * @function
 * @param children Children component
 * @returns element User context provider element
 */
const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [ name, setName ] = useState<string>('');
  const [ lastname, setLastname ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ repeatPassword, setRepeatPassword ] = useState<string>('');
  const [ country, setCountry ] = useState<string>('-1');
  const [ telephone, setTelephone ] = useState<string>('');
  const [ postcode, setPostcode ] = useState<string>('');
  const [ successMessage, setSuccessMessage ] = useState<string>('');
  const [ errorMessage, setErrorMessage ] = useState<string>('');
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ validForm, setValidForm ] = useState<boolean>(false);
  const [ unauthorized, setUnauthorized ] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{
      name, setName,
      lastname, setLastname,
      email, setEmail,
      password, setPassword,
      repeatPassword, setRepeatPassword,
      country, setCountry,
      telephone, setTelephone,
      postcode, setPostcode,
      successMessage, setSuccessMessage,
      errorMessage, setErrorMessage,
      loading, setLoading,
      validForm, setValidForm,
      unauthorized, setUnauthorized,
    }}>
      {children}
    </UserContext.Provider>
  )

}
export default UserContextProvider;
