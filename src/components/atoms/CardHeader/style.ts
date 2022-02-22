import styled from 'styled-components';

const Container = styled.div`
  font-size: clamp(0.9rem, 2vw, 1.125rem);
  font-weight: bold;
  padding: 0.5rem 1rem;
  background: var(--highlight-gradient);
  transform: translateX(-1.7rem);
  transition: transform 125ms ease-in-out;
  text-align: right;
`;

export default Container;
