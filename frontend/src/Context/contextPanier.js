import React, {createContext, useState} from 'react';

const PanierContext = createContext();

const PanierProvider = ({children}) => {

    const [article, setArticle] = useState([]);

    return(
        <PanierContext.Provider value={{article, setArticle}}>
            {children}
        </PanierContext.Provider>
    )
}

export  {PanierContext, PanierProvider};