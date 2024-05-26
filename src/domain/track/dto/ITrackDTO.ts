export interface ITrackDTO {
  image: string;
  coordinates: [[number, number]];
  userId: string;
  title: string;
  time: number;
  distance: number;
  speed: number;
  startLocationTitle: string;
  finishLocationTitle: string;
  visibility: "public" | "private";
}
