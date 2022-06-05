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
    if (!user) return null;
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
      logo,
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
      logo,
    };
  }
}

export default UserDto;
