import {instance} from "api/api.interceptor";
import {MAIN, STATISTICS, TypeStatisticsResponse} from "./statistics.types";

export const StatisticsService = {
  async getMain() {
    return instance<TypeStatisticsResponse[]>({
      url: `${STATISTICS}/${MAIN}`,
      method: 'GET'
    })
  }
}
