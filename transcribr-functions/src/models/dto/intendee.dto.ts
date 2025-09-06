export class IntendeeDto {
  email: string;
  createdAt?: Date;

  constructor(email: string, createdAt?: Date) {
    this.email = email;
    this.createdAt = createdAt;
  }

  static fromDocument(document: FirebaseFirestore.DocumentData): IntendeeDto {
    return {
      email: document.email,
      createdAt: document.createdAt.toDate(),
    };
  }
}
