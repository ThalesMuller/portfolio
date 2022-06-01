import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';
import SystemRoutes from './routes';
import { Layout } from './components/organisms';

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <Router>
          <SystemRoutes />
        </Router>
        <GlobalStyle />
      </Layout>
    </div>
  );
};

export default App;
