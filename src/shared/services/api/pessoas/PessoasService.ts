import { AxiosError } from 'axios';

import { Environment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListagemPessoa {
  id: number;
  email: string;
  cidadeId: number;
  nome: string;
  sobrenome: string;
}

export interface IDetalhePessoa {
  id: number;
  email: string;
  cidadeId: number;
  nome: string;
  sobrenome: string;
}

type TPessoasComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `/person?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`;

    const { data, headers } = await Api().get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {
    const { data } = await Api().get(`/person/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api().post<number>('/person', dados);

    if (data) {
      return data;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
  try {
    await Api().put(`/person/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api().delete(`/person/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao apagar o registro.');
  }
};


export const PessoasService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
