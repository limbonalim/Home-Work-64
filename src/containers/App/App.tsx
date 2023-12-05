import {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import axiosApi from '../../axios-api';
import Toolbar from '../../components/Toolbar/Toolbar';
import MemoPage from '../../components/Page/Page';
import Loading from '../../components/Loading/Loading';
import {PagesInfo, PageType} from '../../types';
import {getPages} from '../../list-of-page';
import AdminPage from '../../components/AdminPage/AdminPage';


const App = () => {
  const [page, setPage] = useState<PageType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [listOfPages, setListOfPages] = useState<PagesInfo[]>([]);
  let {pathname} = useLocation();

  const getList = useCallback(async () => {
    const list: PagesInfo[] = await getPages();
    if (list) {
      setListOfPages(list);
    }
  }, [pathname]);

  useEffect(() => {
    void getList();
  }, [getList]);

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

  if (!loading && page) {
    content = (
      <Routes>
        <Route path="/" element={<MemoPage title={page.title} content={page.content}/>}/>
        <Route path="/pages/:page" element={<MemoPage title={page.title} content={page.content}/>}/>
        <Route path="/pages/admin" element={<AdminPage listOfPages={listOfPages}/>}/>
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
    );
  }


  return (
    <>
      <header className="mb-5">
        <Toolbar listOfPages={listOfPages}/>
      </header>
      <main className="container">
        {content}
      </main>
    </>
  );
};

export default App;
