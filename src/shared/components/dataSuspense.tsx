import { Skeleton } from '@mui/material';
import { ReactNode } from 'react';
import { ErrorMessage } from './errorMessage';

type DataSuspenseProps = {
  loading: boolean;
  children: ReactNode;
} & {
  error: Error | undefined;
  errorComponent?: ReactNode;
};

function DataSuspense(props: DataSuspenseProps) {
  if (props.loading === true) return <Skeleton>{props.children}</Skeleton>;
  if (!!props.error) {
    if (props.errorComponent) return props.errorComponent;
    return <ErrorMessage message={props.error?.message} />;
  }
  return props.children;
}

export default DataSuspense;