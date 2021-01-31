import {Container, Logger, LoggerFactory} from '@tmorin/p2p-fwk-model-core';
import {ConsoleLogger} from './ConsoleLogger';

export class ConsoleLoggerFactory implements LoggerFactory {

  constructor(
    private readonly container: Container
  ) {
  }

  create(...names: Array<string>): Logger {
    return new ConsoleLogger([this.container.name, ...names].join('/'));
  }

}
