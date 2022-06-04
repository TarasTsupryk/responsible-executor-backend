class UserDto {
  static token(user) {
    const { user_id, email, is_active, type } = user;
    return {
      user_id,
      email,
      is_active,
      type,
    };
  }

  static fullData(user) {
    const {
      email,
      first_name,
      last_name,
      is_active,
      phone_number,
      position,
      registration_date,
      type,
      user_id,
    } = user;

    return {
      email,
      first_name,
      last_name,
      is_active,
      phone_number,
      position,
      registration_date,
      type,
      user_id,
    };
  }
}

export default UserDto;
