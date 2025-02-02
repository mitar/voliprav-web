import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.scss';
import Header from '../Header';
import Footer from '../Footer';
import Container from '../Container';
import logo from '../../logo.svg';

class Layout extends Component {
  render() {
    const {
      page,
      title,
      altTitle,
      altTitleTwo,
      children,
      color,
      textColor,
      isEmbed = false,
      showHeader = true,
    } = this.props;

    if (isEmbed) {
      return (
        <div className={s.root}>
          <header>
            <a href="https://voliprav.si/" target="_blank">
              <img className={s.logo} src={logo} alt="Voli prav" />
            </a>
          </header>
          <main className={s.main}>
            <Container>{children}</Container>
          </main>
        </div>
      );
    }

    return (
      <div className={s.root}>
        {showHeader && <Header page={page} />}
        <main className={s.main}>
          {title && (
            <header
              className={s.subHeader}
              style={
                color == null
                  ? undefined
                  : {
                      backgroundColor: color,
                    }
              }
            >
              <Container>
                <div className={s.subHeaderContent}>
                  <h2 className={s.title} style={
                    textColor
                      ? {
                        color: textColor,
                        }
                      : undefined
                  }>{title}</h2>
                  <p className={s.altTitle} style={
                    textColor
                      ? {
                          color: textColor,
                        }
                      : undefined
                  }>{altTitle}</p>
                  { altTitleTwo && (<p className={s.altTitle} style={
                    textColor
                      ? {
                          color: textColor,
                        }
                      : undefined
                  }>{altTitleTwo}</p>) }
                </div>
              </Container>
            </header>
          )}
          <Container>{children}</Container>
        </main>
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Layout);
