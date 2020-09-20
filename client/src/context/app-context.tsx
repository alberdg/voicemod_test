import React, { createContext, useState } from 'react';
import { Country } from '../interfaces/country';



export const AppContext = createContext({});

/**
 * App context responsible for holding app data
 * @function
 * @param children Children component
 * @returns element App context provider element
 */
const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [ countries, setCountries ] = useState<Country[]>([]);
  const storeData = (countries: Country[]) : void => {
    setCountries(countries);
  }

  return (
    <AppContext.Provider value={{ countries, setCountries: storeData }}>
      {children}
    </AppContext.Provider>
  )

}
export default AppContextProvider;
