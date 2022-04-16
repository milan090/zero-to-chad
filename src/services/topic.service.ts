import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { Topic, TopicDoc } from "src/types/topic.types";

export const topicConverter: FirestoreDataConverter<Topic> = {
  toFirestore(topic: Topic): TopicDoc {
    return { name: topic.name };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<TopicDoc>,
    options: SnapshotOptions
  ): Topic {
    const data = snapshot.data(options);
    return {
      name: data.name,
      id: snapshot.id,
    };
  },
};
