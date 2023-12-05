import React from 'react';

interface Props {
  title: string;
  content: string;
}

const MemoPage: React.FC<Props> = React.memo(function Page ({title, content}) {

  return (
    <div>
      <h1>{title}</h1>
      <div>{content}</div>
    </div>
  );
});

export default MemoPage;