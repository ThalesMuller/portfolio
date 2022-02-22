import styled from 'styled-components';

const Container = styled.footer`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: flex-end;

  background-color: var(--clr-neutral-600);

  color: var(--clr-neutral-100);
  width: 100%;

  padding: 1rem 2rem;

  & .footer-icons {
    color: var(--clr-neutral-100);
  }
`;

export default Container;
