import { DocumentNode, useQuery } from '@apollo/client';
import GraphQLError from '@/components/GraphQLError';
import React from 'react';

export default function QueryWrapper(query: DocumentNode) {
  return (Component: React.FunctionComponent) => (props: any) => {
    const { loading, error, data } = useQuery(query);

    if (loading) return <p>Loading...</p>;
    if (error) return <GraphQLError error={error} />;

    return <Component {...props} data={data} />;
  };
}
