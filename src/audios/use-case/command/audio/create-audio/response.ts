export class CreateAudioResponse {
  id: string;
  name: string;
  image: string;
  sound: string;
  description: string;
  categoryId: string;
  constructor({
    id,
    name,
    image,
    sound,
    description,
    categoryId,
  }: {
    id: string;
    name: string;
    image: string;
    sound: string;
    description: string;
    categoryId: string;
  }) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.sound = sound;
    this.description = description;
    this.categoryId = categoryId;
  }
}
