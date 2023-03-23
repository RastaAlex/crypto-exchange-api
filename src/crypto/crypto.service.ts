import WebSocket from 'ws';
import { OnModuleInit } from '@nestjs/common';

export class CryptoService implements OnModuleInit {
  private ws: WebSocket;
  private exchangeRates: Record<string, number> = {};

  init() {
    this.ws = new WebSocket('wss://ws.kraken.com');

    this.ws.on('open', () => {
      this.ws.send(JSON.stringify({ event: 'subscribe', pair: [
        'BTC/USD', 'ETH/USD', 'BCH/USD',
        'BTC/EUR', 'ETH/EUR', 'BCH/EUR',
        'BTC/CAD', 'ETH/CAD', 'BCH/CAD',
        'BTC/JPY', 'ETH/JPY', 'BCH/JPY',
        'BTC/GBP', 'ETH/GBP', 'BCH/GBP',
        'BTC/CHF', 'ETH/CHF', 'BCH/CHF',
        'BTC/AUD', 'ETH/AUD', 'BCH/AUD',
      ],
      subscription: { name: 'ticker' } }));
    });

    this.ws.on('message', (data: WebSocket.Data) => {
      this.handleMessage(data);
    });
  }

  private handleMessage(data: WebSocket.Data) {
    const message = JSON.parse(data.toString());

    if (message[1] && message[1].c) {
      let pair = message[3].replace('/', '');

      if (pair.startsWith('XBT')) {
        pair = pair.replace('XBT', 'BTC');
      }

      const rate = parseFloat(message[1].c);

      this.exchangeRates[pair] = rate;
    }
  }

  getExchangeRate(pair: string): number {
    return this.exchangeRates[pair];
  }

  async onModuleInit() {
    this.init();
  }
}
