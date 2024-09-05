// hooks/useSEO.js
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SEOContext } from "../../store/SEOContext";

const useSEO = (seo = {}) => {
  const defaultSEO = useContext(SEOContext);

  useEffect(() => {
    const mergedSEO = { ...defaultSEO, ...seo };

    const helmet = (
      <Helmet>
        <title>{mergedSEO.title}</title>
        <meta name="description" content={mergedSEO.description} />
        <meta name="keywords" content={mergedSEO.keywords} />
        <meta property="og:title" content={mergedSEO.title} />
        <meta property="og:description" content={mergedSEO.description} />
        <meta property="og:type" content="website" />
      </Helmet>
    );

    return () => helmet;
  }, [seo, defaultSEO]);
};

export default useSEO;
