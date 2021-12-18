import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { fetchCoins } from "../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid white;
  a {
    padding: 20px;
    transition: color 0.2s ease-in-out;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const ToggleTab = styled.span<{ isDark: boolean }>`
  text-align: center;
  font-size: 24px;
  padding: 7px 0px;
  border-radius: 10px;
  margin-left: 10px;
  cursor: pointer;
  /* color: ${(props) =>
    props.isDark ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  } */
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Container>
      <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <ToggleTab onClick={toggleDarkAtom} isDark={isDark}>
          {isDark ? "🌝" : "🌚"}
        </ToggleTab>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                ></Img>
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
