import WebSocket from 'ws';
import { OnModuleInit } from '@nestjs/common';

export class CryptoService implements OnModuleInit {
  private ws: WebSocket;
  public exchangeRates: Record<string, number> = {};

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

    this.ws.on('close', () => {
      console.log('WebSocket disconnected, attempting to reconnect...');
      setTimeout(() => {
        this.init();
      }, 5000);
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

  /**
   * Returns the exchange rate for the specified crypto/fiat currency pair.
   * @param pair - The crypto/fiat currency pair
   * @returns - The current exchange rate for the specified pair
   */
  getExchangeRate(pair: string): number {
    return this.exchangeRates[pair];
  }

  async onModuleInit() {
    this.init();
  }
}
