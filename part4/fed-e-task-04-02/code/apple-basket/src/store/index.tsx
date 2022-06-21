import { createContext, useContext, ReactNode } from 'react';
import AppleStore from './appleStore';

class RootStore {
  aStore: AppleStore;
  //   aStore: any;
  constructor() {
    this.aStore = new AppleStore();
  }
}

const rootStore = new RootStore();
const RootStoreContenxt = createContext({});

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export const RootStoreProvier = ({ children }: Props) => {
  return (
    <RootStoreContenxt.Provider value={rootStore}>
      {children}
    </RootStoreContenxt.Provider>
  );
};

export const useRootStore = () => {
  return useContext(RootStoreContenxt);
};
