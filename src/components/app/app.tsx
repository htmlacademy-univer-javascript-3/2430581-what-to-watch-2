import Main from '../../pages/main/main.tsx';
import { FilmDataProps } from '../../types/film-data-props.ts';

const App = ({name, genre, promoDate}: FilmDataProps) =>
  (
    <Main
      name={name}
      genre={genre}
      promoDate={promoDate}
    >
    </Main>
  );

export default App;
