# MtgCardViewer
## What's this?
MtgCardViewer mimics the link functionality of channel fireball, mtggoldfish and the mtg wiki for react apps. You can pass a *searchTerm* as prop to the component and it will look for this card on [Scryfall](https://scryfall.com). Upon hovering on the card name (or clicking if on *mobileMode*) the image will appear right below the card name. 

## Installation
```console
npm i mtg-card-viewer -s
```

## Usage and Options

The most basic usage is simply passing the searchTerm as a prop to the card component:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { MtgCardViewer } from 'mtg-card-viewer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <p>Of all MTG cards, <MtgCardViewer searchTerm='lightning bolt'/> is my favorite!</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

MtgCardViewer looks for the **exact** *searchTerm* as it uses Scryfall !"" search option. The terms don't have to be case sensitive and some incomplete names will be returned. For example, searching for "elspeth knight errant" will correctly return [Elspeth, Knight Errant](https://scryfall.com/card/md1/13/elspeth-knight-errant).

The component accepts some other optional properties:

- **imageClass**: by default the card box uses the .mtgCardViewerBox class. If you don't want to rewrite it yoo can provide your own class using this prop.
- **imageStyling**: inline stylings to pass to the card box if you want to change a single property, like the padding or giving the card box a border.
- **mobileMode**: by default it's false. mobileMode set as true will change the behavior of the component. Instead of showing the image on hover it will only show on a click. Clicking anywhere outside the component will hide the image again.
- **imageWidth**: by default the image width is 280 pixels. You can provide another width here. Please note that this options does not work if you use the imageStyling, but of course you can just give it a width using imageStyling.
