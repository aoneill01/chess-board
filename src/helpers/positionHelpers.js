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
  BlackKing
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
