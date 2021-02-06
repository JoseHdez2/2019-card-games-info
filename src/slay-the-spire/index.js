import React from "react";
import {
  Badge,
  Card,
  CardColumns,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

const fs = require("fs");

const load = fn => JSON.parse(fs.readFileSync(fn));

let mockards = load("./src/slay-the-spire/cards.json");
let relics = load("./src/slay-the-spire/relics.json");
let keywords = load("./src/slay-the-spire/keywords.json");

class Spire extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: "" };
  }

  render() {
    return (
      <div>
        <h2>Slay The Spire V1.1 Info</h2>

        <SpireFilter />
        <h3>Cards</h3>
        <CardColumns>
          {mockards.map(c => (
            <SpireCard card={c} />
          ))}
        </CardColumns>
        <h3>Relics</h3>
        <CardColumns>
          {relics.map(c => (
            <SpireCard card={c} />
          ))}
        </CardColumns>
        <h3>Keywords</h3>
        <CardColumns>
          {keywords.map(c => (
            <SpireCard card={c} />
          ))}
        </CardColumns>
      </div>
    );
  }
}

const SpireFilter = ({ filter }) => (
  <div>
    <p>Search: </p>
    <input />
  </div>
);

const SpireCard = ({ card }) => (
  <Card style={{ width: "33vw" }}>
    <Card.Title>{card.name}</Card.Title>
    <SpireCardBody desc={card.desc} />
    <Badge variant={typeToVariant(card.type)}>{card.type}</Badge>
  </Card>
);

const SpireCardBody = ({ desc }) => <Card.Body>{formatDesc(desc)}</Card.Body>;

const formatDesc = (str, formatFn) => (
  <span>
    {str
      .split(" ")
      .map(formatWord)
      .reduce((a, b) => (
        <span>
          {a} {b}
        </span>
      ))}
  </span>
);

const formatWord = word => {
  let cleanWord = word.replace(/(\w+)[.]/, "$1");
  let keyword = keywords.filter(p => p.name === cleanWord)[0];
  return keyword ? <MyTooltip text={word} tooltipCont={keyword.desc} /> : word;
};

const MyTooltip = ({ text, tooltipCont, placement = "down" }) => (
  <OverlayTrigger
    key={placement}
    placement={placement}
    overlay={<Tooltip id={`tooltip-${placement}`}>{tooltipCont}</Tooltip>}
  >
    <b>{text}</b>
  </OverlayTrigger>
);

const typeToVariant = type => {
  switch (type) {
    case "Skill":
      return "primary";
    case "Attack":
      return "danger";
    case "Power":
      return "warning";
    case "Curse":
      return "dark";
    default:
      return "secondary";
  }
};

export default Spire;
