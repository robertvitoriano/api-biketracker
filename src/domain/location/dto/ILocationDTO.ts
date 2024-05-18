export interface ILocationDTO {
  title: string;
  coordinates: [number, number];
  userId: string;
  type: "generic" | "track-finish" | "track-start";
  images?: any[];
  visibility: "private" | "public";
}
