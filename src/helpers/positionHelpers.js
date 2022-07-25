import kokopu from "kokopu";
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
