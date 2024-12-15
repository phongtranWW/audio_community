export class AudioDto {
  id: string;
  image: string;
  name: string;
  category: AudioCategoryDto;
  user: AudioUserDto;
}

export class AudioCategoryDto {
  id: string;
  name: string;
}

export class AudioUserDto {
  id: string;
  stageName: string;
}
