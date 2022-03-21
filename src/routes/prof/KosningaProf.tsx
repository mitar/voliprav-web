import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { encodeAnswersToken } from '../../utils';
import s from './KosningaProf.scss';

const answerMap = {
  1: 'Mjög ósammála',
  2: 'Frekar ósammála',
  3: 'Hlutlaus',
  4: 'Frekar sammála',
  5: 'Mjög sammála',
  6: 'Vil ekki svara'
};
const areYouSure =
  'Ertu viss um að þú viljir yfirgefa síðuna núna? Öll svörin munu týnast.';
const defaultAnswer = '3';

class UploadCandidateImage extends PureComponent {
	public props: any;
	public token: any;
	public uploadSuccess: any;
	public uploadFailure: any;

  render() {
    const { token, uploadSuccess, uploadFailure } = this.props;

    if (uploadSuccess) {
      return <p className={s.uploadSuccess}>Innsending á mynd tókst!</p>;
    }
    if (uploadFailure) {
      return <p className={s.uploadFailure}>Innsending á mynd tókst ekki.</p>;
    }
    return (
      <div className={s.uploadForm}>
        <h3>Breyta um mynd</h3>
        <p>
          Hérna getur þú hlaðið upp nýrri mynd af þér sem verður notuð í
          kosningaprófinu
        </p>
        <form
          id="uploadForm"
          action={`/candidate/avatar?token=${token}`}
          method="post"
          encType="multipart/form-data"
        >
          <input type="file" name="avatar" />
          <input type="hidden" name="token" value={token} />
          <input
            type="submit"
            value="Senda inn mynd"
            className={s.uploadSubmit}
          />
        </form>
      </div>
    );
  }
}

interface KosningaprofProps {
  questions: {
    id: number,
    question: string
  }[];
}

class Kosningaprof extends PureComponent<KosningaprofProps> {
	public props: any;
	public setState: any;
	public context: any;
	public token: any;
	public answers: any;
	public questions: any;
	public uploadSuccess: any;
	public uploadFailure: any;
	public started: any;
	public finished: any;
  static contextTypes = {
    fetch: PropTypes.func.isRequired
  };
  state = {
    started: false,
    token: null,
    finished: false,
    answers: this.props.questions.reduce((all, { id }) => {
      // eslint-disable-next-line
      all[id] = defaultAnswer;
      return all;
    }, {})
  };
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
  }
  componentDidMount() {
    const { token } = queryString.parse(window.location.search);
    if (!token) {
      window.location = '/';
    }
    // eslint-disable-next-line
    this.setState({ token });
  }
  componentWillUnmount() {
    window.onbeforeunload = null;
  }
  onChange = id => ({ target }) => {
    this.setState(({ answers, started }) => {
      if (!started) {
        window.onbeforeunload = event => {
          // eslint-disable-next-line
          event.returnValue = areYouSure;
          return areYouSure;
        };
      }
      return {
        started: true,
        answers: {
          ...answers,
          [id]: target.value
        }
      };
    });
  };
  async onSend() {
    console.log('this is', this);
    const { answers, token } = this.state;

    await this.context.fetch(`/konnun/replies?timestamp=${Date.now()}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        reply: encodeAnswersToken(Object.keys(answers).map(x => answers[x]))
      })
    });

    this.setState({ finished: true });
  }
  render() {
    const { questions, token, uploadSuccess, uploadFailure } = this.props;
    const { answers, started, finished } = this.state;
    return (
      <div className={s.root}>
        {!finished && (
          <UploadCandidateImage
            token={token}
            uploadSuccess={uploadSuccess}
            uploadFailure={uploadFailure}
          />
        )}
        {finished && <h3>Takk fyrir þátttökuna!</h3>}

        {!finished && (
          <div className={s.intro}>
            <h1>Kosningapróf Kjóstu rétt 2021</h1>
            <p>
              Svörin við prófinu birtast í niðurstöðusíðu kosningaprófsins fyrir
              almenning. Það getur tekið allt að 30 mínútur fyrir svörin að
              uppfærast. Nýjasta svarið gildir.
            </p>
          </div>
        )}
        {!finished &&
          questions.map(({ question, id }) => (
            <div key={id} className={s.question}>
              <h3>{question}</h3>
              {Object.keys(answerMap).map(value => {
                const name = `${id}_${value}`;
                return (
                  <div key={value}>
                    <input
                      id={name}
                      name={name}
                      value={value}
                      type="radio"
                      checked={answers[id] === value}
                      onChange={this.onChange(id)}
                    />
                    <label htmlFor={name}>{answerMap[value]}</label>
                  </div>
                );
              })}
            </div>
          ))}
        {started && !finished && <button onClick={this.onSend}>Senda</button>}
      </div>
    );
  }
}

export default withStyles(s)(Kosningaprof);
