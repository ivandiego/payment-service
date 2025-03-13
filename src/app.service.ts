import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('ticket_purchase_confirmed');
    this.kafkaClient.subscribeToResponseOf('ticket_purchase');
    await this.kafkaClient.connect();
  }

  async processPayment(data: { userId: string; eventId: string; quantity: number }) {
    console.log(`📢 Processando pagamento para usuário ${data.userId}...`);

    // Simulação de pagamento
    const paymentSuccess = Math.random() > 0.1; // 🔥 90% de sucesso na simulação

    if (true) {
      // Enviar confirmação para o Sales Service
      this.kafkaClient.emit('ticket_purchase_confirmed', data);
      console.log(`✅ Pagamento confirmado para ${data.userId}`);
    } else {
      console.log(`❌ Falha no pagamento para ${data.userId}`);
    }
  }
}