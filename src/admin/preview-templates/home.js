import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

// Preview component for the Home page
const Home = createClass({
  render() {
    const entry = this.props.entry;
    const image = entry.getIn(['data', 'image']);
    const imageSrc = this.props.getAsset(image);
    const title = entry.getIn(['data', 'title'], '');
    const body = entry.getIn(['data', 'body'], '');
    const photoCredit = entry.getIn(['data', 'photo_credit'], '');

    return html`
      <main>
        <div style="background: #F5F2EE; padding: 40px 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center;">
          <div>
            <p style="font-size: 1.1rem; font-weight: 500; color: #4A7C6F; text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 10px;">Contra dance caller</p>
            <h1 style="font-size: 4.8rem; font-weight: 500; color: #1A2E4A; line-height: 1.1; margin-bottom: 14px;">${title}</h1>
            <p style="font-size: 1.6rem; color: #5a5a5a; line-height: 1.65; margin-bottom: 24px;">${body}</p>
          </div>
          <div>
            ${imageSrc ? html`<img src="${imageSrc}" alt="${entry.getIn(['data', 'image_alt'], '')}" style="width: 100%; border-radius: 8px; display: block;" />` : html`<div style="background: #a8d4ca; border-radius: 8px; aspect-ratio: 4/3;"></div>`}
            ${photoCredit ? html`<p style="font-size: 1.2rem; color: #888; text-align: right; margin-top: 4px;">${photoCredit}</p>` : null}
          </div>
        </div>
      </main>
    `;
  },
});

export default Home;
