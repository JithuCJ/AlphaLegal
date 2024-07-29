// context/SEOContext.js
import React, { createContext, useContext } from "react";
import { Helmet } from "react-helmet-async";

const SEOContext = createContext();

export const useSEO = () => useContext(SEOContext);

export const SEOProvider = ({ children, defaultSEO }) => {
  return (
    <SEOContext.Provider value={defaultSEO}>
      <Helmet>
        <title>{defaultSEO.title}</title>
        <meta name="description" content={defaultSEO.description} />
        <meta name="keywords" content={defaultSEO.keywords} />
        <meta property="og:title" content={defaultSEO.title} />
        <meta property="og:description" content={defaultSEO.description} />
        <meta property="og:type" content="website" />
      </Helmet>
      {children}
    </SEOContext.Provider>
  );
};
