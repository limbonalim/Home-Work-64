import {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import axiosApi from '../../axios-api';
import Toolbar from '../../components/Toolbar/Toolbar';
import MemoPage from '../../components/Page/Page';
import Loading from '../../components/Loading/Loading';
import {PagesInfo, PageType} from '../../types';
import AdminPage from '../../components/AdminPage/AdminPage';


const App = () => {
  const [page, setPage] = useState<PageType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [listOfPages, setListOfPages] = useState<PagesInfo[]>([]);
  let {pathname} = useLocation();

  const getList = useCallback(async () => {
    const list: PagesInfo[] = await getLinks();
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

  const getLinks = async () => {
    try {
      const request = await axiosApi.get('/pages.json');
      const pages = request.data;
      const keys: string[] = Object.keys(pages);
      return keys.map((item): PagesInfo => {
        return {name: pages[item].name, id: item};
      });
    } catch (error: Error) {
      getError(error.message);
    }
  };

  const getPage = useCallback(async () => {
    try {
      setLoading(true);
      const request = await axiosApi.get<PageType>(`${pathname}.json`);
      setPage(request.data);
    } catch (error: Error) {
      getError(error.message);
    } finally {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/pages/admin') {
      void getPage();
    }
  }, [getPage]);

  const getError = (message: string) => {
    setShowAlert(true);
    setError(message);
  };

  let content = (<Loading/>);

  if (!loading && page) {
    content = (
      <Routes>
        <Route path="/" element={<MemoPage title={page.title} content={page.content}/>}/>
        <Route path="/pages/:page" element={<MemoPage title={page.title} content={page.content}/>}/>
        <Route path="/pages/admin" element={<AdminPage listOfPages={listOfPages} getError={getError}/>}/>
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
    );
  } else if (pathname === '/pages/admin') {
    content = (
      <Routes>
        <Route path="/pages/admin" element={<AdminPage listOfPages={listOfPages} getError={getError}/>}/>
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
    );
  }


  return (
    <>
      <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {error}
        </p>
      </Alert>
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
