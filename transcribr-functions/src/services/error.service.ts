export class ErrorService {
  static extractMessage(e: unknown): string {
    try {
      if (typeof e == "string") return `${e}`;
      const error = <Error>e;
      return `${error.name}: ${error.message}`;
    } catch (_) {
      console.log(_);
      return `${e}`;
    }
  }
  static parseError(e: unknown): unknown {
    return e;
  }
}
