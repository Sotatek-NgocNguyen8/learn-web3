import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ClientOptions,
} from '@urql/core';
import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private client: any;

  constructor() {
    this.client = createClient({
      url: 'https://api.studio.thegraph.com/query/24267/ngocnguyen8/v2',
      fetch: fetch,
      requestPolicy: 'network-only',
      fetchOptions: {
        cache: 'no-cache',
      },
      exchanges: [dedupExchange, cacheExchange, fetchExchange],
    });
  }

  makeQueryString(query: string, variable: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client
        .query(query, variable)
        .toPromise()
        .then((result: any) => {
          resolve(result.data.transferEntities);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
  }

  async getTransferBySrc(src: string) {
    const queryString = `
    query TransferEntity{
      transferEntities(where:{type:"TRANSFER"},last: 5) {
        id
        type
        src
        des
      }
    }
    `;
    return await this.makeQueryString(queryString, {
      src,
    });
  }

  async getDepositByDes(des: string) {
    const queryString = `
    query TransferEntity{
      transferEntities(where:{type:"DEPOSIT"},last: 5) {
        id
        type
        src
        des
      }
    }
    `;
    return await this.makeQueryString(queryString, {
      des,
    });
  }

  async getWithDrawalBySrc(src: string) {
    const queryString = `
    query TransferEntity{
      transferEntities(where:{type:"WITHDRAW"},last: 5) {
        id
        type
        src
        des
      }
    }
    `;
    return await this.makeQueryString(queryString, {
      src,
    });
  }
}
