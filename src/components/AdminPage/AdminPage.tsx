import React, {useState} from 'react';
import AddPage from '../AddPage/AddPage';
import EditForm from '../EditPage/EditForm';
import {PagesInfo} from '../../types';

interface Props {
  listOfPages: PagesInfo[];
}

const AdminPage: React.FC<Props> = ({listOfPages}) => {
  const [show, setShow] = useState<boolean>(false);
  let content;

  if (show) {
    content = (<AddPage/>);
  } else {
    content = (<EditForm listOfPages={listOfPages}/>);
  }
  return (
    <>
      <div className="d-flex gap-3 mb-3">
        <button className="btn btn-outline-primary" onClick={() => setShow(false)}>Edit form</button>
        <button className="btn btn-outline-success" onClick={() => setShow(true)}>Add form</button>
      </div>
      {content}
    </>
  );
};

export default AdminPage;