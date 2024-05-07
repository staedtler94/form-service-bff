import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FormDataSourceDataSource} from '../datasources';
import {FormModel, FormModelRelations} from '../models';

export class FormModelRepository extends DefaultCrudRepository<
  FormModel,
  typeof FormModel.prototype.id,
  FormModelRelations
> {
  constructor(
    @inject('datasources.FormDataSource') dataSource: FormDataSourceDataSource,
  ) {
    super(FormModel, dataSource);
  }
}
