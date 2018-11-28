
import Classnames from 'classnames';
import * as React from 'react';
import { setImmediate } from 'timers';
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
    const createMemo = (memo: MemoData) => {
      let className = styles.item;
      if (memo.creating) {
        className = Classnames(className, styles.creating);
        setImmediate(() => {
          this.setState((state) => {
            const items = state.items;
            items.find((data) => data.key === memo.key).creating = false;
            return { items };
          });
        });
      }
      return (
        <Memo
          className={className}
          key={memo.key}
          data={memo}
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
    items = items.map((data) => ({ ...data, creating: false }));
    return items;
  }

  private setMemoItems(items) {
    const localStorage = window.localStorage;
    localStorage.setItem('memos', JSON.stringify(items));
  }

  private handleCreateMemo(data) {
    this.setState((state) => {
      data = { ...data, creating: true };
      const items = [data].concat(state.items);
      this.setMemoItems(items);
      return { items };
    });
  }
}

export default MemoList;
