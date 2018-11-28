
import Classnames from 'classnames';
import DateFns from 'date-fns';
import * as React from 'react';
import MemoData from '../Misc/Memo';
import * as styles from './Memo.scss';

export class Memo extends React.PureComponent<{
  data?: MemoData;
  createCallback?: (data: MemoData) => void;
  className?: string;
}, {
  dateDiff: number;
  intervalId?: NodeJS.Timeout;
}> {
  constructor(props) {
    super(props);
    this.state = {
      dateDiff: this.dateDiff,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public componentDidMount() {
    if (this.props.data) {
      const intervalId = setInterval(this.timer.bind(this), 1000);
      this.setState({ intervalId });
    }
  }

  public componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  public render() {
    return (
      <span className={Classnames(styles.main, this.props.className)}>
        {this.props.data ? this.renderData() : this.renderCreate()}
      </span>
    );
  }

  private renderData() {
    return (
      <React.Fragment>
        <span className={styles.days}>
          <span className={styles.number}>
            {
              this.state.dateDiff === 0 ?
              'Today' :
              Math.abs(this.state.dateDiff)
            }
          </span>
          <span className={styles.text}>
            {
              this.state.dateDiff < 0 ?
              'days to go' :
              this.state.dateDiff > 0 ?
              'days' : ''
            }
          </span>
        </span>
        <span className={styles.note}>
          {this.props.data.note}
        </span>
      </React.Fragment>
    );
  }

  private renderCreate() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          name="date"
          type="date"
          required={true}
        />
        <input
          className={Classnames(styles.input, styles.input_note)}
          name="note"
          type="text"
          placeholder="Notes (Optional)"
        />
        <input
          className={Classnames(styles.input, styles.submit)}
          type="submit"
          value="New"
        />
      </form>
    );
  }

  private get dateDiff() {
    if (this.props.data) {
      const date = this.props.data.date;
      return DateFns.differenceInDays(new Date(), date);
    }
    return 0;
  }

  private timer() {
    if (this.state.dateDiff !== this.dateDiff) {
      this.setState({
        dateDiff: this.dateDiff,
      });
    }
  }

  private handleSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = {
      date: new Date(formdata.get('date') as string),
      key: '',
      note: formdata.get('note') as string,
    };
    data.key = `i${Date.now()}`;
    this.props.createCallback(new MemoData(
      data.key,
      data.date,
      data.note,
    ));
    event.target.reset();
  }
}

export default Memo;
