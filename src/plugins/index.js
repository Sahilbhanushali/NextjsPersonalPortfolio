import gsap from "gsap";
import ScrollTrigger from "../../public/assets/plugins/gsap-scroll-trigger.js";
import ScrollSmoother from "../../public/assets/plugins/gsap-scroll-smoother.js";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Export GSAP as default and plugins as named exports
export default gsap;
export { ScrollTrigger, ScrollSmoother };
