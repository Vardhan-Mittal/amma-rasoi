/**
 * Runs before first paint (see layout): shows the loader only on the first
 * visit of a session and never under reduced motion.
 */
export const introScript = `try{if(!sessionStorage.getItem("amma-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-pending")}sessionStorage.setItem("amma-intro","1")}catch(e){}`;
