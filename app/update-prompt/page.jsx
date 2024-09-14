import React, { Suspense } from 'react';
import EditPrompt from '@components/EditPrompt';

const ParentComponent = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
};

export default ParentComponent;

