import * as React from 'react';
import withRoot from '../withRoot';

export default withRoot(({ children }: { children: React.ReactNode }) => (
  <>{children}</>
));
