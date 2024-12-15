import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAudioRequest } from './request';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IAudioRepository } from '@audio/domain/repository/audio';
import { CreateAudioResponse } from './response';
import { ErrorMessage } from '@constants/exception';
import * as md5 from 'md5';
import { MinioService } from 'nestjs-minio-client';
import { AUDIO_REPOSITORY } from '@constants/repository-key';
import { AudioFactory } from '@audio/utils/factory';

@CommandHandler(CreateAudioRequest)
export class CreateAudioHandler implements ICommandHandler<CreateAudioRequest> {
  constructor(
    private minioService: MinioService,
    @Inject(AUDIO_REPOSITORY)
    private repository: IAudioRepository,
  ) {}

  async execute(command: CreateAudioRequest): Promise<CreateAudioResponse> {
    const { image, sound, data, userId } = command;

    const audio = AudioFactory.create({
      userId,
      ...data,
    });

    try {
      const imageKey = this.generateKey(image, audio.id);
      await this.minioService.client.putObject('main', imageKey, image.buffer);

      const soundKey = this.generateKey(sound, audio.id);
      await this.minioService.client.putObject('main', soundKey, sound.buffer);

      audio.image = imageKey;
      audio.sound = soundKey;

      await this.repository.save(audio);

      return new CreateAudioResponse({
        ...audio,
      });
    } catch (error) {
      throw new HttpException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private generateKey(file: Express.Multer.File, ownerId: string): string {
    const currentTimeStamp = new Date().getTime();
    const source = `${file.filename + currentTimeStamp}`;
    const key = `audios/${ownerId}/${md5(source)}.${file.originalname.split('.')[1]}`;
    return key;
  }
}
