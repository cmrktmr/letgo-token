export interface Token {
    symbol: string;
    lastPrice: number;
    weightedAvgPrice: number;
    amount?: number;
    amountInput?: number;
  }
  