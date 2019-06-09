import React from 'react';
import { Query, Mutation } from '@apollo/react-components';

export const adoptQuery = (props: any, Component = Query) => ({
  render,
}: any) => <Component {...props} children={() => null} />;

export const adoptMutation = (props: any) => ({ render }: any) => (
  <Mutation {...props} children={(run:any, result:any) => render({ run, result })} />
);
