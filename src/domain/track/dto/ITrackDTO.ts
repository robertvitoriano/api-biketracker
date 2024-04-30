export interface ITrackDTO {
  path: Array<{
    coordinates: [number, number];
  }>;
  userId: string;
  title: string;
}
