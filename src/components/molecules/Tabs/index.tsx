import {NavLink} from 'react-router-dom';

import './Tabs.scss';


interface TabsProps {
  active: string,
  items: {id: string, name: string, content: string}[]
};

const Tabs = ({items, active}: TabsProps) => {
  const tabsList = items.reduce((prev, item) => {
    const id = item.id;
    const name = item.name;
    const url = `${process.env.PUBLIC_URL}/${id}`;
    let buttonClass = 'Tabs__control';
    if (id === active) {
      buttonClass += ` ${buttonClass}--active`;
    }

    //TODO: NavLink
    const control = (
      <a
        key={id}
        href={url}
        className={buttonClass}
      >
        <span className="Tabs__control-text">
          {name}
        </span>
      </a>
    );

    let contentClass = 'Tabs__item';
    if (id === active) {
      contentClass += ` ${contentClass}--active`;
    }
    const content = <div
      key={id}
      className={contentClass}
    ><item.content/></div>;

    prev.controls.push(control);
    prev.tabs.push(content);

    return prev;
  },{
    controls: [] as JSX.Element[],
    tabs: [] as JSX.Element[],
  });

  return (
    <div className="Tabs">
      <div className="Tabs__controls">
        {tabsList.controls}
      </div>
      {tabsList.tabs}
    </div>
  );
};

export default Tabs;

