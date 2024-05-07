import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class ErrorResponseFormBff extends Model {
  @property({
    type: 'string',
    required: true,
  })
  errorMessage: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ErrorResponseFormBff>) {
    super(data);
  }
}

export interface ErrorResponseFormBffRelations {
  // describe navigational properties here
}

export type ErrorResponseFormBffWithRelations = ErrorResponseFormBff & ErrorResponseFormBffRelations;
