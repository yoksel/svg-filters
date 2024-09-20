import './Palette.scss';

/**
 * List of available highlight colors
 */

const Palette = () => {
  return (
    <div className="Palette">
      <ul>
        <li className="hlt hlt--red">hlt-red</li>
        <li className="hlt hlt--orange">hlt-orange</li>
        <li className="hlt hlt--gold">hlt-gold</li>
        <li className="hlt hlt--green">hlt-green</li>
        <li className="hlt hlt--blue">hlt-blue</li>
      </ul>
    </div>
  );
}

export default Palette;
