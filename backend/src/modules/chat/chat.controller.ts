import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ChatService } from './chat.service';
import { QueryDto } from './dto/query.dto';
import { AVAILABLE_MODELS } from '../../services/gemini/available-models';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('models')
  getModels() {
    return AVAILABLE_MODELS;
  }

  @Post('query')
  async query(@Body() body: QueryDto, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    try {
      for await (const event of this.chatService.streamAnswer(
        body.question,
        body.namespace,
        body.model,
        body.history,
      )) {
        const payload =
          event.type === 'sources'
            ? JSON.stringify({ sources: event.sources })
            : JSON.stringify({ token: event.token });
        res.write(`data: ${payload}\n\n`);
        (res as any).flush?.();
      }
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    } catch (err) {
      console.error('Stream error:', err);
      res.write(`data: ${JSON.stringify({ error: 'Something went wrong' })}\n\n`);
    } finally {
      res.end();
    }
  }
}