import React from 'react';
import serialize from 'serialize-javascript';
import config from '../config';

interface HtmlProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  styles?: {
    id: string,
    cssText: string
  }[];
  scripts?: string[];
  app?: object;
  children: string // eslint-disable-line;
}

/* eslint-disable react/no-danger */

class Html extends React.Component<HtmlProps> {
	public props: any;
	public title: any;
	public description: any;
	public path: any;
	public styles: any;
	public scripts: any;
	public app: any;
	public children: any;
	public ogImage: any;
	public ogImageWidth: any;
	public ogImageHeight: any;
  static defaultProps = {
    styles: [],
    scripts: []
  };

  render() {
    const {
      title = 'Kjóstu Rétt 2021',
      description = 'Upplýsingar um stjórnmálaflokka og kosningarmálefni þeirra gerð aðgengileg almenningi.',
      path = '/',
      styles,
      scripts,
      app,
      children,
      ogImage,
      ogImageWidth,
      ogImageHeight
    } = this.props;

    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          {/* <meta name="description" content={description} /> */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />

          <meta property="og:locale" content="is_IS" />
          <meta name="description" content={description} />
          <meta
            name="keywords"
            content="kosningar,alþingi 2021,alþingiskosningar,frambjóðendur,málefni,björt framtíð,framsóknarflokkurinn,píratar,samfylkingin,sjálfstæðisflokkurinn,viðreisn,vinstri græn,flokkur fólksins,alþýðufylkingin"
          />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content="Kjóstu rétt 2021" />
          <meta property="og:url" content={`https://kjosturett.is${path}`} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content="#ffffff" />

          {ogImageWidth && (
            <meta property="og:image:width" content={ogImageWidth} />
          )}
          {ogImageHeight && (
            <meta property="og:image:height" content={ogImageHeight} />
          )}
          {ogImage && <meta property="og:image" content={ogImage} />}
          {!ogImage && (
            <meta
              property="og:image"
              content="https://kjosturett.is/og_2021.png"
            />
          )}

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kjóstu Rétt 2021" />
          <meta name="twitter:description" content={description} />

          <link
            href="https://fonts.googleapis.com/css?family=Lora|Roboto:300,400,500,900"
            rel="stylesheet"
          />

          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
        </head>
        <body style={{ margin: 0 }}>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }}
          />
          {scripts.map(script => (
            <script key={script} src={script} />
          ))}
          {config.analytics.googleTrackingId && (
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                  `ga('create','${config.analytics.googleTrackingId}','auto');ga('send','pageview')`
              }}
            />
          )}
          {config.analytics.googleTrackingId && (
            <script
              src="https://www.google-analytics.com/analytics.js"
              async
              defer
            />
          )}
          {/* <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" /> */}
          {/* <script
            dangerouslySetInnerHTML={{
              __html: "WebFont.load({ google: { families: ['PT Sans'] }});"
            }}
          /> */}
        </body>
      </html>
    );
  }
}

export default Html;
