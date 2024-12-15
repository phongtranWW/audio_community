export class AudioDetailDto {
  id: string;
  image: string;
  sound: string;
  name: string;
  likes: number;
  description: string;
  listens: number;
  category: AudioDetailCategoryDto;
  user: AudioDetailUserDto;
  createdAt: Date;
}

export class AudioDetailCategoryDto {
  id: string;
  name: string;
}

export class AudioDetailUserDto {
  id: string;
  stageName: string;
  avatar: string;
}
