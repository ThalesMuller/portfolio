import React from 'react';
import { Header, Footer } from 'src/components/molecules';

type LayoutProps = {
  children: React.ReactNode;
};
export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};
