import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ListInvestimentsService } from './list-investiments.service';
import { InvestimentsI } from '../model/investiments';
import { MOCK_LIST } from './list-investiments.mock';

describe('ListInvestimentsService', () => {
  let service: ListInvestimentsService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  const URL =
    'https://raw.githubusercontent.com/troquatte/fake-server/main/investiments-all.json';

  const mockList: Array<InvestimentsI> = MOCK_LIST;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ListInvestimentsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) should list all investiments', (done) => {
    service.list().subscribe((res: Array<InvestimentsI>) => {
      expect(res[0].name).toEqual('Banco 1');
      expect(res[0].value).toEqual(100);

      expect(res[4].name).toEqual('Banco 5');
      expect(res[4].value).toEqual(100);
      // done é uma função que encerra o teste unitário, crucial para subscribe... pra saber quando parar de escutar
      done();
    });

    const req = httpTestingController.expectOne(URL);
    req.flush(mockList);

    expect(req.request.method).toEqual('GET');
  });
});
