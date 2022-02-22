import React from 'react';
import Container from './style';

type CardProps = {
  id: string;
  children: React.ReactNode;
};
export const Card: React.FC<CardProps> = (props: CardProps) => {
  const { children, id } = props;
  return <Container id={id}>{children}</Container>;
};
