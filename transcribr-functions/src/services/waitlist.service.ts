import { IntendeeDto } from "../models/dto/intendee.dto";
import { PaginationDto } from "../models/dto/pagination.dto";
import { ErrorService } from "./error.service";

export class WaitlistService {

  constructor(private db: FirebaseFirestore.Firestore) {
    this.db = db;
  }

  private get collection(): FirebaseFirestore.CollectionReference {
    return this.db.collection("intendees");
  }

  private async userExists(email: string): Promise<boolean> {
    const query = await this.collection
      .where("email", "==", email)
      .count()
      .get();

    return query.data().count >= 1;
  }

  async joinWaitlist(data: IntendeeDto): Promise<void> {
    try {
      const isDuplicate = await this.userExists(data.email);
      if (isDuplicate) {
        throw ErrorService.parseError("A user with this email already exists");
      }
      await this.collection.add({ email: data.email, createdAt: new Date() });
    } catch (e) {
      throw ErrorService.parseError(e);
    }
  }

  async getUsers(
    paginationData: PaginationDto<IntendeeDto>
  ): Promise<PaginationDto<IntendeeDto>> {
    try {
      const page = paginationData.page - 1;
      const offset = paginationData.limit * page;
      const order = paginationData.ascending ? "asc" : "desc";
      const query = await this.collection
        .offset(offset)
        .limit(paginationData.limit)
        .orderBy(paginationData.orderBy, order)
        .get();
      if (query.empty) {
        return {
          size: 0,
          data: [],
          ...paginationData,
        };
      }
      const records = query.docs.map((it) => {
        return IntendeeDto.fromDocument(it.data());
      });
      return {
        size: records.length,
        data: records,
        ...paginationData,
      };
    } catch (e) {
      throw ErrorService.parseError(e);
    }
  }
}
