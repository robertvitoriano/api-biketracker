export interface ITrackDTO {
  path: Array<{
    type: string;
    coordinates: [number, number];
  }>;
  userId: string;
  title: string;
}
