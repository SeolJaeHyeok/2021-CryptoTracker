import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Close",
              data: data?.map((price) => price.close),
            },
            {
              name: "Open",
              data: data?.map((price) => price.open),
            },
            {
              name: "high",
              data: data?.map((price) => price.high),
            },
            {
              name: "low",
              data: data?.map((price) => price.low),
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: { width: 500, height: 500, background: "transparent" },
            stroke: { curve: "smooth", width: 3 },
            yaxis: { show: false },
            xaxis: {
              type: "datetime",
              labels: { show: false },
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"] },
            },
            tooltip: {
              y: {
                formatter: (value) => value.toFixed(3),
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
