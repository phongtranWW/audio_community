export class PlaylistDetailDto {
  id: string;
  name: string;
  audios: {
    id: string;
    name: string;
    image: string;
    user: {
      id: string;
      stageName: string;
    };
  }[];
}
