import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class FormModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  form: string;

  @property({
    type: 'string',
    required: true,
  })
  version: string;

  @property({
    type: 'date',
    required: true,
  })
  createdOn: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedOn: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<FormModel>) {
    super(data);
  }
}

export interface FormModelRelations {
  // describe navigational properties here
}

export type FormModelWithRelations = FormModel & FormModelRelations;
