import {Container, Query, QueryHandler, Result} from '@tmorin/p2p-fwk-model-core';
import {LocalMessageBus} from '.';
import {ConsoleLoggerFactory} from '@tmorin/p2p-fwk-infra-logger-console';

class QueryA extends Query {
  constructor() {
    super(undefined, 'QueryA');
  }
}

class ResultA extends Result {
  constructor() {
    super(undefined, 'ResultA');
  }
}

class QueryAHandler extends QueryHandler<QueryA, ResultA> {
  async handle(query: QueryA): Promise<ResultA> {
    return new ResultA();
  }
}

describe('LocalMessageBus/query', function () {

  it('should register and call query', async function () {
    const bus = new LocalMessageBus(new ConsoleLoggerFactory(new Container()));
    bus.registerQueryHandler(QueryA.name, new QueryAHandler());
    const resultA = await bus.call(new QueryA());
    expect(resultA.name).toEqual('ResultA');
  });

  it('should dispose', async function () {
    const bus = new LocalMessageBus(new ConsoleLoggerFactory(new Container()));
    bus.registerQueryHandler(QueryA.name, new QueryAHandler());
    await bus.dispose();
    await expect(bus.call(new QueryA())).rejects.toThrow('unable to found a query handler for (QueryA)')
  });

});