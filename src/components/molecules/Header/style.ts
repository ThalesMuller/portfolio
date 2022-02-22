import styled from 'styled-components';

const Container = styled.header`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;

  & div {
    color: var(--clr-neutral-100);
    text-align: center;
    padding: 1rem;
    justify-self: center;
    grid-column: span 3;
  }

  & div h1 {
    margin-bottom: 3px;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
  }

  & div h2 {
    font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  }

  &::after,
  &::before {
    content: '';
    height: min(40%, 50px);
    width: 100%;
    background: var(--clr-brand-primary-500);
    border: none;
  }

  &::after {
    justify-self: flex-end;
    transform: rotate(180deg);
  }
  &::before {
    justify-self: flex-start;
  }

  & > h1 {
    font-family: 'Press Start 2P', cursive;
    font-size: 2rem;
  }
`;

export default Container;
