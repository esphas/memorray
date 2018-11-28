
import * as React from 'react';
import * as styles from './Brand.scss';

export class Brand extends React.Component<{
  background?: boolean;
}> {
  public render() {
    const rootStyles = [styles.main];
    if (this.props.background) {
      rootStyles.push(styles.background);
    } else {
      rootStyles.push(styles.foreground);
    }
    return (
      <a href="/" className={rootStyles.join(' ')}>
        Memorray
      </a>
    );
  }
}

export default Brand;
