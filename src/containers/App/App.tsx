import {useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Toolbar from '../../components/Toolbar/Toolbar';
import Page from '../../components/Page/Page';
import {PageType} from '../../types';

const App = () => {
  const [page, setPage] = useState<PageType | null>(null);
  const location = useLocation()
  console.log(location)

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Page title="title" content="content"/>}/>
          <Route path="/pages/:page" element={<Page title="Title" content="content"/>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
