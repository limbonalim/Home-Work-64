import React from 'react';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

interface Props {
  title: string;
  content: string;
}

const MemoPage: React.FC<Props> = React.memo(function Page({title, content}) {
  return (
    <div>
      <h1>{title}</h1>
      <FroalaEditorView
        model={content}
      />
    </div>
  );
});

export default MemoPage;