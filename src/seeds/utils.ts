export const createAudioKey = (audioId: string, fileName: string): string => {
  return `audios/${audioId}/${fileName}`;
};

export const createUserAvatarKey = (
  userId: string,
  filename: string,
): string => {
  return `users/${userId}/avatars/${filename}`;
};
