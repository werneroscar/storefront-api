interface Password {
  password: string;
}

interface UserId {
  id: string;
}

interface Name {
  firstName: string;
  lastName: string;
}

export interface UserDetails extends Password, Name {}

export interface User extends UserId, Name {}
