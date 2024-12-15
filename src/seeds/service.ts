import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { MinioService } from 'nestjs-minio-client';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  sonTungMPT,
  sonTungMPTAvatarPath,
  sonTungMPTProfile,
} from './users/son-tung-mtp';
import { RDBUser } from '@users/infrastucture/rdb-entity/user';
import { RDBProfile } from '@users/infrastucture/rdb-entity/profile';
import {
  adminOne,
  adminOneAvatarPath,
  adminOneProfile,
} from './users/admin-one';
import { RDBCategory } from '@categories/infrastructure/rdb-entity/category';
import { music } from './categories/music';
import { RDBAudio } from '@audio/infrastructure/rdb-entity/audio';
import {
  emCuaNgayHomQua,
  emCuaNgayHomQuaImagePath,
  emCuaNgayHomQuaSoundPath,
} from './audios/em-cua-ngay-hom-qua';
import { avicii, aviciiAvatarPath, aviciiProfile } from './users/avicii';
import {
  waitingForLove,
  waitingForLoveImagePath,
  waitingForLoveSoundPath,
} from './audios/waiting-for-love';
import {
  heyBrother,
  heyBrotherImagePath,
  heyBrotherSoundPath,
} from './audios/hey-brother';
import {
  tranPhong,
  tranPhongAvatarPath,
  tranPhongProfile,
} from './users/tran-phong';

@Injectable()
export class SeedService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    private minioService: MinioService,
  ) {}

  async run() {
    if (!(await this.minioService.client.bucketExists('main'))) {
      await this.minioService.client.makeBucket('main');
    }

    await this.entityManager.getRepository(RDBAudio).delete({});
    await this.entityManager.getRepository(RDBCategory).delete({});
    await this.entityManager.getRepository(RDBProfile).delete({});
    await this.entityManager.getRepository(RDBUser).delete({});

    await this.addUsers();
    await this.addCategories();
    await this.addAudios();
  }

  private async addUsers() {
    await this.minioService.client.removeObjects('main', [
      sonTungMPTProfile.avatar,
      adminOneProfile.avatar,
      aviciiProfile.avatar,
      tranPhongProfile.avatar,
    ]);

    await this.entityManager
      .getRepository(RDBUser)
      .insert([sonTungMPT, adminOne, avicii, tranPhong]);
    await this.entityManager
      .getRepository(RDBProfile)
      .insert([
        sonTungMPTProfile,
        adminOneProfile,
        aviciiProfile,
        tranPhongProfile,
      ]);

    await this.minioService.client.fPutObject(
      'main',
      sonTungMPTProfile.avatar,
      sonTungMPTAvatarPath,
    );
    await this.minioService.client.fPutObject(
      'main',
      adminOneProfile.avatar,
      adminOneAvatarPath,
    );
    await this.minioService.client.fPutObject(
      'main',
      aviciiProfile.avatar,
      aviciiAvatarPath,
    );
    await this.minioService.client.fPutObject(
      'main',
      tranPhongProfile.avatar,
      tranPhongAvatarPath,
    );
  }

  private async addCategories() {
    await this.entityManager.getRepository(RDBCategory).insert([music]);
  }

  private async addAudios() {
    await this.minioService.client.removeObjects('main', [
      emCuaNgayHomQua.image,
      waitingForLove.image,
      heyBrother.image,
    ]);

    await this.minioService.client.removeObjects('main', [
      emCuaNgayHomQua.sound,
      waitingForLove.sound,
      heyBrother.sound,
    ]);

    await this.entityManager
      .getRepository(RDBAudio)
      .insert([emCuaNgayHomQua, waitingForLove, heyBrother]);

    await this.minioService.client.fPutObject(
      'main',
      emCuaNgayHomQua.image,
      emCuaNgayHomQuaImagePath,
    );
    await this.minioService.client.fPutObject(
      'main',
      waitingForLove.image,
      waitingForLoveImagePath,
    );
    await this.minioService.client.fPutObject(
      'main',
      heyBrother.image,
      heyBrotherImagePath,
    );

    await this.minioService.client.fPutObject(
      'main',
      emCuaNgayHomQua.sound,
      emCuaNgayHomQuaSoundPath,
    );
    await this.minioService.client.fPutObject(
      'main',
      waitingForLove.sound,
      waitingForLoveSoundPath,
    );
    await this.minioService.client.fPutObject(
      'main',
      heyBrother.sound,
      heyBrotherSoundPath,
    );
  }
}
