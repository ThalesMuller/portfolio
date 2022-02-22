import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;

  padding: 1rem;

  @media only screen and (max-width: 414) {
    .main-grid {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }
  @media only screen and (min-width: 1440px) {
    .main-grid {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
  }
`;

export default Container;
