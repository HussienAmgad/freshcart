import { createContext, useState } from "react";

export let ProductIdContext = createContext(null);

export default function ProductIdProvider({ children }) {
    let [productId, setProductId] = useState(null);
    
    return (
        <ProductIdContext.Provider value={{ productId, setProductId }}>
            {children}
        </ProductIdContext.Provider>
    );
}
