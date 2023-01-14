export interface PositionType {
  asset: string;
  symbol: string;
  no: number;
  tokenA: string;
  tokenB: string;
  protocol: string;
  position_value: number;
  debt_value: number;
  current_apy: number;
  debt_ratio: number;
  liq_threshold: string;
  safety_buffer: string;
}
