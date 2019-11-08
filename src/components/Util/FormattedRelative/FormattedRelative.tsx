import React from 'react';
import moment from 'moment';

type FormattedRelativeProps = {
  value: string;
};

export const FormattedRelative: React.FC<FormattedRelativeProps> = ({
  value,
}) => {
  return <>{moment(value).fromNow()}</>;
};
