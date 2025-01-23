import { createContext, useState } from "react";

export let UserTokenContext = createContext(null);

export default function UserTokenContextProvider({children}) {
    let [Token,setToken] = useState(null)
    return <UserTokenContext.Provider value={{Token,setToken}}>
        {children}
    </UserTokenContext.Provider>
}