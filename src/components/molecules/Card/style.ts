import styled from 'styled-components';

const Container = styled.div`
  background-color: var(--clr-neutral-600);
  color: var(--clr-neutral-100);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);

  &:hover,
  &:focus {
    transform: scale(1.01);
  }
`;

export default Container;
