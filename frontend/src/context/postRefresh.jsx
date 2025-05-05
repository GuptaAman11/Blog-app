
import { createContext, useContext, useState } from 'react';


const PostRefresh = createContext();

export const PostRefreshProvider = ({ children }) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);


  const triggerUpdate = () => {
    setShouldUpdate(prev => !prev);
  };


  return (
    <PostRefresh.Provider value={{ triggerUpdate , shouldUpdate}}>
      {children}
    </PostRefresh.Provider>
  );
};

export const useSupplier = () => useContext(PostRefresh);
