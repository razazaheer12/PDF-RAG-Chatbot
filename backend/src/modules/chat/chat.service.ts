import { Injectable } from '@nestjs/common';
import {
  LangchainService,
  RagStreamEvent,
} from '../../services/langchain/langchain.service';
import { ChatHistoryMessageDto } from './dto/query.dto';

@Injectable()
export class ChatService {
  constructor(private readonly langchain: LangchainService) {}

  async *streamAnswer(
    question: string,
    namespace: string,
    model?: string,
    history?: ChatHistoryMessageDto[],
  ): AsyncIterable<RagStreamEvent> {
    yield* this.langchain.queryRAG(question, namespace, model, history ?? []);
  }
}
