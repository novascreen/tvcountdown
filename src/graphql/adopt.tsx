import React from 'react';
import { Mutation } from 'react-apollo';

export const adoptMutation = (props: any) => ({ render }: any) => (
  <Mutation
    {...props}
    children={(run: any, result: any) => render({ run, result })}
  />
);
