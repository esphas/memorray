
import Classnames from 'classnames';
import * as React from 'react';
import Brand from './Brand';
import * as styles from './Header.scss';

export class Header extends React.Component<{
  className?: string;
}> {
  public render() {
    return (
      <header className={Classnames(styles.main, this.props.className)}>
        <span className={styles.brand}>
          <Brand />
        </span>
        <span className={styles.toolbox}>
          <span className={styles.toolbox_content}>
            <a href={require('../../package.json').homepage}>
              <img width="24" height="24" src={require('../Assets/GitHub-Mark-Light-32px.png')} />
            </a>
          </span>
        </span>
      </header>
    );
  }
}

export default Header;
