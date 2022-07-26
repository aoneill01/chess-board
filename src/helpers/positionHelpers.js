import kokopu from "kokopu";
import gsap from "gsap";
import {
  WhitePawn,
  WhiteRook,
  WhiteKnight,
  WhiteBishop,
  WhiteQueen,
  WhiteKing,
  BlackPawn,
  BlackRook,
  BlackKnight,
  BlackBishop,
  BlackQueen,
  BlackKing,
} from "../components/pieces";

export function positionsForPgn(pgn) {
  const database = kokopu.pgnRead(pgn);
  const game = database.game(0);
  const mainVariation = game.mainVariation();
  const positions = [mainVariation.first().positionBefore()];
  for (let node = mainVariation.first(); node; node = node.next()) {
    positions.push(node.position());
  }
  return { positions, details: game };
}

export function componentForPiece(piece) {
  switch (piece) {
    case "wp":
      return WhitePawn;
    case "wr":
      return WhiteRook;
    case "wn":
      return WhiteKnight;
    case "wb":
      return WhiteBishop;
    case "wq":
      return WhiteQueen;
    case "wk":
      return WhiteKing;
    case "bp":
      return BlackPawn;
    case "br":
      return BlackRook;
    case "bn":
      return BlackKnight;
    case "bb":
      return BlackBishop;
    case "bq":
      return BlackQueen;
    case "bk":
      return BlackKing;
    default:
      throw Error("Unexpected piece " + piece);
  }
}

export function locationFor(square) {
  const [file, rank] = square.split("");
  const rankIndex = parseInt(rank, 10) - 1;
  const fileIndex = file.charCodeAt(0) - "a".charCodeAt("a");
  const squareSize = 12;
  const margin = 2;
  return {
    x: fileIndex * squareSize + margin,
    y: (7 - rankIndex) * squareSize + margin,
  };
}

export function distanceBetween(square1, square2) {
  const location1 = locationFor(square1);
  const location2 = locationFor(square2);
  return Math.sqrt(
    Math.pow(location1.x - location2.x, 2) +
      Math.pow(location1.y - location2.y, 2)
  );
}

export function animateGame(pgn, pieces, refs, onComplete) {
  // TODO: promotions

  if (!pgn) return;

  const timeline = gsap.timeline();
  const map = {};
  // Reorder the pieces
  pieces.sort((a, b) => a.originalOrder - b.originalOrder);
  for (let i in pieces) {
    const piece = pieces[i];
    const ref = refs.pRef[i];
    map[piece.square] = { el: ref.$el, piece };
    // Reset to default location
    timeline.set(ref.$el, { ...locationFor(piece.square), opacity: 1 });
  }

  const database = kokopu.pgnRead(pgn);
  const game = database.game(0);
  const mainVariation = game.mainVariation();
  let labelIndex = 0;
  // Iterate over every move
  for (let node = mainVariation.first(); node; node = node.next()) {
    const md = node._info.moveDescriptor;
    const from = md.from();
    const to = md.to();
    const rookFrom = md.isCastling() && md.rookFrom();
    const rookTo = md.isCastling() && md.rookTo();
    if (map[from]) {
      const piece = map[from].piece;
      const label = `l${labelIndex}`;
      // Pick up the piece
      timeline.to(map[from].el, {
        scale: 1.1,
        transformOrigin: "50%",
        duration: 0.2,
        onStart: () => {
          // Make sure the current piece is on top of the other pieces
          pieces.sort((a, b) => {
            if (a === piece) return 1;
            if (b === piece) return -1;
            return 0;
          });
        },
      });

      timeline.addLabel(label);
      if (map[to]) {
        // Hide captured pieces
        timeline.to(map[to].el, { opacity: 0, duration: 0.3 }, label);
      }

      // Move the current piece
      timeline.to(
        map[from].el,
        {
          ...locationFor(to),
          duration: 0.6,
        },
        label
      );
      // Drop the piece
      timeline.to(map[from].el, {
        scale: 1,
        transformOrigin: "50%",
        duration: 0.2,
      });
      // Handle castling
      if (map[rookFrom]) {
        timeline.to(
          map[rookFrom].el,
          { ...locationFor(rookTo), duration: 0.6 },
          label
        );
        map[rookTo] = map[rookFrom];
        delete map[rookFrom];
      }
      map[to] = map[from];
      delete map[from];
      labelIndex++;
    }
  }

  timeline.to({}, { onComplete: () => onComplete(), duration: 2 });
}
