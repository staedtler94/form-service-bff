import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { randomUUID } from 'crypto';
import {ErrorResponseFormBff, FormModel} from '../models';
import {FormModelRepository} from '../repositories';

export class FormsBffController {
  constructor(
    @repository(FormModelRepository)
    public formModelRepository : FormModelRepository,
  ) {}

  @post('/forms')
  @response(200, {
    description: 'FormModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(FormModel)}},
  })
  @response(500, {
    description: 'Server Error',
    content: {'application/json': {schema: getModelSchemaRef(ErrorResponseFormBff)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormModel, {
            title: 'NewFormModel',
            exclude: ['id', 'createdOn', 'updatedOn'],
          }),
        },
      },
    })
    formModel: Omit<FormModel, 'id'>,
  ): Promise<FormModel | ErrorResponseFormBff> {

    try {
      
      if(!formModel){
        throw new Error("No form model");
      }

      formModel.id = randomUUID();
      formModel.createdOn = new Date();
      formModel.updatedOn = new Date();

      const respFormModel = await this.formModelRepository.create(formModel);
      respFormModel.id = '';

      return respFormModel;
    } catch (error) {
      return new ErrorResponseFormBff({errorMessage:"Error in creating the Form Entry."});
    }
  }

  @get('/forms/count')
  @response(200, {
    description: 'FormModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FormModel) where?: Where<FormModel>,
  ): Promise<Count> {
    return this.formModelRepository.count(where);
  }

  @get('/forms')
  @response(200, {
    description: 'Array of FormModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FormModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FormModel) filter?: Filter<FormModel>,
  ): Promise<FormModel[]> {
    return this.formModelRepository.find(filter);
  }

  @patch('/forms')
  @response(200, {
    description: 'FormModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormModel, {partial: true}),
        },
      },
    })
    formModel: FormModel,
    @param.where(FormModel) where?: Where<FormModel>,
  ): Promise<Count> {
    return this.formModelRepository.updateAll(formModel, where);
  }

  @get('/forms/{id}')
  @response(200, {
    description: 'FormModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FormModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FormModel, {exclude: 'where'}) filter?: FilterExcludingWhere<FormModel>
  ): Promise<FormModel> {
    return this.formModelRepository.findById(id, filter);
  }

  @patch('/forms/{id}')
  @response(204, {
    description: 'FormModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormModel, {partial: true}),
        },
      },
    })
    formModel: FormModel,
  ): Promise<void> {
    await this.formModelRepository.updateById(id, formModel);
  }

  @put('/forms/{id}')
  @response(204, {
    description: 'FormModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() formModel: FormModel,
  ): Promise<void> {
    await this.formModelRepository.replaceById(id, formModel);
  }

  @del('/forms/{id}')
  @response(204, {
    description: 'FormModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.formModelRepository.deleteById(id);
  }
}
