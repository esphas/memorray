
import Classnames from 'classnames';
import * as React from 'react';
import { setImmediate } from 'timers';
import MemoData from '../Misc/Memo';
import Memo from './Memo';
import * as styles from './MemoList.scss';

export class MemoList extends React.Component<{
  className?: string;
}, {
  closed: string[];
  items: MemoData[];
}> {
  constructor(props) {
    super(props);
    this.state = {
      closed: [],
      items: this.getMemoItems(),
    };
    this.handleCreateMemo = this.handleCreateMemo.bind(this);
    this.handleRemoveMemo = this.handleRemoveMemo.bind(this);
  }

  public render() {
    const createMemo = (memo: MemoData) => {
      let className = styles.item;
      if (this.state.closed.includes(memo.key)) {
        className = Classnames(styles.closed, className);
      }
      return (
        <Memo
          className={className}
          key={memo.key}
          data={memo}
          removeCallback={this.handleRemoveMemo}
        />
      );
    };
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
    let items;
    try {
      items = JSON.parse(localStorage.getItem('memos')) || [];
    } catch {
      localStorage.removeItem('memos');
      items = [];
    }
    return items;
  }

  private setMemoItems(items) {
    const localStorage = window.localStorage;
    localStorage.setItem('memos', JSON.stringify(items));
  }

  private openMemo(key) {
    this.setState((state) => {
      const closed = state.closed.filter((key2) => key !== key2);
      return { closed };
    });
  }

  private closeMemo(key) {
    this.setState((state) => {
      const closed = [key].concat(state.closed);
      return { closed };
    });
  }

  private handleCreateMemo(data) {
    this.setState((state) => {
      const closed = [data.key].concat(state.closed);
      const items = [data].concat(state.items);
      this.setMemoItems(items);
      setImmediate(this.openMemo.bind(this, data.key));
      return { closed, items };
    });
  }

  private handleRemoveMemo(key) {
    this.closeMemo(key);
    setTimeout(() => {
      this.setState((state) => {
        const closed = state.closed.filter((key2) => key !== key2);
        const items = state.items.filter((memo) => key !== memo.key);
        this.setMemoItems(items);
        return { closed, items };
      });
    }, 300);
  }
}

export default MemoList;
