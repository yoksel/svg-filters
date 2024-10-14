import DragDrop from '../../containers/DragDrop';
import Constructor from '../../containers/Constructor';
import Preview from '../../containers/Preview';
import Code from '../../containers/Code';
import Docs from '../../containers/Docs';

import Icons from '../../components/atoms/Icons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Wrapper from '../../components/atoms/Wrapper';

import './App.scss';

const App = () => {
  return (
    <>
      <DragDrop listId="primitives_to_constructor">
        <Icons />

        <div className="App">
          <Header />

          <Wrapper>
            <main className="App__inner">
              <div className="App__container App__container--controlsList">
                <div className="App__content App__content--sticky">
                  <Sidebar />
                </div>
              </div>

              <div className="App__container App__container--constructor">
                <Constructor />
                <Docs />
              </div>

              <div className="App__container App__container--playground">
                <div className="App__content App__content--playground App__content--sticky">
                  <Preview />
                  <Code />
                </div>
              </div>
            </main>
          </Wrapper>

          <Footer />
        </div>
      </DragDrop>
    </>
  );
};

export default App;
