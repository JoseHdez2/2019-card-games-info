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

let mockards = load("./src/guild-of-dungeoneering/cards.json");
let loot = load("./src/guild-of-dungeoneering/loot.json");
let traits = load("./src/guild-of-dungeoneering/traits.json");

class Dungeoneering extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: "" };
  }

  render() {
    return (
      <div>
        <h2>Guild of Dungeoneering</h2>

        <SpireFilter />
        <h3>Cards</h3>
        <CardColumns>
          {mockards.map(c => (
            <SpireCard card={c} />
          ))}
        </CardColumns>
        <h3>Loot</h3>
        <CardColumns>
          {loot.map(c => (
            <SpireCard card={c} />
          ))}
        </CardColumns>
        <h3>Keywords</h3>
        <CardColumns>
          {traits.map(c => (
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

const formatDesc = str => str;

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

export default Dungeoneering;
