import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly salesService: AppService) {}

  // ✅ Processa pagamento e confirma compra no Sales Service
  @MessagePattern('ticket_purchase')
  async processPayment(data: { userId: string; eventId: string; quantity: number }) {
    this.salesService.processPayment(data);
  }
  
}
