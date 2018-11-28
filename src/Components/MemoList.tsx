
import Classnames from 'classnames';
import * as React from 'react';
import MemoData from '../Misc/Memo';
import Memo from './Memo';
import * as styles from './MemoList.scss';

export class MemoList extends React.Component<{
  className?: string;
}, {
  items: MemoData[];
}> {
  constructor(props) {
    super(props);
    this.state = {
      items: this.getMemoItems(),
    };
    this.handleCreateMemo = this.handleCreateMemo.bind(this);
  }

  public render() {
    function createMemo(memo: MemoData) {
      return (
        <Memo
          className={styles.item}
          key={memo.key}
          data={memo}
        />
      );
    }
    return (
      <div className={Classnames(styles.main, this.props.className)}>
        <Memo
          className={styles.item}
          createCallback={this.handleCreateMemo}
        />
        {this.state.items.map(createMemo)}
      </div>
    );
  }

  private getMemoItems() {
    const localStorage = window.localStorage;
    try {
      return JSON.parse(localStorage.getItem('memos')) || [];
    } catch {
      localStorage.removeItem('memos');
      return [];
    }
  }

  private setMemoItems(items) {
    const localStorage = window.localStorage;
    localStorage.setItem('memos', JSON.stringify(items));
  }

  private handleCreateMemo(data) {
    this.setState((state) => {
      const items = [data].concat(state.items);
      this.setMemoItems(items);
      return { items };
    });
  }
}

export default MemoList;
