/*  eslint-disable max-len */
import Icons from '../../components/atoms/Icons';
import Header from '../../components/molecules/Header';
import Footer from '../../components/molecules/Footer';
import Wrapper from '../../components/atoms/Wrapper';

import './Read.scss';

//** Single page with links */
const Read = () => {
  return (
    <>
      <Icons />

      <div className="Read">
        <Header />

        <Wrapper>
          <main className="Read__inner">
            <h2 className="Read__title">Useful Resources</h2>

            <h3>Articles</h3>

            <ul className="Read__list">
              <li>
                <a href="https://www.w3.org/TR/filter-effects/">Filter Effects Module Level 1</a> by
                W3C
              </li>
              <li>
                <a href="https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/">
                  The Art Of SVG Filters And Why It Is Awesome
                </a>{' '}
                by Dirk Weber, <a href="https://codepen.io/collection/ArxmyO/">demos</a>
              </li>
              <li>
                <a href="https://www.sarasoueidan.com/blog/svg-filters/">
                  SVG Filters: The Crash Course
                </a>{' '}
                by Sara Soueidan
              </li>
              <li>
                <a href="http://tutorials.jenkov.com/svg/filters.html">SVG Filters</a> by Jakob
                Jenkov
              </li>
              <li>
                <a href="https://css-tricks.com/color-filters-can-turn-your-gray-skies-blue/">
                  Color Filters Can Turn Your Gray Skies Blue
                </a>{' '}
                by Amelia Bellamy-Royds
              </li>
              <li>
                <a href="https://alistapart.com/article/finessing-fecolormatrix">
                  Finessing `feColorMatrix`
                </a>{' '}
                by Una Kravets
              </li>
              <li>
                <a href="https://css-tricks.com/look-svg-light-source-filters/">
                  A Look at SVG Light Source Filters
                </a>{' '}
                by Joni Trythall
              </li>
              <li>
                <a href="https://codepen.io/enxaneta/post/svg-waves-with-fedisplacementmap">
                  SVG waves with feDisplacementMap
                </a>{' '}
                by Gabi
              </li>
              <li>
                <a href="https://www.xanthir.com/b4Yv0">
                  Doing an Inset Drop-shadow With SVG Filters
                </a>{' '}
                by Tab Atkins
              </li>
              <li>
                <a href="https://ledrug.wordpress.com/2010/09/30/learning-svg-lesson-2/">
                  Learning SVG: lesson 2 (shadows and bevel)
                </a>{' '}
                by ledrug
              </li>
              <li>
                <a href="https://vanseodesign.com/web-design/svg-filter-primitives-feconvolvematrix/">
                  Add Bevel And Emboss Effects With The feConvolveMatrix Filter Primitive
                </a>{' '}
                by Steven Bradley
              </li>
              <li>
                <a href="https://tympanus.net/codrops/2015/03/10/creative-gooey-effects/">
                  Creative Gooey Effects
                </a>{' '}
                by Lucas Bebber
              </li>
              <li>
                <a href="https://css-tricks.com/glitch-effect-text-images-svg/">
                  Glitch Effect on Text / Images / SVG
                </a>{' '}
                by Lucas Bebber
              </li>
              <li>
                <a href="https://css-tricks.com/squigglevision-in-css-and-svg/">Squigglevision</a>{' '}
                by Chris Coyier
              </li>
            </ul>

            <h3>Tools</h3>

            <ul className="Read__list">
              <li>
                <a href="https://yoksel.github.io/svg-gradient-map/">SVG Gradient Map Filter</a> by
                Yoksel
              </li>
              <li>
                <a href="https://kazzkiq.github.io/svg-color-filter/">SVG Color Filter Preview</a>{' '}
                by Claudio Holanda
              </li>
              <li>
                <a href="http://andresgalante.com/RGBAtoFeColorMatrix/">
                  RGBA to feColorMatrix converter
                </a>{' '}
                by Andres Galante
              </li>
              <li>
                <a href="https://testdrive-archive.azurewebsites.net/graphics/hands-on-css3/hands-on_svg-filter-effects.htm">
                  Hands On: SVG Filter Effects
                </a>
              </li>
            </ul>
            <br />
            <p>
              Photo by <a href="https://unsplash.com/@madhatterzone">Manja Vitolic</a> on{' '}
              <a href="https://unsplash.com/photos/black-and-white-cat-lying-on-brown-bamboo-chair-inside-room-gKXKBY-C-Dk">
                Unsplash
              </a>
            </p>
          </main>
        </Wrapper>

        <Footer />
      </div>
    </>
  );
};

export default Read;
