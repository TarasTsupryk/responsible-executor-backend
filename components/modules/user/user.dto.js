class UserDto {
  id;
  email;
  is_active;

  constructor(user) {
    this.id = user.user_id;
    this.email = user.email;
    this.is_active = user.is_active;
  }
}

export default UserDto;
