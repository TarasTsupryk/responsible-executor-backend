class UserDto {
  user_id;
  email;
  is_active;
  type;

  constructor(user) {
    this.user_id = user.user_id;
    this.email = user.email;
    this.is_active = user.is_active;
    this.type = user.type;
  }
}

export default UserDto;
