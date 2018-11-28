
import * as React from 'react';
import * as styles from './App.scss';
import Header from './Components/Header';
import MemoList from './Components/MemoList';

enum Theme {
  'default',
}

export class App extends React.Component<{
  theme?: Theme;
}> {
  public theme: Theme;

  constructor(props) {
    super(props);
    this.loadTheme(props.theme || 'default');
  }

  public loadTheme(theme: Theme) {
    this.theme = theme;
    const root = document.documentElement;
    const variables = [
      'desktop-color',
      'shadow-color',
      'background-color',
      'foreground-color',
      'emphasis-color',
    ];
    for (const variable of variables) {
      root.style.setProperty(`--theme-${variable}`,
        getComputedStyle(root).getPropertyValue(
          `--theme-${theme}-${variable}`,
        ),
      );
    }
  }

  public render() {
    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <Header className={styles.container} />
        </div>
        <div className={styles.body}>
          <MemoList className={styles.container} />
        </div>
      </div>
    );
  }
}

export default App;
