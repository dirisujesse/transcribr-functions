import { Messaging } from "firebase-admin/lib/messaging/messaging";
import { log } from "firebase-functions/logger";

export class PushService {
  constructor(private readonly messenger: Messaging) {}

  async subscribe(token: string, topic: string): Promise<void> {
    await this.messenger.subscribeToTopic(token, topic);
  }

  async sendPush(
    topic: string,
    title: string,
    body: string,
    data?: {
      [key: string]: string;
    },
  ): Promise<void> {
    try {
      await this.messenger.send({
        notification: {
          title,
          body,
        },
        android: {
          priority: "high",
          data,
          notification: {
            title,
            body,
            defaultSound: true,
            priority: "high",
            icon: "https://res.cloudinary.com/jesse-dirisu/image/upload/c_thumb,w_200,g_face/v1760181999/logo_jckeoj.png",
            color: "#4338CA",
          },
        },
        webpush: {
          data,
          notification: {
            title,
            body,
            defaultSound: true,
            priority: "high",
            icon: "https://res.cloudinary.com/jesse-dirisu/image/upload/c_thumb,w_200,g_face/v1760181999/logo_jckeoj.png",
            color: "#4338CA",
          },
        },
        topic,
        data,
      });
      log("Push sent successfully");
    } catch (error) {
      log(`Error sending ePush: ${error}`);
    }
  }
}
