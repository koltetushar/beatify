import React, { useEffect, useRef } from 'react';

const RawHTMLWithScripts = ({ htmlString }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear previous content
      containerRef.current.innerHTML = htmlString;

      // Extract and execute <script> tags
      const scripts = containerRef.current.querySelectorAll('script');

      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
    }
  }, [htmlString]);

  return <div ref={containerRef} />;
};

export default RawHTMLWithScripts;
