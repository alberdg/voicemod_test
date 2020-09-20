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
  setName: (name: string) : void => {},
  setLastname: (lastname: string) : void => {},
  setEmail: (email: string) : void => {},
  setPassword: (password: string) : void => {},
  setRepeatPassword: (repeatPassword: string) : void => {},
  setCountry: (country: string) : void => {},
  setTelephone: (telephone: string) : void => {},
  setPostcode: (postcode: string) : void => {},
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
  const [ country, setCountry ] = useState<string>('');
  const [ telephone, setTelephone ] = useState<string>('');
  const [ postcode, setPostcode ] = useState<string>('');

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
    }}>
      {children}
    </UserContext.Provider>
  )

}
export default UserContextProvider;
