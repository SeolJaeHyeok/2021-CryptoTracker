import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchTodayPrice } from "../api";

interface ITodayPrice {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

const Container = styled.div``;
const PriceInfo = styled.div`
  margin: 10px 0px;
`;

const Price = ({ coinId }: PriceProps) => {
  const { isLoading, data } = useQuery<ITodayPrice[]>(
    ["todayPrice", coinId],
    () => fetchTodayPrice(coinId),
    {
      refetchInterval: 6000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <Container>
          <PriceInfo>
            Open:{data?.map((props) => props.open.toFixed(3))}
          </PriceInfo>
          <PriceInfo>
            High:{data?.map((props) => props.high.toFixed(3))}
          </PriceInfo>
          <PriceInfo>
            Close:{data?.map((props) => props.close.toFixed(3))}
          </PriceInfo>
          <PriceInfo>
            Low:{data?.map((props) => props.low.toFixed(3))}
          </PriceInfo>
        </Container>
      )}
    </div>
  );
};

export default Price;
