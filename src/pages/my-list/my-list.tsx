import { FilmsData } from '../../types';
import FilmList from '../../components/film-list/film-list.tsx';
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/footer.tsx';
import { HeaderStyleType } from '../../const/const.ts';

type MyListProps = {
  filmsData: FilmsData;
}
const MyList = ({filmsData}: MyListProps): JSX.Element => (
  <div className="user-page">
    <Header isLoggedIn headerStyleType={HeaderStyleType.User}>
      <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
    </Header>
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <FilmList filmsData={filmsData}/>
    </section>
    <Footer/>
  </div>
);

export default MyList;
