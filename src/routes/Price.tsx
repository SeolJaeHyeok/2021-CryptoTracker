import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTicker } from "../api";

interface ITodayPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}

const Container = styled.div``;

const InfoBox = styled.div`
  margin: 10px 5px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const InfoTitle = styled.span`
  margin-left: 10px;
`;

const InfoValue = styled.span`
  margin-right: 10px;
  color: ${(props) => props.theme.accentColor};
`;

const Price = ({ coinId }: PriceProps) => {
  const { isLoading, data: priceData } = useQuery<ITodayPrice>(
    ["todayPrice", coinId],
    () => fetchCoinTicker(coinId)
    // {
    //   refetchInterval: 6000,
    // }
  );

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <Container>
          <InfoBox>
            <InfoTitle>Percent change 12h :</InfoTitle>
            <InfoValue>{priceData?.quotes?.USD?.percent_change_12h}%</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoTitle>Percent change 24h :</InfoTitle>
            <InfoValue>{priceData?.quotes?.USD?.percent_change_24h}%</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoTitle>Percent change From High :</InfoTitle>
            <InfoValue>
              {priceData?.quotes?.USD?.percent_from_price_ath}%
            </InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoTitle>All Time High Price :</InfoTitle>
            <InfoValue>
              {priceData?.quotes?.USD?.ath_price.toFixed(3)}$
            </InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoTitle>All Time High Date :</InfoTitle>
            <InfoValue>
              {priceData?.quotes?.USD?.ath_date.slice(0, 10)}
            </InfoValue>
          </InfoBox>
        </Container>
      )}
    </div>
  );
};

export default Price;
