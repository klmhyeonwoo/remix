import { keyframes } from "@emotion/react";

export const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const loadingFade = keyframes`
  0% {
    opacity: 15%;
  }

  25% {
    opacity: 30%;
  }

  50% {
    opacity: 15%;
  }

  75% {
    opacity: 30%;
  }

  100% {
    opacity: 15%;
  }

`;

export const fadeUp = keyframes`
    0% {
        transform : translateY(0.5rem);
        opacity: 0;
    }
    50% {
        opacity: 0.3;
    }
    70% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
        transform: none;
`;

export const fadeLeft = keyframes`
0% {
    transform : translateX(30px);
    opacity: 0;
}
50% {
    opacity: 0.3;
}
70% {
    opacity: 0.5;
}
100% {
    opacity: 1;
    transform : none;
`;
