import { Politico } from "../models/Político.model";
import AppError from "../errors/AppError";
import { politicoCreateBody } from "../interfaces/politico";

// Precisa testar!!
export const search = async (query: string) => {
  try {
    const politicos = await Politico.find({
      $or:[
        {
          fullName: {
            $regex: query,
            $options: 'i'
          }
				},{
          socialName: {
            $regex: query,
            $options: 'i'
          }
        }
      ]},{	
				_id: 1,
        owner: 1,
        status: 1,
        history: 1,
        province: 1,
        fullname: 1,
        imageURL: 1,
        socialName: 1,
        currentPosition: 1,
  })
		.populate({
      path: 'owner',
      select: {
        role: 1,
        lastName: 1,
        firstName: 1,
      }
  });
  if (politicos) {
		return politicos;
	}
	return null;
  } catch (error) {
    throw new AppError(
      'Não foi possível buscar os políticos',
      'Politico-Repo-Buscar',
      500
    );
  }
};

// Precisa testar!!
export const getOne = async (id: string) => {
	try {
		const politico = await Politico.findById(id, {
			_id: 0,
			owner: 1,
			status: 1,
			history: 1,
			province: 1,
			fullName: 1,
			imageURL: 1,
			socialName: 1,
			currentPosition: 1,
		});
	} catch (error) {
		throw new AppError(
			'Não foi possível encontrar o político',
			'Politico-Repo-Encontrar-ID',
			500
		);
	}
};

// Precisa testar!!
export const create = async (body: politicoCreateBody) => {
	try {
		const politico = new Politico(body);
		await politico.save();
		return;
	} catch (error) {
		throw new AppError(
			'Não foi possível criar o político',
			'Politico-Criar',
			500
		);
	}
};
