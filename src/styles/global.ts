import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

:root {
  --clr-neutral-100: hsl(0, 0%, 100%);
  --clr-neutral-200: hsl(0, 0%, 80%);
  --clr-neutral-600: hsl(240, 6%, 13%);
  --clr-neutral-900: hsl(240, 4%, 5%);
  --clr-brand-primary-700: #3e1f47;
  --clr-brand-primary-500: #4d194d;
  --clr-highlight-500: #006466;
  --clr-highlight-900: #006466
  --brand-grandient: linear-gradient(130deg, var(--clr-brand-primary-500), var(--clr-highlight-500));

  --highlight-gradient: linear-gradient(
    130deg,
    #006466,
    #065a60,
    #0b525b,
    #144552,
    #1b3a4b,
    #212f45,
    #272640,
    #312244,
    #3e1f47,
    #4d194d
  );
}

body {
  background: var(--highlight-gradient);
}

h1,
h2,
h3,
button,
.font-highlight {
  font-family: 'Press Start 2P', cursive;
}

h4,
h5,
h6,
p,
a,
li,
input,
textarea,
label,
select,
option,
span {
  font-family: 'VT323', monospace;
}
`;
