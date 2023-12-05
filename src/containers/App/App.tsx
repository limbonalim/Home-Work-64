import {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import axiosApi from '../../axios-api';
import Toolbar from '../../components/Toolbar/Toolbar';
import Page from '../../components/Page/Page';
import Loading from '../../components/Loading/Loading';
import {PageType} from '../../types';
import EditForm from '../../components/EditPage/EditForm';

const App = () => {
  const [page, setPage] = useState<PageType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  let {pathname} = useLocation();
  if (pathname === '/') {
    pathname = '/pages/home';
  }

  const getPage = useCallback(async () => {
    try {
      setLoading(true);
      const request = await axiosApi.get<PageType>(`${pathname}.json`);
      setPage(request.data);
    } catch (error: Error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/pages/admin') {
      void getPage();
    }
  }, [getPage]);

  let content = (<Loading/>);

  if (!loading) {
    content = (
      <Routes>
        <Route path="/" element={<Page title={page?.title} content={page?.content}/>}/>
        <Route path="/pages/:page" element={<Page title={page?.title} content={page?.content}/>}/>
        <Route path="/pages/admin" element={<EditForm title="Edit page"/>}/>
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
    );
  }

  return (
    <>
      <header className="mb-5">
        <Toolbar/>
      </header>
      <main className="container">
        {content}
      </main>
    </>
  );
};

export default App;
