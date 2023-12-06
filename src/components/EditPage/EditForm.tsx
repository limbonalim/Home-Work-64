import {useNavigate} from 'react-router-dom';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import axiosApi from '../../axios-api';
import {AddPageFormType, FormPageType, PagesInfo} from '../../types';

interface Props {
  listOfPages: PagesInfo[];
  getError: (message: string) => void;
}

const EditForm: React.FC<Props> = ({listOfPages, getError}) => {
  const [page, setPage] = useState<AddPageFormType>({
    id: '',
    name: '',
    title: '',
    content: ''
  });
  const navigate = useNavigate();
  const listOfOptions = listOfPages.map(({id, name}) => (
    <option key={id} value={id} defaultValue={name}>{name}</option>
  ));

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setPage((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const textAriaChange = (model: string) => {
    setPage((prevState) => {
      return {
        ...prevState,
        content: model,
      };
    });
  };

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    let name = '';
    listOfPages.forEach((item) => {
      if (event.target.value === item.id) {
        name = item.name;
      }
    });
    setPage((prevState) => {
      return {
        ...prevState,
        id: event.target.value,
        name: name,
      };
    });
  };

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const data: FormPageType = {
        name: page.name,
        title: page.title,
        content: page.content
      };
      await axiosApi.put<FormPageType>(`/pages/${page.id}.json`, data);
      navigate('/');
    } catch (error: Error) {
      getError(error.message);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h1>Edit page</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Select Page:</label>
        <select
          onChange={onSelectChange}
          value={page.id}
          className="form-select"
          aria-label="select page menu"
          name="name"
          id="name"
        >
          {listOfOptions}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
          onChange={onChange}
          value={page.title}
          required
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="Some Title"
        />
      </div>
      <div className="mb-3">
        <FroalaEditor
          tag="textarea"
          onModelChange={textAriaChange}
          model={page.content}
        />
      </div>
      <button className="btn btn-outline-primary">Save</button>
    </form>
  );
};

export default EditForm;