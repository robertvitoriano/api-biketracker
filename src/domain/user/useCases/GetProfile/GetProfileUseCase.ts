class GetProfileUseCase {
  async execute({ _id, name, username, email, password, avatar }) {
    const user = {
      _id,
      name,
      username,
      email,
      password,
      avatar:
        avatar ||
        `https://${process.env.S3_BUCKET}.s3.amazonaws.com/default-avatar.png`,
    };

    return user;
  }
}

export { GetProfileUseCase };
